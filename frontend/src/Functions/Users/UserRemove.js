import React ,{useState , useEffect} from "react";
import HomePageNav from '../navbars/afterLogin';
import Footer from '../footer/footer';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../src/style.css';

function StudentGroupManage() {
  const id = Math.floor(Math.random() * 100);
  const [groupId, setGroupId] = useState("PG"+id);
  const [memberOne, setMemOne] = useState("");
  const [memberTwo, setMemTwo] = useState("");
  const [memberThree, setMemThree] = useState("");
  const [Specialize, setSpecialize] = useState("");
  
  const [AllPanelMembers,setAllPanelMembers] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/staff/allPanelMembers")
      .then(res => setAllPanelMembers(res.data))
      .catch(error => console.log(error));
  });

  const [AllTeams,setAllTeams] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/team/allTeam")
      .then(res => setAllTeams(res.data))
      .catch(error => console.log(error));
  });

  const [AllPanels,setAllPanels] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/staff/AllPanels")
      .then(res => setAllPanels(res.data))
      .catch(error => console.log(error));
  });

  function panelCreate(e){
    e.preventDefault();
    const groupId = "PG"+id;
    const addPanelSchema ={groupId, memberOne, memberTwo, memberThree, Specialize}

      axios.post("http://localhost:5000/staff/panelCreate",addPanelSchema).then(() =>{

      Swal.fire({  
        title: "Success!",
        text: "Panel Adding Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
          const id = Math.floor(Math.random() * 100);
          setGroupId("PG"+id);
          axios.get("http://localhost:5000/panel/AllPanels")
          .then(res => setAllPanelMembers(res.data))
          .catch(error => console.log(error));
          setGroupId("");
          setMemOne("");
          setMemTwo("");
          setMemThree("");
          setSpecialize("");
        }
      });

      
    }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Try again. You tried to create a panel with current panel members.",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
    })
  }

  function deletePanel(id){
    axios.delete("http://localhost:5000/staff/deletePanel/"+id).then(() =>{
      Swal.fire({  
      title: "Success!",
      text: "Panel Deleted ",
      icon: 'success',
      confirmButtonText: "OK",
      type: "success"}).then(okay => {
          if (okay) {
              axios.get("http://localhost:5000/staff/AllPanels")
              .then(res => setAllPanels(res.data))
              .catch(error => console.log(error));
          }
      });

      }).catch((err)=>{

          Swal.fire({  
          title: "Error!",
          text: "Panel Not Deleted",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
  }

  function viewTopic(id){
    window.location.href = "/admin/AdminViewTeam?id="+id; 
  }
  return (
    <div >
       <HomePageNav/>
       <div class="global-container3"  style={{paddingTop:'5%', paddingBottom:'5%'}}>
            <center>
                <div class="container">
                    <div class="row bg-light rounded p-4">
                        <center>
                            <h2 class="card-title text-center pt-5 pb-2  text-uppercase text-dark">
                                   Group Management
                            </h2>
                            <div className="text-end mt-5">
                                <button className='btn-sm btn-outline-dark' style={{ fontSize:'13px', fontWeight:'light'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Create A Panel 
                                </button>&nbsp;&nbsp;
                                <button className='btn-sm btn-outline-dark' style={{ fontSize:'13px', fontWeight:'light'}} onClick={()=> window.location.href = "/admin/AdminDashboard" } >
                                    Back 
                                </button>
                            </div>
                        </center>
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-xl">
                                    <div class="modal-content">
                                    <div class="modal-header bg-dark text-start">
                                        <h5 class="modal-title text-warning" id="exampleModalLabel">Panel Management</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-start">
                                      <div class="bg-light p-2">
                                          <h5 class=" mt-4">Panel Registration Form.</h5>
                                          <div class="row">
                                            <div class="col">
                                              <div class=" text-start  mt-3">
                                                  <label  class="form-label" style={{lineHeight:0}}>Group ID</label>
                                                  <input type="text" disabled value={groupId} class="form-control" onChange={(e) =>{
                                                      setGroupId(e.target.value);
                                                  }}/>
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class=" text-start mt-3">
                                                  <label  class="form-label" style={{lineHeight:0}}>Member One</label>
                                                  <select class="form-select" onChange={(e) =>{
                                                      setMemOne(e.target.value);
                                                  }}>
                                                  <option value="">Select Member One</option>
                                                  {AllPanelMembers.map((PanelMembers) => (
                                                      <option value={PanelMembers.email}>{PanelMembers.name} - {PanelMembers.Specialize}</option>
                                                  ))}
                                                  </select>
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class=" text-start mt-3">
                                                  <label  class="form-label" style={{lineHeight:0}}>Member Two</label>
                                                  <select class="form-select" onChange={(e) =>{
                                                      setMemTwo(e.target.value);
                                                  }}>
                                                  <option value="">Select Member Two</option>
                                                  {AllPanelMembers.map((PanelMembers) => (
                                                      <option value={PanelMembers.email}>{PanelMembers.name} - {PanelMembers.Specialize}</option>
                                                  ))}
                                                  </select>
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class=" text-start mt-3">
                                                  <label  class="form-label" style={{lineHeight:0}}>Member Three</label>
                                                  <select class="form-select" onChange={(e) =>{
                                                      setMemThree(e.target.value);
                                                  }}>
                                                  <option value="">Select Member Three</option>
                                                  {AllPanelMembers.map((PanelMembers) => (
                                                      <option value={PanelMembers.email}>{PanelMembers.name} - {PanelMembers.Specialize}</option>
                                                  ))}
                                                  </select>
                                              </div>
                                            </div>
                                            <div class="col">
                                            <div class=" text-start mt-3">
                                                  <label  class="form-label" style={{lineHeight:0}}>Specialize For</label>
                                                  <select type="text" class="form-select"  onChange={(e) =>{
                                                      setSpecialize(e.target.value);
                                                  }}>
                                                      <option value="">Select Specialize For</option>
                                                      <option value="Machine Learning">Machine Learning</option>
                                                      <option value="Web Technology">Web Technology</option>
                                                      <option value="Networking">Networking</option>
                                                      <option value="Cryptography">Cryptography</option>
                                                      <option value="IOT">IOT</option>
                                                      <option value="Cyber Security">Cyber Security</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="modal-footer border-0">
                                            <button type="button" class="btn-sm btn btn-primary" onClick={panelCreate}>Panel Create</button>
                                          </div>
                                        </div>
                                      </div>
                                      <br/>
                                      <table class="table">
                                        <thead>
                                            <tr class="bg-dark text-white">
                                                <td  style={{width: '20%'}}>Panel Id</td>
                                                <td  style={{width: '20%'}}>Member One</td>
                                                <td  style={{width: '20%'}}>Member Two</td>
                                                <td  style={{width: '20%'}}>Member Three</td>
                                                <td  style={{width: '20%'}}>Specialize</td>
                                                <td  style={{width: '20%'}} class="text-center">Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {AllPanels.map((panel) => (
                                            <tr class="text-dark">
                                                <td  style={{width: '20%'}}>{panel.groupId}</td>
                                                <td  style={{width: '20%'}}>{panel.memberOne}</td>
                                                <td  style={{width: '20%'}}>{panel.memberTwo}</td>
                                                <td  style={{width: '20%'}}>{panel.memberThree}</td>
                                                <td  style={{width: '20%'}}>{panel.Specialize}</td>
                                                <td  style={{width: '20%'}} class="text-center">
                                                <button type="button"  class="btn btn-outline-danger btn-sm" onClick={()=> deletePanel(panel._id)}>Delete</button>&nbsp;&nbsp;
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                      </table>
                                    </div>
                                          
                                    </div>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr class="bg-dark text-white">
                                        <td >Group Id</td>
                                        <td >Member One</td>
                                        <td >Member Two</td>
                                        <td >Member Three</td>
                                        <td >Member Four</td>
                                        <td >Research Area</td>
                                        <td >Research Topic</td>
                                        <td >Allocated Staff</td>
                                        <td  class="text-center">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {AllTeams.map((team) => (
                                   <tr class="bg-white text-dark">
                                      <td >{team.groupId}</td>
                                      <td >{team.mem_one_reg}</td>
                                      <td >{team.mem_two_regNum}</td>
                                      <td >{team.mem_three_name}</td>
                                      <td >{team.mem_four_name}</td>
                                      <td >{team.researchCategory}</td>
                                      <td >{team.researchTopic}</td>
                                      <td >
                                      <p>Supervisor : <br/>{team.researchSupervisor}</p>
                                      <p>Co -Supervisor : <br/>{team.researchCoSupervisor}</p>
                                      <p>Panel : {team.panelId}</p>
                                      </td>
                                      <td  class="text-center">
                                      <button type="button" class="btn btn-sm btn-success" onClick={()=>viewTopic(team.groupId)}>More</button>
                                      </td>
                                  </tr>
                                ))}
                                </tbody>
                            </table>
                </div>
            </center>
      </div>
    </div>
  );
}

export default StudentGroupManage;
