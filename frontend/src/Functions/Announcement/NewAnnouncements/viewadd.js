import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";


function EditCustomer() {

    let history = useHistory();
    const { nic } = useParams();

    useEffect(() => {
        loadCustomer();
    }, []);

    const [NIC, setNIC] = useState("");
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [address, setAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");
    const [regDate, setRegDate] = useState("");
    const [empId, setEmpId] = useState("");




    const onSubmit = async e => {
        e.preventDefault();//to prevent the default submission by submit button

        const answer = window.confirm("Are you sure you want to update details?");
        if (answer) {

            const newCustomer = {
                NIC, name, organization, address, contactNo, email, regDate, empId
            }
            await axios.put(`https://sigiri-furniture-app.herokuapp.com/customer/updates/${nic}`, newCustomer).then(() => {
                alert("Customer successfully Updated");


            }).catch((err) => {
                alert(err.response.data.error);
            })
            history.push("/allCustomer")

        } else {

        }
    }

    const loadCustomer = async () => {
        await axios.get(`https://sigiri-furniture-app.herokuapp.com/customer/get/${nic}`).then((res) => {
            console.log(res.data)
            setNIC(res.data.customer.NIC);
            setName(res.data.customer.name);
            setOrganization(res.data.customer.organization);
            setAddress(res.data.customer.address);
            setContactNo(res.data.customer.contactNo);
            setEmail(res.data.customer.email);
            setRegDate(res.data.customer.regDate);
            setEmpId(res.data.customer.empId);

        }).catch((err) => {
            alert(err.response.data.error);
        })

    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <div style={{ position: "absolute", top: "15%", left: "30%", width: "50%", height: "90%" }}>
            <div style={{ position: "absolute", top: "-2%", left: "-60%", width: "15%", height: "115%" }}>

                <nav class="main-menu bg-primary">
                    <ul>
                        <li class="has-subnav">
                            <Link to="/allCustomer">
                                <i class="fa fa-home fa-2x"></i>
                                <span class="nav-text">Home</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <li class="has-subnav">
                            <Link to="/allCustomer">
                                <i class="fa fa fa-users fa-2x"></i>
                                <span class="nav-text">Customer List</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <li class="has-subnav">
                            <Link to="/addCustomer">
                                <i class="fa fa-user-plus fa-2x"></i>
                                <span class="nav-text">Add New Customer</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <Link to="/displayOrders">
                                <i class="fa fa-table fa-2x"></i>
                                <span class="nav-text">Order List</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <li class="has-subnav">
                            <Link to="/addOrder">
                                <i class="fa fa-plus-circle fa-2x"></i>
                                <span class="nav-text">Add New Order</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <hr></hr>
                        <li class="has-subnav">
                            <Link to="/order/GenerateOrderReport">
                                <i class="fa fa-file-pdf-o fa-2x"></i>
                                <span class="nav-text">Order Report</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <li class="has-subnav">
                            <Link to="/order/GenerateOrderItemsReport">
                                <i class="fa fa-file-pdf-o fa-2x"></i>
                                <span class="nav-text">Order Items Report</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>
                        <li class="has-subnav">
                            <Link to="/order/GenerateCustomerReport">
                                <i class="fa fa-file-pdf-o fa-2x"></i>
                                <span class="nav-text">Customer Report</span>
                                <i class="fa fa-angle-right fa-2x"></i>
                            </Link>
                        </li>

                    </ul>



                    <ul class="logout">
                        <li>
                        <Link to="/">
                            <i class="fa fa-power-off fa-2x"></i>
                            <span class="nav-text">Logout</span>
                            <i class="fa fa-angle-right fa-2x"></i>
                        </Link>
                        </li>
                    </ul>
                </nav>



            </div>
            <div className="container" style={{ background: "#e7ebe8" }} class="border border-dark border-2">
                <form onSubmit={onSubmit} style={{ font: "italic small-caps bold 16px/28px Georgia, serif", marginLeft: 30, marginRight: 30 }}>
                    <center>
                        <h3 >EDIT CUSTOMER PROFILE</h3></center><br></br>

                    <div className="form-group" >
                        <div class="d-grid gap-2 d-md-flex justify-content-md" >
                            <div className="col-md-4">
                                <label for="CustomerNIC" className="form-label" >Customer NIC</label>
                                <input type="text" className="form-control"
                                    name="NIC"
                                    value={NIC}
                                    onChange={(event) => { setNIC(event.target.value) }}
                                    pattern="[0-9]{9}V" required />
                            </div>

                            <div className="col-md-4">
                                <label for="RegDate" className="form-label" >Registration Date</label>
                                <input type="date" className="form-control"
                                    name="regDate"
                                    value={regDate}
                                    onChange={(event) => { setRegDate(event.target.value) }} required disabled />
                            </div>

                            <div className="col-md-3">
                                <label for="empId" className="form-label" >Sales Assistant</label>
                                <input type="text" className="form-control"
                                    name="empId"
                                    value={empId}
                                    onChange={(event) => { setEmpId(event.target.value) }}
                                    pattern="VM[0-9]{3}" required disabled />

                            </div>

                        </div>
                    </div>
                    <div className="form-group">
                        <label for="CustomerName" className="form-label" >Name</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }} required />
                    </div>
                    <div className="form-group">
                        <label for="organization" className="form-label">Organization</label>
                        <input type="text" className="form-control"
                            name="organization"
                            value={organization}
                            onChange={(event) => { setOrganization(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label for="CustomerAddress" className="form-label">Customer Address</label>
                        <textarea className="form-control" rows="1" cols="2"
                            name="address"
                            value={address}
                            onChange={(event) => { setAddress(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label for="ContactNo" className="form-label" >Contact Number</label>
                        <input type="text" className="form-control"
                            name="contactNo" value={contactNo}
                            onChange={(event) => { setContactNo(event.target.value) }}
                            pattern="[0-9]{9}" required />
                    </div>
                    <div className="form-group">
                        <label for="CustomerEmail" className="form-label">Email Address</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}" required />

                    </div>


                    <div className="form-group">

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-outline-primary me-md-2" type="reset" value="RESET" onClick={refreshPage}>RESET</button>
                            <button className="btn btn-outline-primary me-md-2 ml-2" type="submit" value="SUBMIT">UPDATE CUSTOMER PROFILE</button>
                        </div>
                        <br></br>
                    </div>
                </form>

            </div>

            <Link to="/allCustomer"> <button class="text-decoration-none" class="btn btn-danger"> BACK</button> </Link>
        </div>
    )
}

export default EditCustomer;