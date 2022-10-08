import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CookieService from "../../Utils/Cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#bd9400",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
}));

const add = () => {
  const inputRef = React.useRef();
  const classes = useStyles();
  const history = useHistory();

  const [selectedImg, setselectedImg] = React.useState();
  const [uploadedImg, setuploadedImg] = React.useState();

  const [firstName, setfirstName] = React.useState();
  const [lastName, setlastName] = React.useState();
  const [birthday, setbirthday] = React.useState();
  const [email, setemail] = React.useState();
  const [mobile, setmobile] = React.useState();
  const [password, setpassword] = React.useState();
  const [repassword, setrepassword] = React.useState();

  // React.useEffect(() => {
  //   console.log("sample");
  // }, [!uploadedImg]);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedImg);
    formData.append("upload_preset", "spmproject");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload",
      formData
    );
    setuploadedImg(response.data.url);
    alert("Your Details Are Ok To SignUp");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      public_id: "sampleid",
      url: uploadedImg,
      birthday: birthday,
      phoneNumber: mobile,
    };

    console.log(data);

    const user = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}user/signup`,
      data
    );
    CookieService.set(user.data.token);
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} container spacing={2}>
              <Grid item xs={6} xm={3}>
                <Box mt={5}></Box>
                <input
                  required
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={() => setselectedImg(inputRef.current.files[0])}
                  ref={inputRef}
                />
                {!selectedImg ? (
                  <label htmlFor="contained-button-file">
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      color="primary"
                      component="span"
                      className={classes.button}
                    >
                      Select Cover Page
                    </Button>
                  </label>
                ) : (
                  <div>
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        align="center"
                        color="primary"
                        component="span"
                        onClick={() => setuploadedImg()}
                        style={{ width: "100%" }}
                      >
                        Change Cover Page
                      </Button>
                    </label>
                  </div>
                )}
              </Grid>
              <Grid item xs={6} xm={3}>
                {!uploadedImg ? (
                  <div>
                    {!selectedImg ? (
                      <img
                        src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624880648/afproject/images_jjljf9.png"
                        style={{ width: 125, height: 125 }}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(selectedImg)}
                        style={{ width: 125, height: 125 }}
                      />
                    )}
                  </div>
                ) : (
                  <img src={uploadedImg} style={{ width: 150, height: 150 }} />
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="date"
                  id="birthday"
                  label="Birthday"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => setbirthday(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Re-EnterPassword"
                  type="password"
                  id="repassword"
                  value={repassword}
                  onChange={(e) => setrepassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          {uploadedImg ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#bd9400" }}
              className={classes.submit}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#bd9400" }}
              className={classes.submit}
              onClick={() => uploadImage()}
            >
              Check Your Details
            </Button>
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2" style={{ color: "#bd9400" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default add;