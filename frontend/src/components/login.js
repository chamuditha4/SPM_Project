import React from "react";
import { Component } from "react";
//import "./login.module.css";
import { Link } from "react-router-dom";
//import { login } from "../restcall";
import { Button, Paper, Chip } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { width } from "@mui/system";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //const result = login(this.state.email, this.state.password);

    //window.location.href = "/register";
  };

  render() {
    return (
      <div className="loginForm" style={{textAlign: "center"}}>

        <img style={{width: "20%", padding:"2%" }} src={require('../resources/SLIIT.png')} />  


        <div>
          <Paper sx={{ padding: "32px", width: "40%", textAlign:"center", justifyContent:"center", margin: "0 auto",borderBottom: '3px solid #00e676'
                    ,marginTop:'50px'
                    }}>


                      
            <h2 style={{marginTop:'0px'
                        ,color: '#00e676',
                        background: 'white',
                        borderRadius: '100px',
                        display: 'inline-block',
                        padding: '6px 40px',
                        fontFamily: 'sans-serif',
          }}>Login</h2>

            <form onSubmit={this.handleSubmit}>
              <div>
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  onChange={this.handleEmail}
                />
              </div>
              <br></br>
              <div>
                <TextField
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  onChange={this.handlePassword}
                />
              </div>
              <br></br>
              <div>
                <Button
                  size="medium"
                  variant="contained"
                  color="success"
                  className="buttonMargin"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
            </Paper>

            <br/>
            <Chip 
                label="OR" 
                style={{fontSize:'15px',color: '#868686',fontWeight:'bold'}}
                /><br/><br/>

            {/* <Link style={{ textDecoration: "none" }} to="/register"> */}
              <Button sx={{textAlign:"center",width:'44.7%'}}
                size="small"
                variant="contained"
                color="info"
                className="buttonMargin"
              >
                Register
              </Button>
            {/* </Link> */}

          </div>
      </div>
    );
  }
}