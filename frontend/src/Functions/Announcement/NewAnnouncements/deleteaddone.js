import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import axios from "axios";
import CookieService from "../../../Utils/Cookie";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage:
      "url(https://res.cloudinary.com/dxz8wbaqv/image/upload/v1629917258/SPM%20Project/Tharaka/brock-wegner-pWGUMQSWBwI-unsplash_jhd24t.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [token, settoken] = React.useState(CookieService.get("token"));
  const [User, setUser] = React.useState();

  const [UserData, setUserData] = React.useState();

  React.useEffect(() => {
    if (token == null) {
      console.log("No User");
      setUser(false);
    } else {
      setUser(true);
      async function fectchData() {
        const userDetails = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}user/profile`,
          {
            withCredentials: true,
          }
        );
        setUserData(userDetails.data.user);
      }
      fectchData();
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/createReportOfService"
            >
              <ListItemText primary="Report Vehicle Issues" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/userprofileemployee"
            >
              <ListItemText primary="My Account" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/applyleaves"
            >
              <ListItemText primary="Apply Leaves" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/vehicleregistration"
            >
              <ListItemText primary="Vehicle Registration" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/vehicleinformation"
            >
              <ListItemText primary="Vehicle Information" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/ownerregistration"
            >
              <ListItemText primary="Owner Registration" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              to="/ownerinformation"
            >
              <ListItemText primary="Owner Information" />
            </Link>
          </ListItem>

          {UserData && UserData.role == "Employee" ? (
            <div>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <Link
                  style={{ textDecoration: "none", color: "#000000" }}
                  to="/getListOfApprovedQuotation"
                >
                  <ListItemText primary="Approved Quotation" />
                </Link>
              </ListItem>
              <div>
                {UserData && UserData.role == "Admin" ? (
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <Link
                      style={{ textDecoration: "none", color: "#000000" }}
                      to="/getListOfQuotationOwner"
                    >
                      <ListItemText primary="Owner Quotation" />
                    </Link>
                  </ListItem>
                ) : null}
              </div>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <Link
                  style={{ textDecoration: "none", color: "#000000" }}
                  to="/getListReportOfFailure"
                >
                  <ListItemText primary="List Of Failure" />
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <Link
                  style={{ textDecoration: "none", color: "#000000" }}
                  to="/generateReport"
                >
                  <ListItemText primary="Generate Report" />
                </Link>
              </ListItem>
            </div>
          ) : null}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}></Grid>
        </Container>
      </main>
    </div>
  );
}