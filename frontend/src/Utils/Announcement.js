import React, { useState  } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Announcement() {
  const [repo,setRepo] = useState([]);
  const [Department,setDepartment] = useState('');
  const [table, settable] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    if (Department === ''){
      alert("Please Select Department!.");
    }else{
      
      
      axios.get('http://localhost:4000/Announcement/read/' +Department)
        .then(response => {
        // console.log(JSON.stringify(response.data));
        console.log(response);
          const myRepo = response.data;
          settable('<tr><th>Title</th><th>Depertment</th><th>Announcement</th></tr>');
          setRepo(myRepo);
        });
      }
    

  }
    return (
      <div>
        <div>
          <h2>Announcement</h2>
          <form onSubmit={onSubmit}>
          <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Department}
            label="Select Department"
            onChange={e => setDepartment(e.target.value)}
            >
          <MenuItem value="Def" disabled selected="true">Select Department</MenuItem>
          <MenuItem value="IT" name="IT" >IT</MenuItem>
          <MenuItem value="Accounting" name="Accounting" >Accounting</MenuItem>
          <MenuItem value="Management" name="Management" >Management</MenuItem>
          </Select>
          </FormControl>
          <br></br><br></br>
          <Button variant="contained" color="primary" type="submit">
          Select Department
          </Button>
          </form><br></br><br></br>
            <div>
                <table>
                {ReactHtmlParser(table)}
                { repo.map((repos) => (
                    <tr>
                    <td>{repos.name}</td>
                    <td>{repos.department}</td>
                    <td>{repos.description}</td>
                    </tr>
                ))}
                </table>
            </div>

        </div>
      </div>
    )
  }
  
  export default Announcement