import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React, { useState, useEffect, useCallback } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
}));

export default function VehicleRegistration() {
  const INITIAL_VALUES = {
    vehicleName: "",
    vehicleNumber: "",
    vehicleCategory: "",
    manufactureYear: "",
    vehicleSupplier: "",
    vehicleColor: "",
    vehicleType: "",
    vehiclePrice: "",
    vehicleCondition: "",
    mileage: "",
    fuelType: "",
    registerDate: null,
    specification: "",
    open: false,
    vehicleImage: "",
  };

  //
  // --------------------------------------
  //   const [selectedImg, setselectedImg] = React.useState();
  //   // const [uploadedImg, setuploadedImg] = React.useState();
  //
  //   const uploadImage = async (e) => {
  //     const formData = new FormData();
  //     formData.append("file", selectedImg);
  //     formData.append("upload_preset", "spmproject");
  //     const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload",
  //         formData
  //     );
  //     setValues({...values, vehicleImage: response.data.url})
  //     // setuploadedImg(response.data.url);
  //     alert("Your Details Are Ok To SignUp");
  //   };
  //
  // -----------------------------------------

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({ ...values, open: false });
  };

  const [values, setValues] = React.useState(INITIAL_VALUES);

  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();

    const datax = await axios.post(
      "https://car-rentalsystem-backend.herokuapp.com/api/v1/vehical/addvehical",
      values
    );
    setValues({
      vehicleName: "",
      vehicleNumber: "",
      vehicleCategory: "",
      manufactureYear: "",
      vehicleSupplier: "",
      vehicleColor: "",
      vehicleType: "",
      vehiclePrice: "",
      vehicleCondition: "",
      mileage: "",
      fuelType: "",
      registerDate: null,
      specification: "",
      open: true,
      vehicleImage: "",
    });
  };

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "spmproject");
    setLoading(true);
    const res = await fetch(
      "		https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h4">
          Vehicle Registration
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
          <Grid container>
            {/* 1st column */}
            <Grid item xs={4}>
              {/* <h3>Upload Image</h3> */}
              <Typography
                component="h1"
                variant="h5"
                style={{ marginBottom: 20 }}
              >
                Upload Image
              </Typography>

              {/*{!values.vehicleImage ? (*/}
              {/*    <div>*/}
              {/*      {!selectedImg ? (*/}
              {/*          <img*/}
              {/*              src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624880648/afproject/images_jjljf9.png"*/}
              {/*              style={{ width: 125, height: 125 }}*/}
              {/*          />*/}
              {/*      ) : (*/}
              {/*          <img*/}
              {/*              src={URL.createObjectURL(selectedImg)}*/}
              {/*              style={{ width: 125, height: 125 }}*/}
              {/*          />*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*) : (*/}
              {/*    <img src={values.vehicleImage} style={{ width: 150, height: 150 }} />*/}
              {/*)}*/}

              <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
              />
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <img src={image} style={{ width: "350px", marginTop: 50 }} />
              )}
            </Grid>
            {/* 2nd column */}
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ paddingBottom: 20, width: 300 }}
                    // autoComplete="fname"
                    // name="vehicleName"
                    variant="outlined"
                    required
                    // fullWidth
                    // id="vehicleName"
                    label="Vehicle Name"
                    autoFocus
                    value={values.vehicleName}
                    onChange={(e) =>
                      setValues({ ...values, vehicleName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ paddingBottom: 20, width: 300 }}
                    // autoComplete="fname"
                    // name="firstName"
                    variant="outlined"
                    required
                    // fullWidth
                    // id="firstName"
                    label="Vehicle Number"
                    value={values.vehicleNumber}
                    onChange={(e) =>
                      setValues({ ...values, vehicleNumber: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ paddingBottom: 20, width: 300 }}
                    // autoComplete="fname"
                    // name="firstName"
                    variant="outlined"
                    required
                    // fullWidth
                    // id="firstName"
                    label="Color"
                    // autoFocus
                    value={values.vehicleColor}
                    onChange={(e) =>
                      setValues({ ...values, vehicleColor: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20, width: 300 }}
                    className={classes.margin}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      style={{ width: 300 }}
                      type="number"
                      // id="outlined-adornment-amount"
                      value={values.vehiclePrice}
                      onChange={(e) =>
                        setValues({ ...values, vehiclePrice: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">Rs.</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    className={classes.margin}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Mileage
                    </InputLabel>
                    <OutlinedInput
                      style={{ width: 300 }}
                      type="number"
                      // id="outlined-adornment-amount"
                      value={values.mileage}
                      onChange={(e) =>
                        setValues({ ...values, mileage: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">km</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ paddingBottom: 20, width: 300 }}
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Register Date"
                      format="dd/MM/yyyy"
                      value={values.registerDate}
                      InputAdornmentProps={{ position: "end" }}
                      onChange={(date) => {
                        setValues({
                          ...values,
                          registerDate: date,
                        });
                      }}
                      disableFuture={true}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ paddingBottom: 20, width: 300 }}
                    // id="outlined-multiline-static"
                    label="specification"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={values.specification}
                    onChange={(e) =>
                      setValues({ ...values, specification: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* 3rd column */}
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ paddingBottom: 20, width: 300 }}
                    // autoComplete="fname"
                    // name="firstName"
                    variant="outlined"
                    required
                    // fullWidth
                    // id="firstName"
                    label="Supplier"
                    value={values.vehicleSupplier}
                    onChange={(e) =>
                      setValues({ ...values, vehicleSupplier: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    className={classes.margin}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Manufactured Year
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      // id="outlined-adornment-amount"
                      style={{ width: 300 }}
                      value={values.manufactureYear}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          manufactureYear: e.target.value,
                        })
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      style={{ width: 200 }}
                      labelId="demo-simple-select-outlined-label"
                      // id="demo-simple-select-outlined"
                      value={values.vehicleCategory}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          vehicleCategory: e.target.value,
                        });
                      }}
                      // label="Category"
                    >
                      <MenuItem value={"Car"}>Car</MenuItem>
                      <MenuItem value={"Van"}>Van</MenuItem>
                      <MenuItem value={"Pickup Truck"}>Pickup Truck</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Type
                    </InputLabel>
                    <Select
                      style={{ width: 200 }}
                      labelId="demo-simple-select-outlined-label"
                      // id="demo-simple-select-outlined"
                      value={values.vehicleType}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          vehicleType: e.target.value,
                        });
                      }}
                      // label="Category"
                    >
                      <MenuItem value={"Automatic"}>Automatic</MenuItem>
                      <MenuItem value={"Manual"}>Manual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Condition
                    </InputLabel>
                    <Select
                      style={{ width: 200 }}
                      labelId="demo-simple-select-outlined-label"
                      // id="demo-simple-select-outlined"
                      value={values.vehicleCondition}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          vehicleCondition: e.target.value,
                        });
                      }}
                      // label="Category"
                    >
                      <MenuItem value={"Used"}>Used</MenuItem>
                      <MenuItem value={"Brand New"}>Brand New</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{ paddingBottom: 20 }}
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Fuel Type
                    </InputLabel>
                    <Select
                      style={{ width: 200 }}
                      labelId="demo-simple-select-outlined-label"
                      // id="demo-simple-select-outlined"
                      value={values.fuelType}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          fuelType: e.target.value,
                        });
                      }}
                      // label="Category"
                    >
                      <MenuItem value={"Petrol"}>Petrol</MenuItem>
                      <MenuItem value={"Diesel"}>Diesel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{
                      width: 300,
                      marginTop: 60,
                      height: 50,
                      backgroundColor: "#ffc800",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    // color="secondary"
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*           
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}