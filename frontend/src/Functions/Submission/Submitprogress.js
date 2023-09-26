import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../styles/App.css';
import TextField from '@material-ui/core/TextField';
import { getUser } from './../../Utils/Common';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@material-ui/core/Box";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Submitprogress() {
  const user = getUser();
  const [repo,setRepo] = useState([]);
  const [Id,setId] = useState('');
  const [Date,setDate] = useState('');
  const [Time_Start,setTime_Start] = useState('');
  const [Time_End,setTime_End] = useState('');
  const [Log,setLog] = useState('');
  const [DisableDiv,setDisableDiv] = useState('my-div');
  const [final, setfinal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [isTrue, setIsTrue] = React.useState(false);


  const getRepo = () => {
    // Progressbar
    const Pbar = document.getElementById('progress');
    Pbar.style.visibility = 'hidden';

    axios.get('http://localhost:4000/tasks/get-job/' + user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);
      });
  };

  async function handleChange(e) {
    setId(e.target.value);
    const Pbar = document.getElementById('progress');
    Pbar.style.visibility = 'visible';
    await axios.get(`http://localhost:4000/Submission/${e.target.value}`)
        .then(response => {
          // console.log(JSON.stringify(response.data));
          const myRepo = response.data;
          console.log(myRepo)
          try{
            for(let i in myRepo){
              if(myRepo[i].final === true){
                setDisableDiv('my-div');
                handleClick3();
              }else{
                setDisableDiv('');
              }
            }
          }catch (e) {
            console.log(e)
          }

        });
    Pbar.style.visibility = 'hidden';

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

  function onSubmit(event) {
    event.preventDefault();
    if (Id === '' || Date === '' || Time_Start === '' || Time_End === '' || Log === '' ){
      handleClick1();
    }else{
      try{
        console.log(Id)
        console.log(Date)
        console.log(Time_Start)
        console.log(Time_End)
        console.log(Log)
  
        const subOBJ = {
          job_id: Id,
          eid: user._id,
          time_start:Time_Start,
          time_end: Time_End,
          log: Log,
          final:isTrue
        };
  
        axios.post('http://localhost:4000/Submission/create-submission', subOBJ)
        .then(res => console.log(res.data));
        setDate('');
        setTime_Start('');
        setTime_End('');
        setLog('');
  
        handleClick();

      }catch(err){
        handleClick2();
      }


    }

  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Submit Progress</h2>
          <form onSubmit={onSubmit}>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select Job</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Id}
            label="Select Job"
            onChange={handleChange}
            >
          <MenuItem value="Def" disabled selected="true">Select Job</MenuItem>
          { repo.map((repos) => (
            <MenuItem value={repos._id} name={repos.name} data-id={repos.name} >{repos.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
            <div id='progress'>
              <br></br>
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            </div>
          <div className={DisableDiv}>
            <br></br>
            <p id="progress"></p>
            <br></br>
            <TextField
              onChange={e => setDate(e.target.value)}
              id="date"
              label="Date"
              type="date"
              defaultValue=""
              value={Date}
              InputLabelProps={{
                shrink: true,
              }}
            /><br></br><br></br>
            <TextField
              onChange={e => setTime_Start(e.target.value)}
              id="time"
              label="Start Time"
              type="time"
              defaultValue=""
              value={Time_Start}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60, // 5 min
              }}
            /><br></br><br></br>

            <TextField
                onChange={e => setTime_End(e.target.value)}
                id="time"
                label="End Time"
                type="time"
                defaultValue=""
                value={Time_End}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 60, // 5 min
                }}
              />
            <br></br><br></br>
            <TextField id="outlined-multiline-flexible" label="Progress" multiline Rows={4} variant="outlined" style = {{width: 350}} defaultValue="" onChange={e => setLog(e.target.value)} value={Log} /><br></br><br></br>
              <FormControlLabel control={<Checkbox checked={isTrue} onChange={e => {
                console.log(e.target.checked);
                setIsTrue(e.target.checked);
              } } />} label="Final Submission" /><br></br><br></br>
              <Button variant="contained" color="secondary" type="submit">
            Submit Progress
            </Button></div></form><br></br><br></br>

        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Progress Added Successfuly!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={600} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please Fill everything!.
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
            <Alert onClose={handleClose3} severity="warning" sx={{ width: '100%' }}>
              This project is Finished!.
            </Alert>
          </Snackbar>
        </Stack>


        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={600} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
            Something Wrong!.
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }

  export default Submitprogress