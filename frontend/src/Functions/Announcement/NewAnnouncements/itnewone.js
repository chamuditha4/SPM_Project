import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://cdni.iconscout.com/illustration/premium/thumb/couple-looking-to-buy-new-car-2935943-2438536.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function OwnerRegistration() {
  const INITIAL_VALUES = {
    ownerFirstName: "",
    ownerLastName: "",
    ownerNIC: "",
    ownerEmail: "",
    ownerContact: "",
    ownerAddress: "",
    vehicleNumbers: "",
    open: false,
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({ ...values, open: false });
  };

  const [values, setValues] = React.useState(INITIAL_VALUES);

  console.log("values", values);

  const onSubmit = async (e) => {
    e.preventDefault();

    const datax = await axios.post(
      "https://car-rentalsystem-backend.herokuapp.com/api/v1/owner/addowner",
      values
    );
    setValues({
      ownerFirstName: "",
      ownerLastName: "",
      ownerNIC: "",
      ownerEmail: "",
      ownerContact: "",
      ownerAddress: "",
      vehicleNumbers: "",
      open: true,
    });
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          <Typography component="h1" variant="h5">
            Vehicle Owner Registration
          </Typography>
          <Snackbar
            open={values.open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Successfully Inserted!
            </Alert>
          </Snackbar>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ paddingLeft: 10 }}
                  // autoComplete="fname"
                  // name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  // id="firstName"
                  label="First Name"
                  autoFocus
                  value={values.ownerFirstName}
                  onChange={(e) =>
                    setValues({ ...values, ownerFirstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  // id="lastName"
                  label="Last Name"
                  // name="lastName"
                  // autoComplete="lname"
                  value={values.ownerLastName}
                  onChange={(e) =>
                    setValues({ ...values, ownerLastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ paddingLeft: 10 }}
                  variant="outlined"
                  required
                  fullWidth
                  // id="email"
                  label="NIC"
                  // name="email"
                  // autoComplete="email"
                  value={values.ownerNIC}
                  onChange={(e) =>
                    setValues({ ...values, ownerNIC: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ paddingLeft: 10 }}
                  variant="outlined"
                  required
                  fullWidth
                  // id="email"
                  label="Email Address"
                  // name="email"
                  // autoComplete="email"
                  value={values.ownerEmail}
                  onChange={(e) =>
                    setValues({ ...values, ownerEmail: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ paddingLeft: 10 }}
                  variant="outlined"
                  required
                  fullWidth
                  // id="email"
                  label="Address"
                  // name="email"
                  // autoComplete="email"
                  value={values.ownerAddress}
                  onChange={(e) =>
                    setValues({ ...values, ownerAddress: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ paddingLeft: 10 }}
                  variant="outlined"
                  required
                  fullWidth
                  // id="email"
                  label="Contact Number"
                  // name="email"
                  // autoComplete="email"
                  value={values.ownerContact}
                  onChange={(e) =>
                    setValues({ ...values, ownerContact: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ paddingBottom: 20, paddingLeft: 10 }}
                  // id="outlined-multiline-static"
                  label="Vehicle Numbers *"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={values.vehicleNumbers}
                  onChange={(e) =>
                    setValues({ ...values, vehicleNumbers: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              style={{
                height: 50,
                backgroundColor: "#ffc800",
                color: "#000",
                fontWeight: "bold",
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register User
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>

    //
    //
    // <Container container component="main" className={classes.root}>
    //   <CssBaseline />
    //   <Grid item xs={false} sm={4} md={7} className={classes.image} />
    //   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //
    //
    //     <Grid
    //   <div className={classes.paper}>
    //     {/* <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar> */}
    //     <Typography component="h1" variant="h5">
    //       Vehicle Owner Registration
    //     </Typography>
    //     <Snackbar open={values.open} autoHideDuration={2000} onClose={handleClose}>
    //       <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //         Successfully Inserted!
    //       </Alert>
    //     </Snackbar>
    //     <form className={classes.form} onSubmit={onSubmit} >
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             // autoComplete="fname"
    //             // name="firstName"
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="firstName"
    //             label="First Name"
    //             autoFocus
    //             value={values.ownerFirstName}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerFirstName: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="lastName"
    //             label="Last Name"
    //             // name="lastName"
    //             // autoComplete="lname"
    //             value={values.ownerLastName}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerLastName: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="email"
    //             label="NIC"
    //             // name="email"
    //             // autoComplete="email"
    //             value={values.ownerNIC}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerNIC: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="email"
    //             label="Email Address"
    //             // name="email"
    //             // autoComplete="email"
    //             value={values.ownerEmail}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerEmail: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="email"
    //             label="Address"
    //             // name="email"
    //             // autoComplete="email"
    //             value={values.ownerAddress}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerAddress: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             // id="email"
    //             label="Contact Number"
    //             // name="email"
    //             // autoComplete="email"
    //             value={values.ownerContact}
    //             onChange={(e) =>
    //               setValues({ ...values, ownerContact: e.target.value })
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             style={{ paddingBottom: 20 }}
    //             // id="outlined-multiline-static"
    //             label="Vehicle Numbers"
    //             multiline
    //             rows={4}
    //             fullWidth
    //             variant="outlined"
    //             value={values.vehicleNumbers}
    //             onChange={(e) =>
    //               setValues({ ...values, vehicleNumbers: e.target.value })
    //             }
    //           />
    //         </Grid>
    //       </Grid>
    //       <Button
    //         type="submit"
    //         style={{
    //           height: 50,
    //           backgroundColor: "#ffc800",
    //           color: "#000",
    //           fontWeight: "bold",
    //         }}
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //       >
    //         Register User
    //       </Button>
    //
    //     </form>
    //   </div>
    // </Container>
  );
}