import React, { useEffect, useState  } from 'react';
import  './../../styles/App.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ReactHtmlParser from 'react-html-parser'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

var Eids = [{"name":"No Person","_id":"404"}];
var attd = [{"name":"No Person","_id":"404"}];
var atd = '';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewAttendanceReport() {
  const [repo,setRepo] = useState([]);
  const [repo1,setRepo1] = useState([]);
  const [table, settable] = useState('');
  const [Eidss,setEidss] = useState('');
  const [tbl,settbl] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  async function getRepo(){
    await axios.get('http://localhost:4000/attendance')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);
        if(myRepo.length >0){
          settable('<tr><th>EID</th><th>Name</th><th>Marked Time</th></tr>');
        }

      });

      await axios.get('http://localhost:4000/users')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo1(myRepo);

      }); 
      atd = '';
      for (var i=0; i<attd.length;i++){
        settable('<p>Loading .</p>');
        atd = (atd + '<tr><td>' + attd[i].eid + '</td><td>'+ attd[i].name + '</td><td>' + attd[i].mo + '/' + attd[i].date + ' - ' + attd[i].hrs + ':'+  attd[i].min+ '</td></tr>');
        
      }
      settable('<tr><th>EID</th><th>Name</th><th>Marked Time</th></tr>');
      settbl(atd);
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



  function autoselect(){
    Eids=[];
    attd=[];
    repo1.map((repos) => ( Eids.push(repos)));
    repo.map((repos1) => ( attd.push(repos1)));
    //console.log(Eids);
  }

  async function EidSelect(e,value){
    console.log(value)
    if ( value !== null){
      setEidss(value);
    }else{
      setEidss('');
    }
    
  }
  
  async function onSubmit(event) {
    event.preventDefault();
    console.log(Eidss)
    if (Eidss.length === 0){
      handleClick1();
    }else{
      settable('<tr><th>EID</th><th>Name</th><th>Marked Time</th></tr>');
      await axios.get('http://localhost:4000/attendance/' +Eidss._id )
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo1 = response.data;
        if (myRepo1.length <= 0) {
          settable('<tr><th>Error</th></tr>');
          settbl('<tr><td> He/She Need to Mark Attendance!!. </td></tr>');
        }else{
          try{    //update the table

            atd = '';
            for (var i=0; i<myRepo1.length;i++){
              settable('<p>Loading .</p>');
              atd = (atd + '<tr><td>' + Eidss._id  + '</td><td>'+ Eidss.name + '</td><td>' + myRepo1[i].hrs + ':'+  myRepo1[i].min+ '</td></tr>');
              
            }
            settable('<tr><th>EID</th><th>Name</th><th>Marked Time</th></tr>');
            settbl(atd);
    
          } catch (err){
            settable('<tr><th>Error</th></tr>');
            settbl('<tr><td> </td></tr>');
            handleClick2();
            console.log(err);
          }
        }
      

       
        console.log(myRepo1)
      });
    }
    console.log(Eidss.length);
  }

  useEffect(() => getRepo(),[]);
    return (
      <div>
        {autoselect()}
        <div className="prof">
          <div>
          <form onSubmit={onSubmit}>
          <Autocomplete
            onChange={EidSelect}
            values={Eids}
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
          <Button variant="contained" color="secondary"  type="submit">Search</Button><br></br><br></br><br></br>
          </form>
          </div>
          <br></br>
          <table>
          {ReactHtmlParser(table)}
          {ReactHtmlParser(tbl)}
          </table>
        <br></br>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please Select User!.
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open2} autoHideDuration={600} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
            Something Wrong!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  
  export default ViewAttendanceReport