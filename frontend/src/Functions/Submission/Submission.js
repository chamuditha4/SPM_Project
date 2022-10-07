import React, { useEffect, useState  } from 'react';
import  './../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

let Users = {};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Submission() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const user = getUser();
  const [repo,setRepo] = useState([]);
  const [Id, setId] = useState('');
  const [rows,setrows] = useState('');

  const getRepo = async () => {
    try{
      // Hide table
      const table = document.getElementById('table');
      table.style.visibility = 'hidden';

      // main
      const main = document.getElementById('main');
      main.setAttribute("style","height:200px; width: 800px; margin: 10% 2% 2% 20%; padding:2%; background:#cecece6b;");

      await axios.get('http://localhost:4000/tasks/' + user._id)
          .then(response => {
            // console.log(JSON.stringify(response.data));
            const myRepo = response.data;
            setRepo(myRepo);
      });
      try{
        await axios.get('http://localhost:4000/users/')
            .then(res => {
                  const data = res.data;
                  for (const i in data){
                    Users[data[i]._id]=data[i].username;
                  }
                }
            );
      }catch (err) {
        console.log(err)
        handleClick();
      }

    }catch (e) {
      console.log(e)
      handleClick();
    }

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

  async function handleChange(value) {

    try{
      setId(value);
      await axios.get('http://localhost:4000/Submission/' +value._id)
          .then(response => {
            const data = response.data;
            for (let k in data){
              if(data[k].final){
                const row ={
                  id:data[k]._id,
                  time:`Time: ${data[k].time_start} - ${data[k].time_end}`,
                  employee:`Employee: ${Users[`${data[k].eid}`]}`,
                  log:`Submission: ${data[k].log}`
                }
                console.log(row)
                setrows(row);
              }else{
                const row ={
                  id:'',
                  time:``,
                  employee:'No Final Submission',
                  log:''
                }
                console.log(row)
                setrows(row);
              }
            }
          });
    }catch (e) {
      handleClick();
      console.log(e)
    }finally {
      // main
      const main = document.getElementById('main');
      main.setAttribute("style","height:590px; width: 800px; margin: 1% 2% 2% 20%; padding:2%; background:#cecece6b;");

      // Show table
      const table = document.getElementById('table');
      table.style.visibility = 'visible';
    }

    
  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div id='main'>
          <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
          <h2>Submission</h2>
          <div  style={{ margin:"1% 2% 2% 2%"}}>
            <Autocomplete
                onChange={(event, value) => handleChange(value)}
                values={Id}
                id="tags-standard"
                limitTags={1}
                size="small"
                options={repo}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={{ width: 350 }}
                        variant="standard"
                        label="Task Name"
                        placeholder="Task Name"
                    />
                )}
            />
          </div>
            <div id='table'>
              <h2>Task Submission</h2>

              <div id="Log" style={{ height: 200, width: 600, margin:"auto", background:'#ffffff'}}>
                <br></br>
                <h3>{`${rows.employee}`}</h3>
                <h4>{`${rows.time}`}</h4>
                <h4>{`${rows.log}`}</h4>
              </div>
            </div>
          </Stack>
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
  
  export default Submission