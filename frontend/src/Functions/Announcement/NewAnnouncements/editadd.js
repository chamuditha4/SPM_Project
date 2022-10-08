import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployee, updateEmployee } from "../../services/employeeService";

export default function UpdateEmployee(props) {
  useEffect(() => {
    const {
      match: { params },
    } = props;
    console.log(params.userId, "<<<");
    const userId = params.userId;
    getEmployee(userId).then((response) => {
      console.log(response, "<<<<");
      setUserId(response.data.userId);
      setfName(response.data.FirstName);
      setlName(response.data.LastName);
      setEmail(response.data.eMail);
      setNIC(response.data.NIC);
      //setDOB(response.data.DOB);
      //setAge(response.data.Age);
      //setGender(response.data.Gender);
      setMaritalStat(response.data.MaritalStatus);
      setCurrAdd(response.data.CurrentAddress);
      setPermAdd(response.data.PermanentAddress);
      setMobileNo(response.data.MobileNumber);
      setLandLine(response.data.LandLineNumber);
      setEmgContact(response.data.EmergencyContact);
      setDesignation(response.data.Designation);
      setDepartment(response.data.Department);
      /*setJoinedDate(response.data.JoinedDate);
      setWorkedCompany(response.data.PreviouslyWorkedCompany);
      setYearsOfEx(response.data.YearsOfExperiance);
      setEmpPic(response.data.EmployeePicture);
      setCV(response.data.CV);*/
    });
  }, [props.match.params.userId]);

  const [userId, setUserId] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  //const [age, setAge] = useState("");
  const [maritalStat, setMaritalStat] = useState("");
  const [currAdd, setCurrAdd] = useState("");
  const [permAdd, setPermAdd] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [landLine, setLandLine] = useState("");
  const [emgContact, setEmgContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  //const [joinedDate, setJoinedDate] = useState("");
  /*const [empPic, setEmpPic] = useState("");
  const [cv, setCV] = useState("");*/

  function sendData(e) {
    e.preventDefault();

    const newEmployee = {
      fName,
      lName,
      email,
      nic,
      //DOB,
      //age,
      //gender,
      maritalStat,
      currAdd,
      permAdd,
      mobileNo,
      landLine,
      emgContact,
      designation,
      department,
      //joinedDate,
      //workedCompany,
      //yearsOfEx,
      //empPic,
      //cv,
    };

    updateEmployee(userId, newEmployee).then((response) => {
      const message = response.ok
        ? "Employee update successful"
        : "Failed to update employee";
      alert(message);
    });
  }

  return (
    <div class="component-body">
      <div className="border bg-light my-5 mx-5">
        <div>
          <div class="area"></div>
          <nav class="main-menu bg-primary fixed-top">
            <ul>
              <li>
                <a href="/empList">
                  <i class="fa fa-home fa-2x"></i>
                  <span class="nav-text">Home</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/empList">
                  <i class="fa fa-users fa-2x"></i>
                  <span class="nav-text">View Employee List</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/addEmp">
                  <i class="fa fa-user-plus fa-2x"></i>
                  <span class="nav-text">Add New Employee</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <hr></hr>
              <li class="has-subnav">
                <a href="/leaveList">
                  <i class="fa fa-calendar fa-2x"></i>
                  <span class="nav-text">View Leave List</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/addLeave">
                  <i class="fa fa-calendar-plus-o fa-2x"></i>
                  <span class="nav-text">Add Leave Details</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <hr></hr>
              <li class="has-subnav">
                <a href="/attendaceMark">
                  <i class="fa fa-edit fa-2x"></i>
                  <span class="nav-text">Mark Attendance</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/attendanceList">
                  <i class="fa fa-tasks fa-2x"></i>
                  <span class="nav-text">View Attendance List</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>

            <ul class="logout">
              <li>
                <a href="/">
                  <i class="fa fa-power-off fa-2x"></i>
                  <span class="nav-text">Logout</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="my-5 mx-5">
          <form onSubmit={sendData}>
            <div className="row">
              <div className="col-md-6">
                <label for="fName">First name:</label>
                <input
                  value={fName}
                  id="fName"
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => {
                    setfName(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="lName">Last name:</label>
                <input
                  value={lName}
                  id="lName"
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  disabled
                  onChange={(e) => {
                    setlName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="email">e-mail:</label>
                <input
                  value={email}
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label for="NIC">NIC:</label>
                <input
                  value={nic}
                  id="nic"
                  type="text"
                  className="form-control"
                  placeholder="NIC"
                  pattern="[0-9]{9}V"
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label for="dob">Date of Birth:</label>
                <input
                  //value={DOB}
                  id="dob"
                  type="date"
                  className="form-control"
                  name="dob"
                  disabled
                  /*onChange={(e) => {
                  setDOB(e.target.value);
                }}*/
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="age">Age:</label>
                <input
                  //value={age}
                  id="age"
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  disabled
                  /* onChange={(e) => {
                  setAge(e.target.value);
                }} */
                />
              </div>
              <div className="form-group col-md-4">
                <label for="gender">Gender:</label>
                <select
                  //value={gender}

                  disabled
                  id="gender"
                  className="form-control"
                  //onChange={(e) => {
                  //  setGender(e.target.value);
                  //}}
                >
                  <option id="male">Male</option>
                  <option id="female">Female</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label for="maritalStatus">Marital Status:</label>
                <select
                  value={maritalStat}
                  id="maritalStatus"
                  className="form-control"
                  onChange={(e) => {
                    setMaritalStat(e.target.value);
                  }}
                >
                  <option id="married">Married</option>
                  <option id="unmarried">Unmarried</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label for="CurrAdd">Current address:</label>
                <input
                  value={currAdd}
                  id="currAdd"
                  type="text"
                  className="form-control"
                  placeholder="Current address"
                  onChange={(e) => {
                    setCurrAdd(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="PermAdd">Permanant address:</label>
                <input
                  value={permAdd}
                  id="permAdd"
                  type="text"
                  className="form-control"
                  placeholder="Permanant address"
                  onChange={(e) => {
                    setPermAdd(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label for="MobileNo">Mobile number:</label>
                <input
                  value={mobileNo}
                  id="mobileNo"
                  type="number"
                  className="form-control"
                  placeholder="Mobile number"
                  pattern="[0-9]{9}"
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label for="LandLine">Land line number:</label>
                <input
                  disabled
                  value={landLine}
                  id="landLine"
                  type="number"
                  className="form-control"
                  placeholder="Land line number"
                  pattern="[0-9]{9}"
                  onChange={(e) => {
                    setLandLine(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label for="emgContact">Emergency contact number:</label>
                <input
                  value={emgContact}
                  id="emgContact"
                  type="number"
                  className="form-control"
                  placeholder="Emergency contact number"
                  pattern="[0-9]{9}"
                  onChange={(e) => {
                    setEmgContact(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label for="Designation">Designation:</label>
                <input
                  value={designation}
                  id="designation"
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label for="Department">Department:</label>
                <input
                  value={department}
                  id="department"
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label for="joinedDate">Joined Date:</label>
                <input
                  //value={joinedDate}
                  id="joinedDate"
                  type="date"
                  className="form-control"
                  name="joinedDate"
                  /* onChange={(e) => {
                  setJoinedDate(e.target.value);
                }} */
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="col-md-4">Previous experience(If yes),</div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label for="workedCompany">Worked Company:</label>
                <input
                  //value={workedCompany}
                  id="workedCompany"
                  type="text"
                  className="form-control"
                  placeholder="Worked Company"
                  //onChange={(e) => {
                  //  setWorkedCompany(e.target.value);
                  //}}
                />
              </div>
              <div className="col-md-6">
                <label for="yearsOfEx">Years of Experience:</label>
                <input
                  //value={yearsOfEx}
                  id="yearsOfEx"
                  type="number"
                  className="form-control"
                  placeholder="Years of Experience"
                  //onChange={(e) => {
                  //  setYearsOfEx(e.target.value);
                  //}}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label for="empPic">Photo of the employee:</label>
                  <input
                    id="empPic"
                    type="file"
                    className="form-control-file"
                    //onChange={(e) => {
                    //  setEmpPic(e.target.value);
                    //}}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="cv">CV:</label>
                  <input
                    id="cv"
                    type="file"
                    className="form-control-file"
                    //onChange={(e) => {
                    // setCV(e.target.value);
                    //}}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col py-3 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col py-3 text-center">
                <button type="reset" className="btn btn-primary">
                  reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}