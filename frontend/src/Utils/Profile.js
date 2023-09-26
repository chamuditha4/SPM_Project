import React, { useEffect, useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  './../styles/App.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { getUser } from './Common';
const CryptoJS = require("crypto-js");
var key = "ASECRET";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditUser() {
  const user = getUser();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);

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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function onPut(event) {
    event.preventDefault();
    if(window.confirm("Are you sure want to update?")===true){
      if (Password === ''){
        const task = { name: Name,email: Email };
        axios.put('http://localhost:4000/users/update-user/'+user._id, task)
        .then(response => {
          console.log(response);
          handleClick();
        });
      }else{
        const task = { name: Name,email: Email, password:(CryptoJS.AES.encrypt((Password),key)).toString()};
        axios.put('http://localhost:4000/users/update-user/'+user._id, task)
        .then(response => {
          console.log(response);
          handleClick();
        });
      }
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
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            update successfuly!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  

  export default EditUser