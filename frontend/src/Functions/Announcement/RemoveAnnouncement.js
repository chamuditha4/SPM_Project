import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RemoveAnnouncement() {
  const user = getUser();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [repo,setRepo] = useState([]);
  const [Id, setId] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/Announcement/' + user._id)
      .then(response => {
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

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };
  

  async function onRemove(event) {
    event.preventDefault();
    if (Id === null){
      handleClick2();
    }else{
       if(window.confirm("Are you sure want to delete?")===true){
      try{
        console.log(Id);
        await axios.delete('http://localhost:4000/Announcement/delete-announcement/'+Id)
            .then(response => {
              console.log(response);
            });
        getRepo();
        setId(null);
        handleClick();
      }catch(err){
        handleClick1();
        console.log(err);
      }
      
    }}

  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Remove Announcement</h2>
          <form onSubmit={onRemove}>
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
            <MenuItem value={repos._id} data-id={repos.name} >{repos.name}</MenuItem>
          ))}
          </Select>
          </FormControl>
          <br></br><br></br>
          <Button variant="contained" color="primary" type="submit" startIcon={<RemoveCircleOutlineIcon/>}>
          Remove Announcement
          </Button></form><br></br><br></br>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Announcement Removed successfuly!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Something went wrong, Please try again!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
            Please Select Announcement!.
            </Alert>
          </Snackbar>
        </Stack>

      </div>
    )
  }
  
  export default RemoveAnnouncement