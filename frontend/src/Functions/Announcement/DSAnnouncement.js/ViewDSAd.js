import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBView,
    MDBContainer,
    MDBBtnGroup,
    MDBIcon, MDBFormInline,
    MDBCard,
    MDBCardBody,
    MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert, MDBPagination, MDBPageItem, MDBPageNav,
} from 'mdbreact';
import './UserManage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from 'react-bootstrap';
import jsPDF from "jspdf";

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartitem: '',
            detailList: [],
            currentPage: 1,
            userPerPage: 5,
            empty: false,
            searched: false,
            CustomerName: '',
            foundSearch: false,
            searchList: []


        }

        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.changePage = this.changePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.userMail = this.userMail.bind(this);
        this.generateRep = this.generateRep.bind(this);


    }

    componentDidMount() {
        this.getDetails();

        if (localStorage.getItem("Position") !== "Admin") {
            this.props.history.push('/');
        }

    }

    sweetalertfunction(id,name,email) {

        console.log("button clicks");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                axios.get(constants.backend_url + 'api/userDetail/deleteUser/' + id).then(response => {
                    if (response.data.userDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            '',
                            'Delete Failed !.',
                            'error'
                        )
                    } else {
                        Swal.fire(
                            '',
                            'Customer Deleted !',
                            'success'
                        )
                        this.userMail(name, email);
                        this.getDetails();
                    }
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Customer details not deleted',
                    'error'
                )
            }
        })
    }


    getDetails() {
        console.log("get user details");
        axios.get(constants.backend_url + 'api/userDetail/getAllusers').then(response => {
            this.setState({detailList: response.data})
        }).catch(function (error) {
            console.log(error);
        })
    }

    changePage(event) {
        this.setState({
            CustomerName: event.target.value,
        });
    }

    firstPage() {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    }

    nextPage() {

        if (this.state.currentPage < Math.ceil(this.state.detailList.length / this.state.userPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage() {

        if (this.state.currentPage < Math.ceil(this.state.detailList.length / this.state.userPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.detailList.length / this.state.userPerPage)
            })
        }

    }

    onChangeName(e) {
        this.setState({
            CustomerName: e.target.value,
        });

        console.log("search user");
        if (e.target.value !== '') {

            axios.get(constants.backend_url + 'api/userDetail/seachUser/' + e.target.value).then(response => {
                if (response.data.message === 'not found') {
                    this.setState({
                        searched: false,
                        // foundSearch: false

                    })

                    console.log("not found");
                } else {

                    this.setState({
                        searchList: response.data,
                        searched: true,
                        // foundSearch: true
                    })
                    console.log(" found");
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            this.setState({
                searched: false,

            })
            this.getDetails();
        }


    }


    generateRep(){
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "GSTD Pvt(LTD) User Report ";
        const headers = [["Name", "Email Address","Contact Number","Date of Birth", "Gender"]];

        const data = this.state.detailList.map(user=> [user.firstName, user.email,user.phoneNumber,user.dob
        ,user.gender]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("GSTDOrderReport.pdf")
    }


    userMail( name, email){
        console.log("user mail called");
        console.log("user mail called" + name);
        console.log("user mail called" + email);
        axios.get(constants.spring_backend_url + '/userController/userMail/'+ name +'/'+ email ).then(response => {
            if(response.data==true){
                console.log("succ");
                Swal.fire(
                    '',
                    'Auto generated Email has sent to ' + name + ' about the reason for the deletion of their account !',
                    'success'
                );
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    render() {
        const {detailList, currentPage, userPerPage, CustomerName} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentUsers = detailList.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(detailList.length / userPerPage);


        return (

            <div id='parallaxintro'>

                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        <NavLink exact={true} to="/usermanage" activeClassName="activeClass">
                            <button type="button" className="btn btn-primary">User Details</button>
                        </NavLink>
                        <NavLink exact={true} to="/usermanage/adminmanage">
                            <button type="button" className="btn btn-success "> Admin Manage</button>
                        </NavLink>

                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </MDBCardBody>
                </MDBCard>


                <MDBView>
                    <MDBMask className='rgba-white-light'/>
                    <MDBContainer className='d-flex justify-content-center align-items-center'
                                  style={{height: '100%', width: '100%', paddingTop: '0rem'}}>
                        <MDBRow>
                            {/*<div style={{"float": "left"}}>*/}
                            {/*    <MDBBtn size="sm" color="success" className="my-0" type="submit" ><MDBIcon icon="redo-alt"  /> &nbsp; Reset </MDBBtn>*/}
                            {/*</div>*/}
                            <MDBCol md="6" className="searchC">
                                <MDBFormInline className="md-form m-0">
                                    <input
                                        className="form-control form-control-sm"
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search"
                                        value={this.state.CustomerName}
                                        onChange={this.onChangeName}
                                        // onChange={()=>this.searchUser(this.state.CustomerName)}
                                    />
                                    <MDBBtn size="sm" color="primary" className="my-0" type="button" disabled><MDBIcon
                                    icon="search"/></MDBBtn>
                                    <MDBBtn size="sm" color="success" className="my-0" type="button" onClick={() => this.generateRep()} ><MDBIcon far icon="file-alt" />&nbsp;&nbsp;Generate Report</MDBBtn>
                                </MDBFormInline>
                            </MDBCol>

                            {
                                this.state.searched ?
                                    // this.state.foundSearch ?
                                    <div className=" container-fluid AddItemHeight">
                                        <MDBRow>
                                            <MDBCol size="12">
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <form>
                                                            <MDBTable responsive>
                                                                <MDBTableHead color="primary-color" textWhite>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Email Address</th>
                                                                        <th>Contact Number</th>
                                                                        <th>Date of Birth</th>
                                                                        <th>Gender</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </MDBTableHead>

                                                                {

                                                                    this.state.searchList.map(item => {

                                                                        return (
                                                                            <MDBTableBody>
                                                                                <tr>
                                                                                    <td>{item.firstName + "  " + item.lastName}</td>
                                                                                    <td>{item.email}</td>
                                                                                    <td>{item.phoneNumber}</td>
                                                                                    <td>{item.dob}</td>
                                                                                    <td>{item.gender}</td>
                                                                                    <td>
                                                                                        <MDBBtn tag="a" size="sm"
                                                                                                color="danger"
                                                                                                onClick={() => this.sweetalertfunction(item._id,item.firstName, item.email)}>
                                                                                            <MDBIcon size="lg"
                                                                                                     icon="times-circle"/>
                                                                                        </MDBBtn>
                                                                                    </td>
                                                                                </tr>
                                                                            </MDBTableBody>
                                                                        )
                                                                    })}

                                                            </MDBTable>
                                                        </form>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                    //     // --------------------------------------------
                                    //
                                    //     :
                                    //
                                    //     // --------------------------------------------
                                    //
                                    //     <MDBCol style={{textAlign : "center", fontWeight: "bold"  }}>
                                    //         <MDBAlert color="success" >
                                    //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User {this.state.CustomerName} not found !&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    //         </MDBAlert>
                                    //     </MDBCol>
                                    //
                                    //
                                    // // --------------------------------------------

                                    :


                                    // -----------------------------------------
                                    <div className=" container-fluid AddItemHeight">
                                        <MDBRow>
                                            <MDBCol size="12">
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <form>
                                                            <MDBTable responsive>
                                                                <MDBTableHead color="primary-color" textWhite>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Email Address</th>
                                                                        <th>Contact Number</th>
                                                                        <th>Date of Birth</th>
                                                                        <th>Gender</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </MDBTableHead>

                                                                {
                                                                    currentUsers.length === 0 ?
                                                                        <tr>
                                                                            <td colSpan="12" style={{
                                                                                textAlign: "center",
                                                                                fontWeight: "bold"
                                                                            }}>
                                                                                <MDBAlert color="danger">
                                                                                    No Users Registered
                                                                                </MDBAlert>
                                                                            </td>
                                                                        </tr> :
                                                                        currentUsers.map(item => {

                                                                            return (
                                                                                <MDBTableBody>
                                                                                    <tr>
                                                                                        <td>{item.firstName + "  " + item.lastName}</td>
                                                                                        <td>{item.email}</td>
                                                                                        <td>{item.phoneNumber}</td>
                                                                                        <td>{item.dob}</td>
                                                                                        <td>{item.gender}</td>
                                                                                        <td>
                                                                                            <MDBBtn tag="a" size="sm"
                                                                                                    color="danger"
                                                                                                    onClick={() => this.sweetalertfunction(item._id,item.firstName, item.email)}>
                                                                                                <MDBIcon size="lg"
                                                                                                         icon="times-circle"/>
                                                                                            </MDBBtn>
                                                                                        </td>
                                                                                    </tr>
                                                                                </MDBTableBody>
                                                                            )
                                                                        })}

                                                            </MDBTable>
                                                            <div style={{"float": "left", "color": "#007bff"}}> Showing
                                                                Page {currentPage} of {totalPages} </div>
                                                            <div style={{"float": "right"}}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend></InputGroup.Prepend>
                                                                    <MDBBtnGroup>
                                                                        <MDBBtn color="primary" size="sm"
                                                                                disabled={currentPage === 1 ? true : false}
                                                                                onClick={this.firstPage}>First</MDBBtn>
                                                                        <MDBBtn color="primary" size="sm"
                                                                                disabled={currentPage === 1 ? true : false}
                                                                                onClick={this.prevPage}>Prev</MDBBtn>
                                                                    </MDBBtnGroup>
                                                                    <input type="text" className="pageNumCss"
                                                                           name="currentPage" value={currentPage}
                                                                           onChange={this.changePage} disabled/>
                                                                    <InputGroup.Append>
                                                                        <MDBBtnGroup>
                                                                            <MDBBtn color="primary" size="sm"
                                                                                    disabled={currentPage === totalPages ? true : false}
                                                                                    onClick={this.nextPage}>Next</MDBBtn>
                                                                            <MDBBtn color="primary" size="sm"
                                                                                    disabled={currentPage === totalPages ? true : false}
                                                                                    onClick={this.lastPage}>Last</MDBBtn>
                                                                        </MDBBtnGroup>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </form>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                            }

                        </MDBRow>
                    </MDBContainer>
                </MDBView>
            </div>
        );
    }
}