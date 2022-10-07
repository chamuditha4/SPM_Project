import React, { useEffect, useState  } from 'react';
import  './../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../Utils/Common';

function ViewSalaryDetails() {
  const user = getUser();
  const [repo,setRepo] = useState([]);

  const getRepo = () => {
    axios.get('http://localhost:4000/salary/'+ user._id)
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const myRepo = response.data;
        console.log(myRepo)
        setRepo(myRepo);
      });
  };

  useEffect(() => getRepo(),[]);

    return (
      <div>
        <div className="prof">
          <h2>Salary</h2>
          <h5>Your Monthly Salary</h5>
          { repo.map((repos) => (
          <div>
          
            <p>{repos.salary} LKR</p>
            <h5>Bonus</h5>
            <p>{repos.bonus} LKR</p>
            <h5>Total</h5>
            <p>{(parseInt(repos.salary,10)+parseInt(repos.bonus,10))} LKR</p>
          </div>
          ))}
          
        </div>
      </div>
    )
  }
  
  export default ViewSalaryDetails