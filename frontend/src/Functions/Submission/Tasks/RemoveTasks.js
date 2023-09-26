import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../../Utils/Common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RemoveTasks() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const user = getUser();
  const [Taskids,setTaskids] = useState([]);
  const [Id, setId] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/tasks/' + user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setTaskids(myRepo);
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


  async function onRemove(event) {
    console.log(Id._id)
    event.preventDefault();
    if (Id._id === undefined || Id._id === '' || Id._id === null){
      handleClick1();
    }else{
      if(window.confirm("Are you sure want to Remove?")===true){
        await axios.delete('http://localhost:4000/tasks/delete-task/'+Id._id)
        .then(response => {
          console.log(response);
          handleClick();
        });
        getRepo();
      }
    
    }

  }

  async function IdHandler(e,value){
    console.log(value)
    if ( value !== null){
      setId(value);
    }else{
      setId('');
    }
    
  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Remove Tasks</h2>
          <form onSubmit={onRemove}>
          <Autocomplete
            onChange={IdHandler}
            values={Id}
            id="tags-standard"
            limitTags={1}
            size="small"
            options={Taskids}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField 
                {...params}
                style={{ width: 350 }}
                variant="standard"
                label="Select Task"
                placeholder="Tasks"
              />
            )}
          /><br></br>
          <Button variant="contained" color="primary" type="submit" startIcon={<RemoveCircleOutlineIcon/>}>
          Remove Task
          </Button>
          </form><br></br><br></br>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Task Removed!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please select task!
            </Alert>
          </Snackbar>
        </Stack>

      </div>
    )
  }
  
  export default RemoveTasks