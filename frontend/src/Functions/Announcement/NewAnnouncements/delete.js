import React, { useState, useEffect } from "react"
import axios from 'axios'
import MaterialTable from 'material-table'




const HOST1 = "https://sigiri-furniture-app.herokuapp.com/TransportDetail"
const HOST2 = "https://sigiri-furniture-app.herokuapp.com/vehicle"


export default  function DashboardT(){

    const [TransportDetails, setTransportDetails] = useState([]);
    const [Vehicles, setVehicles] = useState([]);
   

    //view Transport table
    useEffect(() => {

        axios.get(HOST1 + "/ViewT")
            .then((res) => {
                setTransportDetails(res.data);
                console.log('Data has been received');
            }).catch(() => {
                alert('Error while fetching data')
            })

    }, []);

    //view Vehicle table
    useEffect(() => {

        axios.get(HOST2 + "/")
            .then((res) => {
                setVehicles(res.data);
                console.log('Data has been received');
            }).catch(() => {
                alert('Error while fetching data')
            })

    }, []);

    




    return(
        <div class ="component-body">
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
                            <a href="/viewD">
                                <i class="fa fa-users" aria-hidden="true"></i>
                                <span class="nav-text">Driver Details</span>
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

        
            <a href="/addVehicle" class="btn btn-primary active ml-5 " role="button" aria-pressed="true"> + Add Vehicle Details </a>
            <a href="/addT" class="btn btn-primary active ml-3 " role="button" aria-pressed="true"> + Add Transport Details </a>
           
            {/* All Transport Details */}
            <div className="container-fluid mt-5">
        
        <MaterialTable style={{background:"#E3ECFF"}}
                    title=" All Transport Details "

                    columns={[
                        { title: "Transport ID", field: "TransportID", type: "string" },
                        { title: "Vehicle RegNo", field: "VehicleRegNo", type: "string" },
                        { title: "Date", field: "Date", type: "string" },
                        { title: "Driver Name", field: "DriverName", type: "string" },
                        { title: "Discription", field: "Discription", type: "string" },
                        { title: "Status", field: "Status", type: "string" },
                    ]}

                    data={TransportDetails}
                    options={{
                        sorting: true,
                        actionsColumnIndex: -1,

                    }}
      
                
                    />
                    
                
                </div>




                {/* All Vehicle Details */}
            <div className="container-fluid">
                <MaterialTable style={{background:"#E3ECFF"}}
                    title=" Vehicles Details"

                    columns={[
                        { title: "Vehicle ID", field: "VehicleID", type: "string" },
                        { title: "Vehicle RegNo", field: "VehicleRegNo", type: "string" },
                        { title: "Date", field: "Date", type: "string" },
                        { title: "Vehicle Type", field: "VehicleType", type: "string" },
                        { title: "Vehicle Brand", field: "VehicleBrand", type: "string" },
                        { title: "Mileage (km)", field: "Mileage", type: "numeric" },
                    ]}

                    data={Vehicles}
                    options={{
                        sorting: true,
                        actionsColumnIndex: -1,

                    }}

                    
                />

                
            </div>




        </div>

    )

    



}