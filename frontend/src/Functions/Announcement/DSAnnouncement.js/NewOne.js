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
    MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBAlert, MDBPagination, MDBPageItem, MDBPageNav, MDBInput,
} from 'mdbreact';
// import './UserManage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";
import axios from "axios";
import {InputGroup} from 'react-bootstrap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StockPriceTableBody from "./StockPriceTableBody";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";



export default class ItemTable extends Component {

    constructor(props) {
        super(props);


        this.state = {
            itemsCL: [],
            empty: false,
            ItemColourId: [],
            suppliers: [],
            selectedSupplierObject: '',
            selectedSupplierObjectValidation: '',
            selectedEmailObject: '',
            selectedEmailObjectValidation: '',
            selectedId:'',
            order: [],
            orderItem:'',
            quantity: 0,
            quantityValidation: false,
            supplier: '',
            email: '',
            currentQuantity: '',
            size: '',
            color: '',
            itemName: '',
            currentPage: 1,
            userPerPage: 5,

        }

        this.getAllItemsCL = this.getAllItemsCL.bind(this);
        this.getAllSuppliers = this.getAllSuppliers.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeGetCompanyName = this.onChangeGetCompanyName.bind(this);
        this.onChangeGetEmail = this.onChangeGetEmail.bind(this);
        this.viewItem = this.viewItem.bind(this);
        this.sendMail=this.sendMail.bind(this);
        this.getAllItemsCL();
        this.getAllSuppliers();

        this.changePage = this.changePage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("userLogged") !== "userLogged") {
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
        console.log("ssss:"+this.state.suppliers);
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

        if(this.state.currentPage < Math.ceil(this.state.ItemColourId.length / this.state.userPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }

    }

    lastPage(){

        if(this.state.currentPage < Math.ceil(this.state.ItemColourId.length / this.state.userPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.ItemColourId.length / this.state.userPerPage)
            })
        }

    }

    // getAllItemsCL() {
    //     console.log("Inside of itemCL method");
    //     axios.get(constants.backend_url + 'api/itemcolor/getAllItemColors').then(response => {
    //         this.setState({itemsCL: response.data});
    //         console.log("Inside Inside of itemCL method");
    //         // console.log(this.state.itemsCL);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    //     console.log("ddddddd:"+this.state.itemsCL);
    //     console.log(this.state.itemsCL);
    // }/getItemColorDetail/:id'

    viewItem(id){
        console.log("iii:"+id)
        axios.get(constants.backend_url + 'api/itemcolor/viewStocks/'+id).then(response => {
            this.setState(
                {
                    order: response.data,
                    orderItem:response.data
                }
                );

        }).catch(function (error) {
            console.log(error);
        })
        console.log("ffffffff:");
        console.log(this.state.order);
        console.log("cccccccccc:"+this.state.currentQuantity);
    }

    getAllItemsCL() {
        axios.get(constants.backend_url + 'api/itemcolor/getAllItemColors').then(response => {
            this.setState({ItemColourId: response.data});
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        })
        console.log(this.state.ItemColourId);

    }

    onChangeGetCompanyName(value) {

        console.log(value);
        this.state.selectedSupplierObject = value;
        this.setState({
            selectedSupplierObject: this.state.selectedSupplierObject,
            selectedSupplierObjectValidation: false
        });
        console.log("weeeee:")
        //console.log(this.state.selectedSupplierObject);
    }
    onChangeGetEmail(value) {
        // console.log(value);
        this.state.selectedEmailObject = value;
        this.setState({
            selectedEmailObject: this.state.selectedEmailObject,
            selectedEmailObjectValidation: false
        });
        console.log("emaillllll:"+this.state.selectedEmailObject);
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value,
            quantityValidation: false
        });

    }

    sendMail(supplier,email,newQuantity,itemSize,itemColor,itemName){
        console.log(this.state.selectedSupplierObject.companyName);
        console.log(this.state.selectedEmailObject.email);
        console.log("email:"+this.state.email);
        console.log("email:"+email);
        console.log("supplier:"+supplier);
        console.log("newQuantity:"+newQuantity);
        console.log("itemSize:"+itemSize);
        console.log("itemColor:"+itemColor);
        console.log("itemName:"+itemName);

        axios.get(constants.spring_backend_url + '/supplierController/sendMail/'+supplier+'/'+email+'/'+newQuantity+'/'+itemSize+'/'+itemName).then(response => {

            if(response.data==true){
                console.log("succ");
                Swal.fire(
                    '',
                    'Email Sent successfully ',
                    'success'
                )
                return true;
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        // const {itemsCL} = this.props;
        // const itemsArr = this.state.ItemColourId;
        // let itemsArr = this.state.itemsCL || {};
        // const itemsArr = this.state.itemsCL;
        // console.log("aaaaa:"+itemsArr);
        const{ItemColourId, currentPage, userPerPage} = this.state;
        const lastIndex = currentPage * userPerPage;
        const firstIndex = lastIndex - userPerPage;
        const currentitemsArr = ItemColourId.slice(firstIndex, lastIndex );
        const totalPages = Math.ceil(ItemColourId.length / userPerPage) ;

        return (

            <div>

                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        <NavLink exact={true} to="/stock/stockanalysis">
                            <button type="button" className="btn btn-primary">Items</button>
                        </NavLink>
                        <NavLink exact={true} to="/stock/stockmanage" activeClassName="activeClass">
                            <button type="button" className="btn btn-success ">Stock Details</button>
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

                <MDBRow>
                <MDBCard className="card">
                    <MDBCardBody>
                        <MDBTable responsive>
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>Item Code</th>
                                    <th>Item Name</th>
                                    <th>Size</th>
                                    <th>Colour</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>

                                </tr>

                            </MDBTableHead>
                            {
                                currentitemsArr.length === 0 ?
                                    <tr>
                                        <td colSpan="12" style={{textAlign: "center", fontWeight: "bold"}}>
                                            <MDBAlert color="danger">
                                                No Items
                                            </MDBAlert>
                                        </td>
                                    </tr> :
                                    currentitemsArr.map(itm => {
                                        console.log("Item");
                                        console.log(itm)
                                        console.log("Item");
                                        return (
                                            <MDBTableBody>
                                                <tr>
                                                    <td>{itm.itemCode[0].itemCode}</td>
                                                    <td>{itm.itemCode[0].itemName}</td>
                                                    <td>{itm.itemSize}</td>
                                                    <td>
                                                        <label
                                                            style={{backgroundColor: itm.itemColor,width :70,height :30}}/>
                                                    </td>
                                                    <td>{itm.quantity}</td>
                                                    <td>{itm.price}</td>
                                                    <td>
                                                        <MDBBtn tag="a" size="sm" color="success"  onClick={()=>this.viewItem(itm._id)}>
                                                            <MDBIcon size="lg" icon="pen" />
                                                        </MDBBtn>&nbsp;&nbsp;&nbsp;
                                                    </td>

                                                </tr>
                                            </MDBTableBody>
                                        )
                                    })}
                        </MDBTable>
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
                    </MDBCardBody>
                </MDBCard>

                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            {/*<form onSubmit={this.sendMail}>*/}
                            <p className="h4 text-center py-1">Supplier Order Details</p>

                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.suppliers}
                                getOptionLabel={(option) => option.companyName}
                                style={{width: 300}}
                                onChange={(event, value) => this.onChangeGetCompanyName(value)}
                                renderInput={(params) => <TextField {...params}
                                                                    label="Supplier"/>}
                                size="sm"
                            /><br/>
                            {
                                this.state.selectedSupplierObjectValidation ?
                                    <MDBAlert color="danger">
                                        Supplier Field Is Empty
                                    </MDBAlert> : ''
                            }
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.suppliers}
                                getOptionLabel={(option) => option.email}
                                style={{width: 300}}
                                onChange={(event, value) => this.onChangeGetEmail(value)}
                                renderInput={(params) => <TextField {...params}
                                                                    label="Email"/>}
                                size="sm"
                            /><br/>
                            {
                                this.state.selectedEmailObjectValidation ?
                                    <MDBAlert color="danger">
                                        Email Field Is Empty
                                    </MDBAlert> : ''
                            }
                            <label htmlFor="defaultFormCardNameEx1" className="grey-text font-weight-light">New Quantity</label>
                            <MDBInput size="sm"
                                      pattern="[0-9]*"
                                      value={this.state.quantity}
                                      onChange={this.onChangeQuantity}

                            /><br/>
                            {
                                this.state.quantityValidation ? <MDBAlert color="danger">
                                    Quantity Field Is Empty
                                </MDBAlert> : ''
                            }

                            {/*<div className="input-group">*/}
                                {/*<div className="input-group-prepend">*/}
                                            {/*<span className="input-group-text" id="basic-addon">*/}
                                              {/*<i className="fa fa-table prefix"></i>*/}
                                            {/*</span>*/}
                                {/*</div>*/}
                                {/*<input*/}
                                    {/*type="text"*/}
                                    {/*className="form-control"*/}
                                    {/*aria-label="Name"*/}
                                    {/*aria-describedby="basic-addon"*/}
                                    {/*value={this.state.quantity}*/}

                                {/*/></div>*/}

                            <MDBTable responsive>
                                <MDBTableHead color="grey-color" textBlack>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Size</th>
                                        <th>Colour</th>
                                        <th>Quantity</th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                    {this.state.order.map(orders => {

                                        console.log("ordersss");
                                        console.log(orders)
                                        console.log("orders");

                                        return (


                                            <tr>
                                                <td>{orders.itemCode[0].itemName}</td>
                                                <td>{orders.itemSize}</td>
                                                <br/><label
                                                    style={{backgroundColor: orders.itemColor,width :40,height :20}}/>
                                                <td>{orders.quantity}</td>
                                            </tr>




                                        )})}
                                </MDBTableBody>
                            </MDBTable><br/>

                            <MDBBtn type="submit" onClick={()=>this.sendMail(this.state.selectedSupplierObject.companyName,this.state.selectedEmailObject.email,this.state.quantity,this.state.order[0].itemSize,
                                this.state.order[0].itemColor,this.state.order[0].itemCode[0].itemName)} >Submit</MDBBtn>
                            {/*</form>*/}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>

            </div>
        );
    }
}