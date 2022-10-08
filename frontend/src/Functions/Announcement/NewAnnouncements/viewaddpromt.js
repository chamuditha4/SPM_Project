import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AddressInput from "material-ui-address-input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { SettingsInputCompositeTwoTone } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/dxz8wbaqv/image/upload/v1629917640/SPM%20Project/Tharaka/aman-jakhar-CrTTr9xF-w4-unsplash_k8zign.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: "500px !important",
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  console.log(props);
  const [emp, setemp] = React.useState(props.location.data.empData);
  //const [state, setState] = React.useState({
  // fName: emp.fName,
  // Nic: emp.Nic,
  // emCoNo: emp.emCoNo,
  // email: emp.email,
  // age: emp.age,
  // line1: emp.emAddress.line1,
  // line2: emp.emAddress.line2,
  // city: emp.emAddress.city,
  // state: emp.emAddress.state,
  // gender: emp.gender,
  // emType: emp.emType
  //});

  const [fName, setfName] = React.useState(emp.fName);
  const [Nic, setNic] = React.useState(emp.Nic);
  const [cNo, setCNo] = React.useState(emp.emCoNo);
  const [email, setEmail] = React.useState(emp.email);
  //const [password, setPassword] = React.useState('')
  const [age, setAge] = React.useState(emp.age);
  const [line1, setLine1] = React.useState(emp.emAddress.line1);
  const [line2, setLine2] = React.useState(emp.emAddress.line2);
  const [city, setCity] = React.useState(emp.emAddress.city);
  const [state, setState] = React.useState(emp.emAddress.state);
  const [gender, setGender] = React.useState(emp.gender);
  const [eType, setEType] = React.useState(emp.emType);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fName: fName,
      Nic: Nic,
      emCoNo: cNo,
      email: email,
      //password: password,
      age: age,
      emAddress: {
        line1: line1,
        line2: line2,
        city: city,
        state: state,
      },
      gender: gender,
      emType: eType,
    };

    console.log(data);
    console.log(emp._id);
    axios
      .post(
        "https://car-rentalsystem-backend.herokuapp.com/api/v1/employee/updateemployee/" +
          emp._id,
        data
      )
      .then((res) => {
        console.log(res);
        alert("Successfully Updated");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });

    // setfName('')
    // setNic('')
    // setCNo('')
    // setEmail('')
    // setPassword('')
    // setAge('')
    // setLine1('')
    // setLine2('')
    // setCity('')
    // setState('')
    // setGender('')
    // setEType('')
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Employee Updation
          </Typography>
          <form
            className={classes.form}
            method="post"
            onSubmit={onSubmit}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={fName}
              onChange={(e) => setfName(e.target.value)}
              id="FName"
              label="Full Name"
              name="FName"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              value={Nic}
              onChange={(e) => setNic(e.target.value)}
              id="Nic"
              label="Nic"
              name="Nic"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={cNo}
              onChange={(e) => setCNo(e.target.value)}
              id="CNo"
              label="Contact Number"
              name="CNo"
              type="Number"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {/* <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              label="Password"
              name="password"
              type="password"
            />  */}

            <TextField
              margin="normal"
              required
              fullWidth
              value={age}
              id="age"
              label="Age"
              name="age"
              autoFocus
            />
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                <br />
                Employee's Address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    autoComplete="shipping address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    autoComplete="shipping address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="shipping address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
              </Grid>
            </React.Fragment>

            <FormControl component="fieldset">
              <Typography variant="h6" gutterBottom>
                <br />
                Gender
              </Typography>
              <RadioGroup
                aria-label="gender"
                name="radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>

              <Typography variant="h6" gutterBottom>
                <br />
                Employee Type
              </Typography>
              <RadioGroup
                aria-label="type"
                name="radio-buttons-group"
                value={eType}
                onChange={(e) => setEType(e.target.value)}
              >
                <FormControlLabel
                  value="driver"
                  control={<Radio />}
                  label="driver"
                />
                <FormControlLabel
                  value="Accountant"
                  control={<Radio />}
                  label="Accountant"
                />
                <FormControlLabel
                  value="Mechanic"
                  control={<Radio />}
                  label="Mechanic"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}