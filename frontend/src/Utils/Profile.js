import React, { useEffect, useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  './../styles/App.css';
import axios from 'axios';
import { getUser } from './Common';
const CryptoJS = require("crypto-js");
var key = "ASECRET";

function EditUser() {
  const user = getUser();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/users/get-user/' +user._id)
        .then(response => {
        // console.log(JSON.stringify(response.data));
        console.log(response);
          const myRepo = response.data;
          setName(myRepo.name);
          setEmail(myRepo.email);
          setPassword('');
        });
  };

  function onPut(event) {
    event.preventDefault();
    if (Password === ''){
      const task = { name: Name,email: Email };
      axios.put('http://localhost:4000/users/update-user/'+user._id, task)
      .then(response => {
        console.log(response);
      });
    }else{
      const task = { name: Name,email: Email, password:(CryptoJS.AES.encrypt((Password),key)).toString()};
      axios.put('http://localhost:4000/users/update-user/'+user._id, task)
      .then(response => {
        console.log(response);
      });
    }
    

  }

  useEffect(() => getRepo(),[]);

    return (
      <div>
        <div className="prof1">
          <h2>Profile</h2>
          <form onSubmit={onPut}>
          <TextField id="standard-uncontrolled" label="Name"  value={Name} onChange={e => setName(e.target.value)} /><br></br><br></br>
          <TextField id="standard-uncontrolled" label="Email"  value={Email} onChange={e => setEmail(e.target.value)} /><br></br><br></br>
          <TextField id="standard-uncontrolled" label="Password"  value={Password} onChange={e => setPassword(e.target.value)} />
          <h6>Please Leave a blank, if you are not changing password!.</h6>
          <Button variant="contained" color="primary"  type="submit">
          Edit User
          </Button>
          </form><br></br><br></br>
        </div>
      </div>
    )
  }
  

  export default EditUser