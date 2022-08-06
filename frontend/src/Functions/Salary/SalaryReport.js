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
var repi1 = [{"name":"No Person","_id":"404"}];
var sal1 = '';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 function SalaryReport() {
  const [repo,setRepo] = useState([]);
  const [repo1,setRepo1] = useState([]);
  const [Eidss,setEidss] = useState('');
  const [table, settable] = useState('');
  const [name, setname] = useState('');
  const [open1, setOpen1] = React.useState(false);

 async function getRepo(){
   await axios.get('http://localhost:4000/users')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        setRepo(myRepo);

      });

      await axios.get('http://localhost:4000/salary')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo1 = response.data;
        setRepo1(myRepo1);
        console.log(repi1)
      });

      console.log(repi1.length)
      if(repi1.length >0){
        sal1 ='';

        for (var i=0; i<repi1.length;i++){
          settable('<p>Loading .</p>');
          await axios.get('http://localhost:4000/users/get-user/' +repi1[i].eid)
            .then(response1 => {
            // console.log(JSON.stringify(response.data));
            if (response1.data === null){
              const myRepo11 = '';
            }else{
              const myRepo11 = response1.data.name;
              console.log(repi1[i].eid)
              sal1 = (sal1 + '<tr><td>' + repi1[i].eid + '</td><td>'+ myRepo11 + '</td><td>' + repi1[i].salary + '</td><td>'+  repi1[i].bonus+ '</td></tr>');
              console.log(i)
              
              console.log(myRepo11)
            }
            
            
            
          });
          
          
        }
        settable('<tr><th>ID</th><th>Name</th><th>Salary</th><th>Bonus</th></tr>');
        setname(sal1);
        console.log(sal1)
      }
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

  function autoselect(){
    Eids=[];
    repi1=[];
    repo.map((repos) => ( Eids.push(repos)));
    repo1.map((repos1) => ( repi1.push(repos1)));
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
      settable('<tr><th>ID</th><th>Name</th><th>Salary</th><th>Bonus</th></tr>');
      await axios.get('http://localhost:4000/salary/get-salary/' +Eidss._id )
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo1 = response.data;
        setname('<tr><td>' + Eidss._id  + '</td><td>'+ Eidss.name + '</td><td>' + myRepo1[0].salary + '</td><td>'+  myRepo1[0].bonus+ '</td></tr>');
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
          <h2>Salary Report</h2>
          <div>
          <form onSubmit={onSubmit}>
          <Autocomplete
            onChange={EidSelect}
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
                label="User Name"
                placeholder="Names"
              />
            )}
          /><br></br>
          <Button variant="contained" color="secondary"  type="submit">Search</Button><br></br><br></br><br></br>
          </form>
          </div>
          <table>
          {ReactHtmlParser(table)}
          {ReactHtmlParser(name)}
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

      </div>
    )
  }
  
  export default SalaryReport