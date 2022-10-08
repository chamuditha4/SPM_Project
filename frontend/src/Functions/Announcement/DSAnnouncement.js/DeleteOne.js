import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBView,
    MDBContainer,
    MDBBtnGroup,
    MDBIcon,  MDBFormInline,
    MDBCard,
    MDBCardBody,
    MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert,MDBPagination,MDBPageItem,MDBPageNav,
} from 'mdbreact';
// import './UserManage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from 'react-bootstrap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StockPriceTableBody from "./StockPriceTableBody";
import jsPDF from "jspdf";
import "jspdf-autotable"

export default class SupplierTable extends Component{

    constructor(props) {
        super(props);


        this.state = {
            suppliers: [],
            currentPage: 1,
            userPerPage: 5,
            empty: false

        }

        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.getAllSuppliers = this.getAllSuppliers.bind(this);
        this.deleteSuppliers = this.deleteSuppliers.bind(this);
        this.getAllSuppliers();


        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem("userLogged")!=="userLogged"){
            this.props.history.push('/');
        }
    }

    getAllSuppliers() {
        axios.get(constants.backend_url + 'api/supplier/getAllSuppliers').then(response => {
            this.setState({suppliers: response.data});
            console.log("Suppler")
            console.log(response.data)
            console.log("Supplier")
        }).catch(function (error) {
            console.log(error);
        })
        console.log(this.state.suppliers);
    }

    sweetalertfunction(id){
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
            console.log("suppppp");
            if (result.value) {
                console.log("outside of deleteSupplier");
                axios.get(constants.backend_url + 'api/supplier/deleteSuppliers/'+ id).then(response => {
                    console.log("Inside of deleteSupplier");
                    if (response.data.supplierDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            '',
                            'Delete Failed !.',
                            'error'
                        )
                    }else {
                        Swal.fire(
                            '',
                            'Customer Deleted !',
                            'success'
                        )
                        this.getAllSuppliers();
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

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "GSTD Pvt(LTD) Supplier Report ";
        const headers = [["Company Name", "Name","Phone Number","Company Number","Email","Fax","Address1","Address2","City","Country"]];

        const data = this.state.suppliers.map(elt=> [elt.companyName, elt.firstName,elt.mobileNumber,elt.companyNumber,elt.email,elt.fax,elt.address1,elt.address2,elt.city,elt.country]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("GSTDSupplierReport.pdf")
    }

    deleteSuppliers(id){
        const notDeletedItems = this.state.suppliers.filter(supplier => supplier._id !== id);
        this.setState({
                suppliers: notDeletedItems

            }
        )
        if (notDeletedItems.length === 0) {
            this.setState({
                noItem: true
            })
        }
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

        if (this.state.currentPage < Math.ceil(this.state.suppliers.length / this.state.userPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage() {

        if (this.state.currentPage < Math.ceil(this.state.suppliers.length / this.state.userPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.suppliers.length / this.state.userPerPage)
            })
        }

    }

    changePage(event){
        this.setState({
            [event.target.name] : parseInt(event.target.value)
        });
    }



    render() {

        //const suppliersArr = this.state.suppliers;
        // const {deleteSuppliers} = this.props;
        const deleteSuppliers = this.deleteStockPrice;

        const { suppliers, currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentsuppliers = suppliers.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(suppliers.length / userPerPage);


        return (

            <div>

                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        <NavLink exact={true} to="/supplier/suppliermanage" >
                            <button type="button" className="btn btn-primary"> Supplier Manage</button>
                        </NavLink>

                        <NavLink exact={true} to="/supplier/supplieranalysis" activeClassName="activeClass">
                            <button type="button" className="btn btn-success ">Supplier Details</button>
                        </NavLink>

                        <button type="button" className="btn btn-primary" onClick={() => this.exportPDF()}>Export to PDF</button>

                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </MDBCardBody>
                </MDBCard>


            <MDBCard className="card">
                <MDBCardBody>
                    <MDBTable responsive>
                        <MDBTableHead color="primary-color" textWhite>
                            <tr>
                                <th>Company Name</th>
                                <th>Website</th>
                                <th>Description</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Company Number</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Fax</th>
                                <th>Address1</th>
                                <th>Address2</th>
                                <th>City</th>
                                <th>County</th>
                                <th>State</th>
                                <th>Action</th>

                            </tr>

                        </MDBTableHead>
                        {
                            currentsuppliers.length === 0 ?
                                <tr >
                                    <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                        <MDBAlert color="danger" >
                                            No Suppliers Registered
                                        </MDBAlert>
                                    </td>
                                </tr> :
                                currentsuppliers.map(sup => {

                                    return(
                                        <MDBTableBody>
                                            <tr>
                                                <td>{sup.companyName}</td>
                                                <td>{sup.companyWebsite}</td>
                                                <td>{sup.description}</td>
                                                <td>{sup.firstName}</td>
                                                <td>{sup.lastName}</td>
                                                <td>{sup.companyNumber}</td>
                                                <td>{sup.mobileNumber}</td>
                                                <td>{sup.email}</td>
                                                <td>{sup.fax}</td>
                                                <td>{sup.address1}</td>
                                                <td>{sup.address2}</td>
                                                <td>{sup.city}</td>
                                                <td>{sup.country}</td>
                                                <td>{sup.state}</td>
                                                <td>
                                                    <MDBBtn tag="a" size="sm" color="danger" onClick={() => this.sweetalertfunction(sup._id)} >
                                                        <MDBIcon size="lg" icon="times-circle" />
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
                </MDBCardBody>
            </MDBCard>

            </div>
        );
    }
}