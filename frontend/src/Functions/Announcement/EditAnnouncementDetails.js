import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  './../../styles/App.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { getUser } from './../../Utils/Common';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditAnnouncementDetails() {
  const user = getUser();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [repo,setRepo] = useState([]);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Department,setDepartment] = useState('');
  const [Id, setId] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/Announcement/' + user._id)
      .then(response => {
        const myRepo = response.data;
        setRepo(myRepo);
      });
  };

  function onSubmit(event) {
    event.preventDefault();
    if (Id === ''){
      handleClick3();
    }else{
      setDescription('');
      setTitle('');
      
      
      axios.get('http://localhost:4000/Announcement/get-announcement/' +Id)
        .then(response => {
        console.log(response);
          const myRepo = response.data;
          setDescription(myRepo.description);
          setTitle(myRepo.name);
          setDepartment(myRepo.department)
        });
      }
    

  }

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

  function onPut(event) {
    event.preventDefault();
    if (Title === null || Description === null || Department === null){
      handleClick2();
    }else{
      try{
        console.log(Title);
        const task = { name: Title,description: Description,department:Department };
        axios.put('http://localhost:4000/Announcement/update-announcement/'+Id, task)
            .then(response => {
              console.log(response);
            });
          setDescription('');
          setTitle('');
          setDepartment('')
          handleClick();
      }
      catch(err){
        handleClick1();
        console.log(err);
      }
      
    }

  }
  
  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Edit Announcement</h2>
          <form onSubmit={onSubmit}>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select Announcement</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Id}
            label="Select Announcement"
            onChange={e => setId(e.target.value)}
            >
          <MenuItem value="Def" disabled selected="true">Select Announcement</MenuItem>
          { repo.map((repos) => (
            <MenuItem value={repos._id} name={repos.name} >{repos.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
          <br></br><br></br>
          <Button variant="contained" color="primary" type="submit">
          Select Announcement
          </Button>
          </form><br></br><br></br>
          <form onSubmit={onPut}>
          <TextField id="standard-uncontrolled" label="Title" defaultValue="" value={Title} onChange={e => setTitle(e.target.value)} /><br></br><br></br>
          <FormLabel component="legend">Department</FormLabel>
              <RadioGroup aria-label="Department" name="Department"  value={Department} onChange={e => setDepartment(e.target.value)}  >
                <FormControlLabel value="IT" control={<Radio />} label="IT" />
                <FormControlLabel value="Accounting" control={<Radio />} label="Accounting" />
                <FormControlLabel value="Management" control={<Radio />} label="Management" />
              </RadioGroup><br></br><br></br>
          <TextField id="outlined-multiline-flexible" label="Announcement" multiline Rows={4} variant="outlined" value={Description} style = {{width: 350}} defaultValue="" onChange={e => setDescription(e.target.value)}/><br></br><br></br>
          <Button variant="contained" color="primary" type="submit">
            Update Announcement
          </Button></form><br></br><br></br>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Announcement update successfuly!
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
            Please Select Announcement!.
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  
  export default EditAnnouncementDetails