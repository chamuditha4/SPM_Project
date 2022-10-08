import React, {Component} from 'react';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBView,
    MDBContainer, MDBPagination, MDBPageItem, MDBPageNav,
    MDBNavbar,
    MDBIcon, MDBDataTable, MDBFormInline,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBInput, MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert, MDBListGroup, MDBListGroupItem, MDBBtnGroup
} from 'mdbreact';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import axios from "axios";
import '../UserManagement/UserManage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import constants from "../../../constants/constants";
import {InputGroup} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable"


class OrderTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedId:'',
            resultArray : [],
            item:[],
            currentPage: 1,
            userPerPage: 5,
            orderList: []


        }
        this.getDetails = this.getDetails.bind(this);
        this.SortData = this.SortData.bind(this);
        this.viewItem = this.viewItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.changePage = this.changePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.exportPDF = this.exportPDF.bind(this);

    }
    componentDidMount() {
        this.getDetails();
        if (localStorage.getItem("userLogged") !== "userLogged") {
            console.log("Gnanod")
            this.props.history.push('/');
        }
    }
    getDetails() {

        axios.get(constants.backend_url + 'api/cart/getOrders').then(response => {
            console.log(response.data)
            this.setState({orderList: response.data});
            this.SortData();
        }).catch(function (error) {
            console.log(error);
        })

    }
    SortData(){
        const result = [];
        const map = new Map();
        for (const item of this.state.orderList) {
            if(!map.has(item.orderId)){
                map.set(item.orderId, true);    // set any value to Map
                result.push({
                    orderId: item.orderId,
                    itemTotal: item.itemTotal,
                    userId:item.userId,
                    oderTime:item.oderTime
                });
            }
        }
        this.setState({resultArray:result})
    }
    viewItem(id){
       console.log(id)
        this.setState({selectedId:id})
        axios.get(constants.backend_url + 'api/cart/viewOrders/'+id).then(response => {

            this.setState({item: response.data});

        }).catch(function (error) {
            console.log(error);
        })
    }
    deleteItem(id){
        console.log(id)

        axios.get(constants.backend_url + 'api/cart/deleteOrders/'+id).then(res => {

            if (res.data.order === 'successful') {
                Swal.fire(
                    '',
                    ' Item Deleted Successfully.',
                    'success'
                );
                this.getDetails();

            } else {
                Swal.fire(
                    '',
                    'Item Deleted Fail',
                    'error'

                )
            }

        }).catch(function (error) {
            console.log(error);
        })
    }


    changePage(event){
        this.setState({
            [event.target.name] : parseInt(event.target.value)
        });
    }

    firstPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    }

    nextPage(){

        if(this.state.currentPage < Math.ceil(this.state.resultArray.length / this.state.userPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage(){

        if(this.state.currentPage < Math.ceil(this.state.resultArray.length / this.state.userPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.resultArray.length / this.state.userPerPage)
            })
        }

    }
    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "GSTD Pvt(LTD) Order Report ";
        const headers = [["Order ID", "Date","Total","User ID"]];

        const data = this.state.resultArray.map(elt=> [elt.orderId, elt.oderTime,elt.itemTotal,elt.userId]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("GSTDOrderReport.pdf")
    }

    render() {
        const{resultArray, currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentUsers = resultArray.slice(firstIndex, lastIndex );
        const totalPages = Math.ceil(resultArray.length / userPerPage) ;

        return (
            <div>
                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        <NavLink exact={true} to="/order" activeClassName="activeClass">
                            <button type="button" className="btn btn-primary">Order Details</button>
                        </NavLink>

                            <button type="button" className="btn btn-primary" onClick={() => this.exportPDF()}>Export to PDF</button>



                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </MDBCardBody>
                </MDBCard>

                <MDBRow>
                    <MDBCol size="8">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCol md="4" className="searchC">
                                    <MDBFormInline className="md-form m-0">
                                        <input className="form-control form-control-sm" type="search" placeholder="Search..." aria-label="Search"/>
                                        <MDBBtn size="sm" color="primary" className="my-0" type="submit"><MDBIcon icon="search" /></MDBBtn>
                                    </MDBFormInline>
                                </MDBCol>
                                <br></br>

                                <form>
                                    <MDBTable responsive>
                                        <MDBTableHead color="primary-color" textWhite>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th>User ID</th>
                                                <th>View</th>
                                                <th>Remove</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            { currentUsers === 0 ?
                                                <tr >
                                                    <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                                        <MDBAlert color="danger" >
                                                            No Orders Available !
                                                        </MDBAlert>
                                                    </td>
                                                </tr> :

                                                currentUsers.map(item => {

                                                return (
                                                    <tr>
                                                        <td>{item.orderId}</td>
                                                        <td>{item.oderTime}</td>
                                                        <td>{item.itemTotal}</td>
                                                        <td>{item.userId}</td>
                                                        <td>
                                                            <MDBBtn tag="a" size="sm" color="success"  onClick={()=>this.viewItem(item.orderId)}>
                                                                <MDBIcon size="lg" icon="pen" />
                                                            </MDBBtn>&nbsp;&nbsp;&nbsp;
                                                        </td>
                                                        <td>
                                                            <MDBBtn tag="a" size="sm" color="danger" onClick={()=>this.deleteItem(item.orderId)}>
                                                                <MDBIcon size="lg" icon="times-circle" />
                                                            </MDBBtn>
                                                        </td>
                                                    </tr>
                                                )




                                            })}

                                        </MDBTableBody>
                                    </MDBTable>
                                    {/*<MDBPagination circle className="justify-content-center">*/}
                                    {/*    <MDBPageItem disabled>*/}
                                    {/*        <MDBPageNav className="page-link" aria-label="Previous">*/}
                                    {/*            <span aria-hidden="true">&laquo;</span>*/}
                                    {/*            <span className="sr-only">Previous</span>*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem active >*/}
                                    {/*        <MDBPageNav className="page-link primary-color" >*/}
                                    {/*            1 <span className="sr-only " >(current)</span>*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem>*/}
                                    {/*        <MDBPageNav className="page-link">*/}
                                    {/*            2*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem>*/}
                                    {/*        <MDBPageNav className="page-link">*/}
                                    {/*            3*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem>*/}
                                    {/*        <MDBPageNav className="page-link">*/}
                                    {/*            4*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem>*/}
                                    {/*        <MDBPageNav className="page-link">*/}
                                    {/*            5*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*    <MDBPageItem>*/}
                                    {/*        <MDBPageNav className="page-link">*/}
                                    {/*            &raquo;*/}
                                    {/*        </MDBPageNav>*/}
                                    {/*    </MDBPageItem>*/}
                                    {/*</MDBPagination>*/}

                                    <div style={{"float" : "left" , "color" : "#007bff"}}> Showing Page {currentPage} of {totalPages} </div>
                                    <div style={{"float" : "right" }}>
                                        <InputGroup>
                                            <InputGroup.Prepend></InputGroup.Prepend>
                                            <MDBBtnGroup>
                                                <MDBBtn color="primary" size="sm" disabled={currentPage === 1 ? true : false}  onClick={this.firstPage}>First</MDBBtn>
                                                <MDBBtn color="primary" size="sm" disabled={currentPage === 1 ? true : false} onClick={this.prevPage} >Prev</MDBBtn>
                                            </MDBBtnGroup>
                                            {/*<FormControl className="pageNumCss" ></FormControl>*/}
                                            <input type="text" className="pageNumCss" name="currentPage" value={currentPage} onChange={this.changePage} disabled/>
                                            <InputGroup.Append>
                                                <MDBBtnGroup>
                                                    <MDBBtn color="primary" size="sm" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>Next</MDBBtn>
                                                    <MDBBtn color="primary" size="sm" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>Last</MDBBtn>
                                                </MDBBtnGroup>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="4">
                        <MDBCard>
                            <MDBCardBody>
                                <p className="h4 text-center py-1">Order Details</p>
                                <label htmlFor="defaultFormCardNameEx1" className="grey-text font-weight-light">Order ID</label>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                              <i className="fa fa-table prefix"></i>
                                            </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Order ID"
                                        aria-label="Name"
                                        aria-describedby="basic-addon"
                                        value={this.state.selectedId}

                                    /></div>
                                <MDBTable responsive>
                                    <MDBTableHead color="grey-color" textBlack>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Price</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                {this.state.item.map(item => {

                                    return (


                                        <tr>
                                            <td>{item.itemName}</td>
                                            <td>{item.itemPrice}</td>

                                        </tr>




                                    )})}
                                    </MDBTableBody>
                                </MDBTable>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/*<MDBContainer>*/}
                    {/*    <MDBRow>*/}
                    {/*       */}
                    {/*    </MDBRow>*/}
                    {/*</MDBContainer>*/}




                </MDBRow>

            </div>
        );
    }
}

export default OrderTable;