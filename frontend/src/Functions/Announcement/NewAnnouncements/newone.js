import React, { useState, useEffect } from "react"
import axios from 'axios'
import MaterialTable from 'material-table'
import { Modal } from "react-bootstrap"


const HOST = "https://sigiri-furniture-app.herokuapp.com/Maintenance"



export default function AddMaintaince() {

    //adding
    const [Maintenances, setMaintenances] = useState([]);

    const [MaintainID, setID] = useState("");
    const [VehicleRegNo, setRegNo] = useState("");
    const [Date, setDate] = useState("");
    const [Discription, setDiscription] = useState("");
    const [Cost, setCost] = useState("");
    const [RegNoErr, setRegNoErr] = useState("");

    const [StateDelete, setStateDelete] = useState(false)
    const [MaintenaceDelete, setMaintenaceDelete] = useState()


    function sendData(e) {//event

        e.preventDefault(); //prevent normal behaviour of submit button

        const isValid =formValidation();

        if(isValid){//send data after validate

        const newMaintaince = {
            MaintainID,
            VehicleRegNo,
            Date,
            Discription,
            Cost
        }

        axios.post("https://sigiri-furniture-app.herokuapp.com/Maintenance/addM", newMaintaince)

            .then(() => {
                alert("Maintaince details  added")
                window.location.reload(true)//reload page

            }).catch((err) => {
                alert(err)
            })
    }

    }

    const formValidation =() => {//validation function
        const RegNoErr ={};//state
        let isValid =true;//return boolean value, setting flag


        if(VehicleRegNo.trim().length >8){
            RegNoErr.InvalidRegNo="Invalid Vehicle registration number";//error
            isValid=false;
        }

        setRegNoErr(RegNoErr); //update error objects
        return isValid;

    }

    


    useEffect(() => {

        axios.get(HOST + "/viewM")
            .then((res) => {
                setMaintenances(res.data);
                console.log('Data has been received');
            }).catch(() => {
                alert('Error while fetching data')
            })

    }, []);

    function onDelete() {
        axios.delete(HOST + "/deleteM/" + MaintenaceDelete)
            .then((res) => {
                console.log(res)
                alert('Maintenance detail deleted')
                window.location.reload(true)//reload page

            }).catch(() => {
                alert('error while deleting Transport Detail')
            })

    }





    return (
        <div class="component-body">
        
        <div class="area">
                <nav class="main-menu bg-primary">
                    <ul>
                        <li>
                            <a href="/AllT">
                                <i class="fa fa-home fa-2x"></i>
                                <span class="nav-text">Dashboard</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <a href="/viewVehicle">
                                <i class="fa fa-automobile fa-2x"></i>
                                <span class="nav-text">Vehicle List</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <li class="has-subnav">
                            <a href="/addVehicle">
                                <i class="fa fa-ambulance fa-2x"></i>
                                <span class="nav-text">Add Vehicle</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <a href="/addT">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                <span class="nav-text">Add Transort Detials</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <li class="has-subnav">
                            <a href="/ViewT">
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                                <span class="nav-text">View Transport Details</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <a href="/addM">
                                <i class="fa fa-wrench fa-2x"></i>
                                <span class="nav-text">Maintenance</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <a href="/viewD">
                                <i class="fa fa-users" aria-hidden="true"></i>
                                <span class="nav-text">Driver Details</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </a>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <a href="/ReportT">
                            <i class="fa fa-download" aria-hidden="true"></i>
                                <span class="nav-text">Transport Reports</span>
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


            <div className="container mb-3" style={{ top: "500" }}>
                <h1>Maintenance Details</h1>
                <form className="mt-5" onSubmit={sendData}>


                    <div className="mb-3">
                        <label for="Maintenance ID" className="form-label">Maintenance ID :</label>
                        <input type="text" className="form-control" id="regNo" placeholder="ex: M001"
                        pattern="M[0-9]{3}" required
                        
                            onChange={(e) => {
                                setID(e.target.value); // assign value
                            }}

                        ></input>
                    </div>

                    <div className="mb-3">
                        <label for="regNo" className="form-label">Vehicle Registration No:</label>
                        <input type="text" className="form-control" id="regNo" placeholder="Registration Number ABC-XXXX"
                        
                            onChange={(e) => {
                                setRegNo(e.target.value); // assign value
                            }}

                        ></input>
                    </div>

                    {Object.keys(RegNoErr).map((key)=>{
                        return<div style={{color :"red"}}>{RegNoErr[key]}</div>
                    })}
                    <div className="mb-3">
                        <label for="date" className="form-label">Date :</label>
                        <input type="date" className="form-control" id="date" placeholder="Date"
                            onChange={(e) => {
                                setDate(e.target.value); // assign value
                            }}

                        ></input>
                    </div>
                    <div className="mb-3">
                        <label for="VehicleType" className="form-label">Description :</label>
                        <input type="VehicleType" className="form-control" id="VehicleType" placeholder="Description"
                            onChange={(e) => {
                                setDiscription(e.target.value); // assign value
                            }}

                        ></input>
                    </div>
                    <div className="mb-3">
                        <label for="VehicleBrand" className="form-label">Maintenance Cost :</label>
                        <input type="VehicleBrand" className="form-control" id="VehicleBrand" placeholder="Maintenance Cost"
                            onChange={(e) => {
                                setCost(e.target.value);  // assign value
                            }}

                        ></input>
                    </div>


                    <button type="submit" className="btn btn-primary" >Add Details</button>
                </form>




                <div className="container-fluid mt-5">
                    <MaterialTable style={{background:"#E3ECFF"}}
                        title="Maintenance Details"

                        columns={[
                            { title: "Maintenance id", field: "MaintainID", type: "string" },
                            { title: "Vehicle RegNo", field: "VehicleRegNo", type: "string" },
                            { title: "Date", field: "Date", type: "string" },
                            { title: "Description", field: "Discription", type: "string" },
                            { title: "Cost", field: "Cost", type: "string" },

                        ]}

                        data={Maintenances}
                        options={{
                            sorting: true,
                            actionsColumnIndex: -1,

                        }}



                        actions={[
                            
                            {
                                icon: () => <button class="btn btn-sm btn-outline-danger">Delete</button>,
                                onClick: (event, rowData) => {
                                    setMaintenaceDelete(rowData._id) //setidto delete
                                    setStateDelete(true);   //setstatetrue
                                }
                            },
                            
                        ]}

                    />

                <Modal show={StateDelete}>
                    <Modal.Body>
                        <p>You Want to delete this Maintenace details ?</p>
                        <button type="button" class="btn btn-outline-danger mr-3 pl-3" onClick={onDelete}>Delete</button>
                        <button type="button" class="btn btn-outline-secondary pl-3" onClick={() => setStateDelete(false)}>Cancel</button>
                    </Modal.Body>
                </Modal>


                </div>
            </div>
        
        </div>

    )}