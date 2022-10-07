import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import  './../../styles/App.css';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function AddRole() {
  const [Eids,setEids] = useState([]);
  const [Id, setId] = useState(null);
  const [Role, setRole] = useState('');
  const [Department, setDepartment] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const getRepo = () => {
    axios.get('http://localhost:4000/users')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setEids(myRepo);
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


  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };

  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };


  function onSubmit(event) {
    event.preventDefault();
    if (Id === null){
      handleClick2();
    }else{
      axios.get('http://localhost:4000/users/get-user/' +Id._id)
      .then(response => {
      // console.log(JSON.stringify(response.data));
      console.log(response);
        const myRepo = response.data;
        setRole(myRepo.roll);
        setDepartment(myRepo.department);
      });
    }
    
      
  }

  function onPut(event) {
    event.preventDefault();
    if (Id===null){
      handleClick2();
    }
    if (Role===null){
      handleClick2();
    }if(Department === null){
      handleClick3();
    }else{
      try{
        if(window.confirm("Are you sure you want to update")== true){
        const task = { roll: Role, department:Department };
        axios.put('http://localhost:4000/users/update-user/'+Id._id, task)
        .then(response => {
          console.log(response);
          handleClick();
        });
      }else{}
      }catch(err){
        handleClick1();
      }
      
    }
    
    

  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Change User Role</h2>
          <form onSubmit={onSubmit}>
          <Autocomplete
            onChange={(event, value) => setId(value)}
            values={Id}
            id="tags-standard"
            limitTags={1}
            size="small"
            options={Eids}
            getOptionLabel={(option) => option.username}
            renderInput={(params) => (
              <TextField 
                {...params}
                style={{ width: 350 }}
                variant="standard"
                label="User Name"
                placeholder="Names"
              />
            )}
          /><br></br>
          <Button variant="contained" color="primary" type="submit" startIcon={<AddIcon/>}>
          Select User
          </Button></form><br></br><br></br>
          <form onSubmit={onPut}>
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup aria-label="role" value={Role} name="role" onChange={e => setRole(e.target.value)} >
            <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
            <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
          </RadioGroup><br></br>

          <FormLabel component="legend">Department</FormLabel>
              <RadioGroup aria-label="Department" name="Department"  value={Department} onChange={e => setDepartment(e.target.value)}  >
                <FormControlLabel value="IT" control={<Radio />} label="IT" />
                <FormControlLabel value="Accounting" control={<Radio />} label="Accounting" />
                <FormControlLabel value="Management" control={<Radio />} label="Management" />
              </RadioGroup><br></br>
          <Button variant="contained" color="primary" type="submit" startIcon={<DoneIcon/>}>
          Set Role
          </Button></form><br></br><br></br>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Role update successfuly!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={600} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Something Wrong!
            </Alert>
          </Snackbar>
        </Stack>


        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={600} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
            Please Fill Everything!.
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open3} autoHideDuration={600} onClose={handleClose3}>
            <Alert onClose={handleClose3} severity="warning" sx={{ width: '100%' }}>
            Please Fill Department!.
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  


  export default AddRole