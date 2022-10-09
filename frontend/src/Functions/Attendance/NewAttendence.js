import React ,{useState , useEffect} from "react";
import HomePageNav from '../navbars/afterLogin';
import Footer from '../footer/footer';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import { saveAs } from "file-saver";

import Cookies from 'js-cookie';
import '../src/style.css';

function TeamDashboard() {
  const username = Cookies.get('user_name');
  const [researchTopic, setTopic] = useState("");
  const [researchCoSupervisor, setSupervisor] = useState("");
  const [researchSupervisor, setCoSupervisor] = useState("");
  const [Description, setDescription] = useState("");
  const [researchCategory, setCategory] = useState("");
  const [imageSelected, setimageSelected] = useState("");
  
  const [ReDescription, setReDescription] = useState("");
  const [ReTopic, setReTopic] = useState("");
  
  const [SupervisorList, setSupervisorList] = useState([]);
  const [Supervisor, setSupervisorName] = useState([]);
  const [CoSupervisorList, allCoSupervisorList] = useState([]);

  const [AllDeadLine,setAllDeadLine] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/deadLine/AllDeadLine")
    .then(res => setAllDeadLine(res.data))
    .catch(error => console.log(error));
  },[]);


  function setFunCategory(e){
      const topicCategory = e;
      axios.get("http://localhost:5000/staff/alltSupervisorForSelectCategory/"+topicCategory)
      .then(res => setSupervisorList(res.data))
      .catch(error => console.log(error));

      axios.get("http://localhost:5000/staff/allCoSupervisorForSelectCategory/"+topicCategory)
      .then(res => allCoSupervisorList(res.data))
      .catch(error => console.log(error));


      setCategory(topicCategory);
  }

  const [TeamDetails,setTeamDetails] = useState([]);
  useEffect(() => {
      axios.get("http://localhost:5000/team/OneTeam/"+username)
      .then(res => setTeamDetails(res.data))
      .catch(error => console.log(error));
  },[]);

    function topicSubmit()
    {
        const description =    Description.toString();
        const submittingSuccess ={
            username,
            researchTopic,
            researchCategory,
            researchSupervisor,
            researchCoSupervisor,
            description
        }

        axios.put("http://localhost:5000/team/submit_topic",submittingSuccess).then(() =>{
            Swal.fire({  
            title: "Success!",
            text: "Topic submitted.",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                window.location.href = "/student/TeamDashboard";
            });

            }).catch((err)=>{

                Swal.fire({  
                title: "Error!",
                text: "Topic not submitted.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
    }

    const download = (filename) => {
        saveAs(
          "https://res.cloudinary.com/dnomnqmne/image/upload/v1653733238/"+filename,
          filename
        );
    };
    


    

    function topicReSubmit(){
        const Description =    ReDescription.toString();
        const submittingSuccess ={
            username,
            ReTopic,
            Description,
        }

        axios.put("http://localhost:5000/team/topicReSubmit",submittingSuccess).then(() =>{
            Swal.fire({  
            title: "Success!",
            text: "Topic re-submitted.",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
                window.location.href = "/student/TeamDashboard";
            });

            }).catch((err)=>{

                Swal.fire({  
                title: "Error!",
                text: "Topic not re-submitted.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
            })
    }

    function submitDocs(id,title){
        window.location.href = "/student/StudentSubmitDocs?id="+id+"&title="+title+"&username="+username;
    }
  return (
    <div>
       <HomePageNav/>
       <div class="global-container3"  style={{paddingTop:'5%', paddingBottom:'5%'}}>
            <center>
            {TeamDetails.map((TeamDetail,key) => (
                <div class="container">
                    <div class="row bg-light rounded p-4">
                        <center>
                            <h2 class="card-title text-center pt-2 pb-2  text-uppercase text-dark">
                                   Your Group Details
                            </h2>
                            <p style={{lineHeight:'0%'}} class="mb-3">Team Id - {username}</p>
                        </center>
                        <div class="text-end mt-4">
                          <button type="button" data-bs-toggle="modal" style={{display: (TeamDetail.topicStatus == 'Not Submit')?'inline':'none'}} data-bs-target="#exampleModal" class="btn btn-outline-dark btn-sm">Research Topic Setup</button>&nbsp;
                          <a href="#view_deadline">
                            <button type="button"  class="btn btn-outline-dark btn-sm">View Deadlines</button>&nbsp;
                          </a>
                        </div>
                        <div class="text-start mt-3">
                       
                        <div style={{display: (TeamDetail.topicStatus == 'Not Submit')?'none':'inline'}}>
                            <p class="modal-title text-dark "><b>Selected Topic :</b> {TeamDetail.researchTopic}</p>
                            <p class="modal-title text-dark "><b>Topic status :</b> {TeamDetail.topicStatus}</p>
                            <p class="modal-title text-dark "><b>Team status :</b> <span style={{color:(TeamDetail.status == 'Active')?'Green' : 'Red'}}>{(TeamDetail.status == 'Active')?'Approved' : 'Rejected'}</span></p>
                            <p class="modal-title text-dark "><b>Research Category :</b> <span >{TeamDetail.researchCategory}</span></p>
                        </div>
                        <br/>
                        <div style={{display: (TeamDetail.topicStatus == 'Reject')?'inline':'none'}}>
                            <div class="alert alert-danger mt-3" role="alert">
                                    Your Research Topic Rejected. Please Re-submit New Topic.  <button type="button" class="btn btn-dark btn-sm" data-bs-target="#reSubmit" data-bs-toggle="modal" >Click Me For Submit</button>

                            </div>
                        </div>
                        <br/>
                        <h3 style={{lineHeight:'0px'}}  class="mt-4">About Project</h3>
                        <hr/>
                        <div style={{fontSize:'15px', display: (TeamDetail.topicStatus != 'Reject')?'inline':'none'}} className="mt-3"
                        dangerouslySetInnerHTML={{
                            __html: TeamDetail.description
                        }}></div>

                        <h3 style={{lineHeight:'0px'}} class="mt-5 pt-3 pb-4">Evolution</h3>
                        <hr/>
                        <div style={{fontSize:'15px', display: (TeamDetail.topicStatus != 'Reject')?'inline':'none'}} className="mt-3"
                        dangerouslySetInnerHTML={{
                            __html: TeamDetail.evolution
                        }}></div>
                      
                        </div>

                        <div class="modal fade" id="reSubmit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header bg-dark text-start">
                                        <h5 class="modal-title text-warning" id="exampleModalLabel">RE-SUBMIT RESEARCH TOPIC</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-start">
                                        <div class="row mt-4">
                                            <div class="col-sm-12">
                                              <div class="mb-3">
                                                  <label class="form-label">Research Topic</label>
                                                  <input type="text" class="form-control" onChange={(e) =>{
                                                      setReTopic(e.target.value);
                                                    }}/>
                                              </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <label class="form-label">About Your Research Topic : </label>
                                                <CKEditor
                                                    editor={ ClassicEditor }
                                                    data=""
                                                    onChange={(event, editor) =>{
                                                    const data = editor.getData();
                                                    setReDescription(data);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer border-0">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" onClick={topicReSubmit}>Topic Re-Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header bg-dark text-start">
                                        <h5 class="modal-title text-warning" id="exampleModalLabel">SETUP RESEARCH TOPIC</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-start">
                                        <div class="row mt-4">
                                            <div class="col-sm-8">
                                              <div class="mb-3">
                                                  <label class="form-label">Research Topic</label>
                                                  <input type="text" class="form-control" onChange={(e) =>{
                                                      setTopic(e.target.value);
                                                    }}/>
                                              </div>
                                            </div>
                                            <div class="col-sm-4">
                                              <div class="mb-3">
                                                  <label class="form-label">Research Category : </label>
                                                  <select type="text" class="form-select" onChange={(e) =>{
                                                      setFunCategory(e.target.value);
                                                    }}>
                                                      <option value="">Select Research Category</option>
                                                      <option value="Machine Learning">Machine Learning</option>
                                                      <option value="Web Technology">Web Technology</option>
                                                      <option value="Networking">Networking</option>
                                                      <option value="Cryptography">Cryptography</option>
                                                      <option value="IOT">IOT</option>
                                                      <option value="Cyber Security">Cyber Security</option>
                                                  </select>
                                              </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-sm-6">
                                              <label class="form-label">Supervisor</label>
                                              <select type="text" class="form-select"  onChange={(e) =>{
                                                  setSupervisor(e.target.value);
                                                }}>
                                                      <option value="">Select Supervisor</option>
                                                      {SupervisorList.map((supervisor,key) => (
                                                          <option value={supervisor.email}>{supervisor.name}</option>
                                                      ))}
                                              </select>
                                            </div>
                                            <div class="col-sm-6">
                                              <label class="form-label">Co-Supervisor</label>
                                              <select type="text" class="form-select" onChange={(e) =>{
                                                      setCoSupervisor(e.target.value);
                                                  }}>
                                                      <option value="">Select Co-Supervisor</option>
                                                      {CoSupervisorList.map((CoSupervisor,key) => (
                                                          <option value={CoSupervisor.email}>{CoSupervisor.name}</option>
                                                      ))}
                                              </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 mt-4">
                                            <label class="form-label">About Your Research Topic : </label>
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data=""
                                                onChange={(event, editor) =>{
                                                const data = editor.getData();
                                                setDescription(data);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="modal-footer border-0">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" onClick={topicSubmit}>Topic Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-4 mt-3">
                            <div class="card ">
                            <div class="card-body ">
                                <h5 class="card-title">Team Leader Details</h5>
                                <div class="mb-2 text-start mt-5">
                                    <label  class="form-label" > Name : {TeamDetail.mem_one_name}</label>
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Registration Number :  {TeamDetail.mem_one_reg}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Email : {TeamDetail.mem_one_email}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Telephone : {TeamDetail.mem_one_tel}</label>
                                    
                                </div>
                                <div class="mb-2 text-start ">
                                    <label  class="form-label" >Specialization : <br/>{TeamDetail.mem_one_specialize}</label>
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-4  mt-3">
                            <div class="card ">
                            <div class="card-body ">
                                <h5 class="card-title">First Member's Details</h5>
                                <div class="mb-2 text-start mt-5">
                                    <label  class="form-label" > Name : {TeamDetail.mem_two_name}</label>
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Registration Number :  {TeamDetail.mem_two_regNum}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Email : {TeamDetail.mem_two_email}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Telephone : {TeamDetail.mem_two_tel}</label>
                                    
                                </div>
                                <div class="mb-2 text-start ">
                                    <label  class="form-label" >Specialization : <br/>{TeamDetail.mem_two_specialize}</label>
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-4  mt-2">
                            <div class="card ">
                            <div class="card-body ">
                                <h5 class="card-title">Second Member's Details</h5>
                                <div class="mb-2 text-start mt-5">
                                    <label  class="form-label" > Name : {TeamDetail.mem_three_name}</label>
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Registration Number :  {TeamDetail.mem_two_regNum}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Email : {TeamDetail.mem_three_email}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Telephone : {TeamDetail.mem_three_tel}</label>
                                    
                                </div>
                                <div class="mb-2 text-start ">
                                    <label  class="form-label" >Specialization : <br/>{TeamDetail.mem_three_specialize}</label>
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-4  mt-2">
                            <div class="card ">
                            <div class="card-body ">
                                <h5 class="card-title">Fourth Member's Details</h5>
                                <div class="mb-2 text-start mt-5">
                                    <label  class="form-label" > Name : {TeamDetail.mem_four_name}</label>
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Registration Number :  {TeamDetail.mem_four_regNum}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Email : {TeamDetail.mem_four_email}</label>
                                    
                                </div>
                                <div class="mb-2 text-start">
                                    <label  class="form-label" >Telephone : {TeamDetail.mem_four_tel}</label>
                                    
                                </div>
                                <div class="mb-2 text-start ">
                                    <label  class="form-label" >Specialization : <br/>{TeamDetail.mem_four_specialize}</label>
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="row bg-light text-start rounded p-4">
                        <h4 id="view_deadline">View Deadlines</h4>
                        <hr/>
                        
                        {AllDeadLine.map((DeadLine,key) => (
                        <div class="alert alert-secondary" role="alert">
                            <h4>{DeadLine.title}</h4>
                            <p style={{fontSize:'12px' , lineHeight:'4px'}}>DeadLine Date & Time : {moment(DeadLine.deadLineDateTime).format("YYYY-MM-DD h:mm:ss a")}</p>
                            <p style={{fontSize:'12px' , lineHeight:'4px'}}>Submit Type  : {DeadLine.submissionType}</p>
                            <h5 style={{fontSize:'15px', cursor: 'pointer'}} className="mt-1" onClick={()=> download(DeadLine.FileName)}><i class="bi bi-folder-fill"></i> File Download <span class="text-primary text-decoration-underline">{DeadLine.FileName}</span></h5>

                            <div class="mb-3 mt-3" style={{display : (DeadLine.submissionType == 'Presentation')?'none':'inline'}}>
                                <div class="text-end mt-2">
                                    <button type="button" class="btn btn-outline-dark" onClick={() => submitDocs(DeadLine._id,DeadLine.title,username)}>Submit</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
              ))}
            </center>
        </div>
    </div>
  );
}

export default TeamDashboard;
