import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  './../../styles/App.css';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SetSalary() {
  const [repo,setRepo] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Eidss,setEidss] = useState('');
  const [Eids,setEids] = useState([]);
  const [Salary, setSalary] = useState('');
  const [Bonus, setBonus] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/users')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setEids(myRepo);
      });
  };

  async function onSubmit(event) {
    event.preventDefault();
    console.log(Eidss._id);
    if (Eidss._id !== undefined){
      try{
        await axios.get('http://localhost:4000/salary/get-salary/' +Eidss._id)
        .then(response => {
        // console.log(JSON.stringify(response.data));
        console.log(response);
          const myRepo = response.data;
          setSalary(myRepo[0].salary);
          setBonus(myRepo[0].bonus);
        });
      }catch(err){
        console.log(err);
      }
    }else{
      handleClick1();
    }
    
    
    }


    const handleClick1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen1(false);
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
    
    const handleClick2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };

  function onPut(event) {
    event.preventDefault();
    if (Salary=== null || Bonus === null || Eidss === ''){
      handleClick1();
    }else{
      try{
        if(window.confirm("Are you sure want to update?")==true){
        const task = { salary: Salary,bonus:Bonus };
      axios.put('http://localhost:4000/salary/update-salary/'+Eidss._id, task)
          .then(response => {
            console.log(response);
            handleClick();
          });
      }else{

      }
      }catch(err){
        handleClick2();
      }
      
    }

  }








  useEffect(() => getRepo(),[]);

    return (
      <div>
        <div className="prof">
          <h2>Set Salary</h2>
          <form onSubmit={onSubmit}>
          <Autocomplete
            onChange={(event, value) => setEidss(value)}
            values={Eidss}
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
          /><br></br><br></br>
          <Button variant="contained" color="primary" type="submit">
          Select User
          </Button></form><br></br><br></br>
          <form onSubmit={onPut}>
          <label for="salary">Enter your salary</label><br></br>
<input type="text" id="salary" name="salary" pattern="[0-9]+" required size="40"
           placeholder="Salary"  defaultValue=""  value={Salary} onChange={e => setSalary(e.target.value)}/><br></br><br></br>
          
          <br></br><br></br>
          <label for="Bonus">Enter your bonus</label>
<input type="text" id="Bonus" name="Bonus" pattern="[0-9]+" required size="40"
           placeholder="Bonus"  defaultValue=""  value={Bonus} onChange={e => setBonus(e.target.value)} /><br></br><br></br>
          
         
        <br></br><br></br>
          <Button variant="contained" color="primary" type="submit" startIcon={<DoneIcon/>}>
            Set Salary
          </Button></form><br></br><br></br>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please Fill Everything!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
              Something Wrong!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Salary Update successfuly!
            </Alert>
          </Snackbar>
        </Stack>

      </div>
      
    )
  }
  
  export default SetSalary