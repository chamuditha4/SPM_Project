import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../styles/App.css';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RemoveUser() {
  const [Eids,setEids] = useState([]);
  const [Id, setId] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

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

  async function onRemove(event) {
    event.preventDefault();
    console.log(Id);
    if(window.confirm("Are you sure want to Remove?")===true){
      if ( Id === null){
        handleClick1();
      }else{
        try{
  
          await axios.delete('http://localhost:4000/salary/delete-salary/'+Id._id)
          .then(response => {
            console.log(response);
          });
  
          await axios.delete('http://localhost:4000/users/delete-user/'+Id._id)
          .then(response => {
            console.log(response);
          });
  
          
          getRepo();
          handleClick();
        }catch(err){
          handleClick2();
        }
        
      }
    }
  }


  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div className="prof">
          <h2>Remove User</h2>
          <form onSubmit={onRemove}>
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
          <Button variant="contained" color="primary" type="submit" startIcon={<RemoveCircleOutlineIcon/>}>
          Remove User
          </Button>
          </form><br></br><br></br>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Removed Successfuly!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={600} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please Select User!.
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
  


  export default RemoveUser