import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import ReactHtmlParser from 'react-html-parser'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

var submissn = '';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewSubmission() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const user = getUser();
  const [temprepo,setTempRepo] = useState([]);
  const [repo,setRepo] = useState([]);
  const [sub,setSub] = useState([]);
  const [Id, setId] = useState('');
  const [table, settable] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/tasks/' + user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);
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

  async function handleChange(e) {
    setId(e.target.value);
    
    await axios.get('http://localhost:4000/Submission/' +e.target.value)
        .then(response => {
        // console.log(JSON.stringify(response.data));
        //console.log(response);
        const myRepo = response.data;
        setTempRepo(myRepo);
    });
    
  }

 async function onSubmit(event) {
    event.preventDefault();
    if (Id === ''){
      handleClick1();
    }else{
      settable('<tr><th>Time</th><th>Employee</th><th>Log</th></tr>');
      
      
      submissn='';
        for (var i=0;i<temprepo.length;i++){
          console.log(temprepo[i].eid);
          settable('Loading.');

          try{
            await axios.get('http://localhost:4000/users/get-user/' +temprepo[i].eid)
            .then(response1 => {
            // console.log(JSON.stringify(response.data));
            
            const myRepo1 = response1.data.name;
            submissn = submissn +  '<tr><td>' + temprepo[i].time_start + '-'+ temprepo[i].time_end + '</td><td>' + myRepo1 + '</td><td>'+  temprepo[i].log+ '</td></tr>';
            });
          }catch(err){
            handleClick();
            console.log(err);
          }
          
        }
        settable('<tr><th>Time</th><th>Employee</th><th>Log</th></tr>');
        setSub(submissn);
        

        
      }
    

  }



  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>View Submission</h2>
          <form onSubmit={onSubmit}>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Submission</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Id}
            label="Submission"
            onChange={handleChange}
            >
            <MenuItem  value="Def" disabled selected="true">Select Task</MenuItem >
            { repo.map((repos) => (
              
              <MenuItem  value={repos._id} name={repos.name} >{repos.name}</MenuItem >
            ))}
            </Select>
          </FormControl>
          <br></br><br></br>
          <Button variant="contained" color="primary" type="submit">
          Show Submission
          </Button></form><br></br><br></br>
          <table>
            {ReactHtmlParser(table)}
            {ReactHtmlParser(sub)}
          </table>
          <br></br><br></br>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Something wrong!.
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please select task to show Submission!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  
  export default ViewSubmission