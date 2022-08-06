import React, { useEffect, useState  } from 'react';
import Rating from '@material-ui/lab/Rating';
import  './../../styles/App.css';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RatedSubmission() {
  const user = getUser();
  const [repo,setRepo] = useState([]);
  const [Id, setId] = useState('');
  const [Rate, setRate] = useState('');
  const [Feedback, setFeedback] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/tasks/get-job/' + user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);
      });
  };

  async function handleChange(e) {
    setId(e.target.value);
    if (e.target.value === null){
      setRate('');
      setFeedback('');
    }else{
      await axios.get('http://localhost:4000/Rate/' + e.target.value)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        console.log(myRepo.length);
        if (myRepo.length > 0){
          setRate(myRepo[0].rate);
          setFeedback(myRepo[0].feedback);
        }else{
          setRate('');
          setFeedback('Not Rated yet!');
        }
        
      });
    }
    
    
  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Rated Submission</h2>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select Job</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Id}
            label="Select Job"
            onChange={handleChange}
            >
          <MenuItem value="Def" disabled selected="true">Select Task</MenuItem>
          { repo.map((repos) => (
            <MenuItem value={repos._id} name={repos.name} >{repos.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
          <br></br><br></br>
          <Rating name="size-large" defaultValue={''} size="large" readOnly  value={Rate}/>
          <br></br><br></br>
          <TextField id="outlined-multiline-flexible" label="" multiline Rows={4} variant="outlined" style = {{width: 350}} defaultValue="" readOnly value={Feedback}  /><br></br><br></br>
          <br></br><br></br>
        </div>
      </div>
    )
  }
  
  export default RatedSubmission