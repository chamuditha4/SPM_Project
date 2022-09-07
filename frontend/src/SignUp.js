import  './styles/App.css';
import Header from './Header';
import Footer from './Footer';
import React, {Component} from "react";
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
const CryptoJS = require("crypto-js");
var key = "ASECRET";

var eids = '';
export default class Signup extends Component{
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangename = this.onChangename.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.onChangeAccountType = this.onChangeAccountType.bind(this);
    this.onDepartment = this.onDepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

    // Setting up state
    this.state = {
      name:'',
      username: '',
      email:'',
      password:'',
      repassword:'',
      accounttype:'Manager',
      department:'Accounting',
      eid:''
    }
  }

  onChangename(e) {
    this.setState({name: e.target.value})
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeRePassword(e) {
    this.setState({repassword: e.target.value})
  }

  onChangeAccountType(e) {
    this.setState({accounttype: e.target.value})
  }

  onDepartment(e) {
    this.setState({department: e.target.value})
  }


  async onSubmit(e) {
    e.preventDefault()

    if (this.state.password === this.state.repassword){


      if(this.state.password.length<7){

        alert("Password should be at least 8 characters!")
        return
      }

      const UserOBJ = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: (CryptoJS.AES.encrypt((this.state.password), key)).toString(),
        salary: '0',
        department: this.state.department,
        roll: this.state.accounttype
        
      };
  
      
      
      await axios.post('http://localhost:4000/users/create-user', UserOBJ)
        .then(async res => {console.log(res.data)
          const myRepo = await res.data;
          await this.setState({eid: myRepo._id});
          eids = await myRepo._id;
        });
  
        const SalOBJ = {
          eid: eids,
          salary: '0',
          bonus: '0'
        };
  
        axios.post('http://localhost:4000/salary/create-salary', SalOBJ)
      .then(res1 => console.log(res1.data))
  
  
      this.setState({ name: '', username: '', email: '', password: '', repassword: '',department:'', accounttype: ''})
      window.location.href = "/Login";
    }else{
      alert("Passwords are not matching!.");
    }
    

  }




  render() {
    return (
      <div>
          <Header />
          <div className="center">
            <form onSubmit={this.onSubmit}>
            <label for="uname">Name :</label><br></br>
              <input type="text" id="uname" name="uname"  value={this.state.name} onChange={this.onChangename} required /><br></br>
              <label for="uname">Username :</label><br></br>
              <input type="text" id="uname" name="uname"  value={this.state.username} onChange={this.onChangeUsername} required /><br></br>
              <label for="email">Email :</label><br></br>
              <input type="email" id="email" name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"  required  value={this.state.email} onChange={this.onChangeEmail}   /><br></br>
              <label for="uname">Password:</label><br></br>
              <input type="password" id="password" name="password"   value={this.state.password} required onChange={this.onChangePassword} /><br></br>
              <label for="password">Re-type Password:</label><br></br>
              <input type="password" id="cpassword" name="cpassword"    value={this.state.repassword} required onChange={this.onChangeRePassword}  /><br></br><br></br>
              
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup aria-label="role" name="role" defaultValue="Manager" onChange={this.onChangeAccountType}  >
                <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
              </RadioGroup><br></br>

              <FormLabel component="legend">Department</FormLabel>
              <RadioGroup aria-label="Department" name="Department" defaultValue="Accounting" onChange={this.onDepartment}  >
                <FormControlLabel value="IT" control={<Radio />} label="IT" />
                <FormControlLabel value="Accounting" control={<Radio />} label="Accounting"/>
                <FormControlLabel value="Management" control={<Radio />} label="Management" />
              </RadioGroup><br></br>

              <input type="submit" id="butto"  value="Submit" />
            </form>
          </div>
          <Footer />
      </div>
    );
  }
}
