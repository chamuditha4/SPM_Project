import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#bd9400",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  text: {
    height: 20,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  detailsbody: {
    margin: "20px",
  },
  carddetails: {
    height: 382,
  },
}));

const tiers = [
  {
    title: "Free",
    price: "0",
    description: ["Full AC", "Auto Gear", "5 Passanger", "Petrol"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
];

const UserReport = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [reservationStartDate, setreservationStartDate] = React.useState(
    new Date()
  );
  const [reservationEndDate, setreservationEndDate] = React.useState(
    new Date()
  );
  const [price, setprice] = React.useState();

  const [reserveDates, setreserveDates] = React.useState([]);
  const [carData, setcarData] = React.useState(props.location.state);

  const [checked, setchecked] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        "https://car-rentalsystem-backend.herokuapp.com/api/v1/reservation/getreservedates/" +
          carData._id
      );
      setreserveDates(data.data.changedDates);
    }
    fetchData();
  }, []);

  const disableCustomDt = (datex) => {
    if (reserveDates.length !== 0) {
      let date = new Date(datex),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return !reserveDates.includes([date.getFullYear(), mnth, day].join("-"));
    } else {
      let date = new Date(datex);
      return date;
    }
  };

  const onClickButtton = (e) => {
    e.preventDefault();
    getDateCount();
    setchecked(true);
  };

  const onSubmitButtton = async (e) => {
    const data = {
      due: reservationStartDate,
      to: reservationEndDate,
      userID: "",
      carID: carData._id,
      payment: price,
    };

    const user = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}reservation/addreservation`,
      data,
      { withCredentials: true }
    );
    console.log(user.data.reservation._id);
    const id = user.data.reservation._id;
    alert("Your Booking is Success");
    history.push("/payment/" + id);
  };

  console.log(props);

  const getDateCount = () => {
    console.log("working");
    let start = new Date(reservationStartDate);
    let end = new Date(reservationEndDate);
    let datecount = end.getDate() - start.getDate();

    let tot = carData.vehiclePrice * datecount;
    setprice(tot);
  };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={9}>
          <div container className={classes.detailsbody}>
            <Container maxWidth="md" component="main">
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item md={8}>
                  <Card>
                    <CardHeader
                      title="Toyota Prius"
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1629518812/afproject/SPM%20Project/bavdbbnata8yrgjsuiix.jpg"
                        title="Image title"
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card>
                    <CardContent>
                      <CardContent className={classes.carddetails}>
                        <div className={classes.cardPricing}>
                          <Typography variant="h6" color="textSecondary">
                            Car Details
                          </Typography>
                        </div>
                        <ul>
                          {tiers[0].description.map((line) => (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                            >
                              {line}
                            </Typography>
                          ))}
                        </ul>
                      </CardContent>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Check Availability
            </Typography>
            <form className={classes.form} noValidate>
              <DatePicker
                selected={reservationStartDate}
                onChange={(date) => setreservationStartDate(date)}
                minDate={new Date()}
                filterDate={disableCustomDt}
              />
              <DatePicker
                selected={reservationEndDate}
                onChange={(date) => setreservationEndDate(date)}
                filterDate={disableCustomDt}
                minDate={new Date()}
                maxDate={new Date("2021-12-31")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#bd9400" }}
                className={classes.submit}
                onClick={onClickButtton}
              >
                Check Vehical
              </Button>

              <Container maxWidth="sm" component="main">
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Pricing
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  Rs. {price}.00
                </Typography>
              </Container>
              {checked === false ? (
                <Button
                  onClick={onSubmitButtton}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled
                  style={{ backgroundColor: "#bd9400" }}
                  className={classes.submit}
                >
                  Book Now
                </Button>
              ) : (
                <Button
                  onClick={onSubmitButtton}
                  // href={"/payment"}
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#bd9400" }}
                  className={classes.submit}
                >
                  Book Now
                </Button>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserReport;