import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import UpdateIcon from "@material-ui/icons/Update";
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

const SignUp = () => {
  const inputRef = React.useRef();
  const classes = useStyles();
  const history = useHistory();
  const [token, settoken] = React.useState(CookieService.get("token"));
  const [UserData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    mobile: "",
    url: "",
  });

  const [selectedImg, setselectedImg] = React.useState();
  const [uploadedImg, setuploadedImg] = React.useState();

  const [firstName, setfirstName] = React.useState();
  const [lastName, setlastName] = React.useState();
  const [birthday, setbirthday] = React.useState();
  const [email, setemail] = React.useState();
  const [mobile, setmobile] = React.useState();

  React.useEffect(() => {
    if (token == null) {
      console.log("No User");
    } else {
      async function fectchData() {
        console.log("works");
        const userDetails = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}user/profile`,
          {
            withCredentials: true,
          }
        );
        setfirstName(userDetails.data.user.firstName);
        setlastName(userDetails.data.user.lastName);
        setbirthday(userDetails.data.user.birthday);
        setemail(userDetails.data.user.email);
        setmobile(userDetails.data.user.phoneNumber);
        setuploadedImg(userDetails.data.user.avatar.url);
      }
      fectchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      url: uploadedImg,
      birthday: birthday,
      phoneNumber: mobile,
    };

    console.log(data);

    const user = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}user/profileupdate`,
      data,
      { withCredentials: true }
    );
    history.push("/");
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedImg);
    formData.append("upload_preset", "spmproject");
    const { response } = await axios.post(
      "https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload",
      formData
    );
    setuploadedImg(response.data.url);
    alert("Your Details Are Ok To SignUp");
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UpdateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update User Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  // label="First Name"
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
                  // label="Last Name"
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
                {!selectedImg ? (
                  <div>
                    {!uploadedImg ? (
                      <img
                        src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624880648/afproject/images_jjljf9.png"
                        style={{ width: 125, height: 125 }}
                      />
                    ) : (
                      <img
                        src={uploadedImg}
                        style={{ width: 150, height: 150 }}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedImg)}
                      style={{ width: 125, height: 125 }}
                    />
                  </div>
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
                  // label="Email Address"
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
                  // label="Mobile Number"
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
                  // label="Birthday"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => setbirthday(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#bd9400", marginRight: "10px" }}
              className={classes.submit}
            >
              Cancel
            </Button>
            {selectedImg ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#bd9400" }}
                className={classes.submit}
                onClick={uploadImage()}
              >
                Check Details
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#bd9400" }}
                className={classes.submit}
              >
                Update Profile
              </Button>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;