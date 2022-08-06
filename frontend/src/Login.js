import  './styles/App.css';
import Header from './Header';
import Footer from './Footer';
import React, {Component} from "react";
import axios from 'axios';
import { setUserSession  } from './Utils/Common';

export default class Login extends Component{
    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        // Setting up state
        this.state = {
          username: '',
          password:''
        }
      }
    
      onChangeUsername(e) {
        this.setState({username: e.target.value})
      }
    
      onChangePassword(e) {
        this.setState({password: e.target.value})
      }
    
    
    
      onSubmit(e) {
        e.preventDefault()
    
        const UserOBJ = {
          username: this.state.username,
          password: this.state.password
        };
        axios.post('http://localhost:4000/users/login-user', UserOBJ)
          .then(res =>{
            console.log(res.data.user) //log to terminal
            if (res.data.user==='pw Error'){
              alert("Please Check Password!");
            }else if (res.data.user==='User Error'){
              alert("Please Check Username!");
            }else if (res.data.user==='Error'){
              alert("Error!");
            }
            else{
              setUserSession(res.data.token, res.data.user);
              window.location.href = "/EmpDashBoard";
            }
            
          });
    
    
        this.setState({username: '', password: ''})
    
      }
  
    render() {
      return (
        <div>
            <Header />
            
            <div className="center">
                <form  onSubmit={this.onSubmit}>
                    <p>Username:</p>
                    <input type="text" id="uname" name="uname"  value={this.state.username} onChange={this.onChangeUsername}  required/><br></br>
                    <p>Password:</p>
                    <input type="password" id="pwd" name="pwd"  value={this.state.password} onChange={this.onChangePassword}  required/><br></br><br></br>
                    <br></br>
                    <input id = "Signin" type="submit" value="Submit"/>
                </form>
            </div>

            <Footer />
        </div>
      );
    }
  }
