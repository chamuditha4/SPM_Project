import Dialog from '@material-ui/core/Dialog/Dialog';
import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import {loginDialogStyles} from '../../helpers/styles/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';
import Fab from '@material-ui/core/Fab/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import {apiUrls} from '../../helpers/Constants/Constants';
import {withSnackbar} from 'notistack';
import Slide from '@material-ui/core/Slide/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const LoginDialog = props => {
  const {classes} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({email: false, password: false});

  const loginUser = () => {
    axios
      .post(apiUrls.login, {
        email,
        password
      })
      .then(response => {
        console.log(response.data);
        props.callback(response.data);
      })
      .catch(error => {
        console.log(error);
        const errorMessage = error.data.message ? error.data.message : 'There was an error processing your request';
        props.enqueueSnackbar(errorMessage, {variant: 'error'});
      });
  };
  const onLoginClick = () => {
    // check email
    if (email.trim().length <= 0 || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      props.enqueueSnackbar('Please enter a valid email', {variant: 'warning'});
      setError({...error, email: true});
    }
    // check password
    else if (password.trim().length <= 0 || password.trim().length <= 5) {
      props.enqueueSnackbar('Password should have a minimum of 5 characters', {variant: 'warning'});
      setError({...error, password: true});
    } else {
      loginUser();
    }
  };
  return (
    <Dialog fullScreen open={true} TransitionComponent={Transition}>
      <Grid container spacing={40} className={classes.withDarkImage}>
        <Grid item xs={12}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Login to Employee Manager
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignContent={'center'} alignItems={'center'} justify={'center'} spacing={32}>
            <Paper className={classes.paper} elevation={1}>
              <Grid container alignContent={'center'} justify={'center'} spacing={8}>
                <Grid xs={12} item>
                  <TextField
                    error={error.email}
                    id="email-id"
                    label="Email Address"
                    className={classes.textField}
                    value={email}
                    type="email"
                    autoComplete="email"
                    onChange={event => {
                      setEmail(event.target.value);
                      setError({...error, email: false});
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    error={error.password}
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={password}
                    onChange={event => {
                      setPassword(event.target.value);
                      setError({...error, password: false});
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify={'flex-end'}>
                    <Fab variant="extended" color="primary" aria-label="Add" onClick={onLoginClick} className={classes.margin}>
                      <NavigationIcon className={classes.extendedIcon} />
                      Login
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default withStyles(loginDialogStyles)(withSnackbar(LoginDialog));