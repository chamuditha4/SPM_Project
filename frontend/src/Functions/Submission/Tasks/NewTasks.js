import React, { useEffect, useState  } from 'react';
import Button from '@material-ui/core/Button';
import  './../../../styles/App.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { getUser } from './../../../Utils/Common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
//startIcon={<AddIcon/>}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NewTasks() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const user = getUser();
  const [Eids,setEids] = useState([]);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Eidss,setEidss] = useState([]);

  const getRepo = () => {
    axios.get('http://localhost:4000/users/employees')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setEids(myRepo);
        console.log(user._id);
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
  

  function onSubmit(event) {
    event.preventDefault();
    if (Eidss.length === 0 || Title.length===0 || Description.length === 0){
      handleClick1();
    }else{
      const taskOBJ = {
        name: Title,
        eids: Eidss,
        owner:user._id,
        description: Description
      };
      axios.post('http://localhost:4000/tasks/create-task', taskOBJ)
        .then(res => console.log(res.data));
        setTitle('');
        setDescription('');
        setEidss([]);
        handleClick();
    }
    
    
  }



  useEffect(() => getRepo(),[]);
  

    return (
      
      <div>
        <div className="prof">
          <h2>New Tasks</h2>
          <form onSubmit={onSubmit}>
          <TextField id="standard-uncontrolled" label="Title" defaultValue="" value={Title} onChange={e => setTitle(e.target.value)}/><br></br><br></br>
          <div>
          <Autocomplete
            onChange={(event, value) => setEidss(value)}
            multiple
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
                label="EIDs"
                placeholder="EIDs"
              />
            )}
          />
          </div><br></br>
          <TextField id="outlined-multiline-flexible" label="Job Description" multiline Rows={4} variant="outlined" style = {{width: 350}} defaultValue="" value={Description} onChange={e => setDescription(e.target.value)}/><br></br><br></br>
          <Button variant="contained" color="primary"  type="submit" startIcon={<AddIcon/>}>
          Add Task 
          </Button>
          </form><br></br><br></br>
        </div>
        

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Task Added successfuly!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please Fill Everything!
            </Alert>
          </Snackbar>
        </Stack>

      </div>

    )
  }


  export default NewTasks

