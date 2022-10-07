import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import  './../../styles/App.css';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RateSubmission() {
  const user = getUser();
  const [repo,setRepo] = useState([]);
  const [Id, setId] = useState('');
  const [Rate, setRate] = useState('');
  const [selected, setselected] = useState('true');
  const [Feedback, setFeedback] = useState('');
  const [isDisable, setisDisable] = useState('disabled');
  const [open2, setOpen2] = React.useState(false);

  async function getRepo(){
    await axios.get('http://localhost:4000/tasks/' + user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);
      });
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

  async function onSubmit(event) {
    event.preventDefault();
    const rateOBJ = {
      jobid: Id,
      rate: Rate,
      feedback:Feedback
    };
    console.log("ID:" +Id);
    await axios.post('http://localhost:4000/Rate/create-rate', rateOBJ)
      .then(res => console.log(res.data));
    
    setselected('true');
    setisDisable('disabled');
  }

  async function handleChange(e) {
    try{
      await setId((e.target.value).toString());
      console.log("eref:" +e.target.value);
      await axios.get('http://localhost:4000/Rate/' + e.target.value)
        .then(response => {
        // console.log(JSON.stringify(response.data));
          const myRepo = response.data;
          
          if(myRepo.length === 0){
            setisDisable('');
            setRate('');
            setFeedback('');
          }else{
            setisDisable('disabled');
            setRate(myRepo[0].rate);
            setFeedback(myRepo[0].feedback);
          }
        });
    }
    catch(err){
      handleClick2();
      console.log(err);
    }
    
    
  }


  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Rate Submission</h2>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Submission</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Id}
            label="Submission"
            onChange={handleChange}
            >
          <MenuItem value="Def" disabled selected={selected}>Select Submission</MenuItem>
          { repo.map((repos) => (
            <MenuItem value={repos._id} name={repos.name} >{repos.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
          <br></br><br></br>
          <form onSubmit={onSubmit}>
          <Rating name="size-large" defaultValue={''} size="large" onChange={e => setRate(e.target.value)}  disabled={isDisable} value={Rate}/>
          <br></br><br></br>
          <TextField id="outlined-multiline-flexible" label="FeedBack" multiline Rows={4} variant="outlined" style = {{width: 350}} defaultValue="" onChange={e => setFeedback(e.target.value)}  disabled={isDisable} value={Feedback} /><br></br><br></br>
          <Button variant="contained" color="secondary" type="submit" disabled={isDisable} startIcon={<StarIcon/>}>
          Rate Task
          </Button></form><br></br><br></br>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
              Something went wrong, Please try again!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  
  export default RateSubmission