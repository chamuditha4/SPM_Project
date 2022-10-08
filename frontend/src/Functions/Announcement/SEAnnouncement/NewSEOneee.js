import React, {Component} from "react";
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol, MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdbreact";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import uuid from "react-uuid";
import {NavLink} from "react-router-dom";
import constants from "../../../constants/constants";

export class NewArrivals extends Component {

    constructor(props) {
        super(props);
        this.getAllItemCodes = this.getAllItemCodes.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.deletenewArrailavls = this.deletenewArrailavls.bind(this);
        this.getAllNewArrailItems = this.getAllNewArrailItems.bind(this);
        this.deletenewArrailavlItem = this.deletenewArrailavlItem.bind(this);

        this.state = {
            itemCodes: [],
            itemCodeObject: ' ',
            itemCodeObjectValidation: false,
            newArraivalItemArray: [],
            newItemCodeArray: [],
            noItem :true,
            newArraivalId : uuid(),
            newArraivalItems :[],
            newArrailvaItemStatus :true
        }
    }

    componentDidMount() {
        this.getAllItemCodes();
        this.getAllNewArrailItems();
        if(localStorage.getItem("userLogged")!=="userLogged"){
            this.props.history.push('/');
        }
    }

    getAllItemCodes() {
        axios.get(constants.backend_url + 'api/item/getAllItems').then(response => {
            this.setState({itemCodes: response.data});
            console.log("OOOOOOOOOOOOOOO")
            console.log(response.data)
            console.log("OOOOOOOOOOOOOOO")

        }).catch(function (error) {
            console.log(error);
        })
    }


    deletenewArrailavlItem(_id) {
        console.log(_id)
        this.sweetalertfunction(_id);
    }

    delete(_id){

    }
    getAllNewArrailItems() {
        console.log('KKKKK')
        axios.get(constants.backend_url + 'api/itemcolor/getAllNewArraivalItems').then(response => {
            console.log(response.data)
            this.setState({
                newArraivalItems: response.data,
                newArrailvaItemStatus :false
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    sweetalertfunction(_id) {
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
                axios.delete(constants.backend_url + 'api/itemcolor/deleteNewArraivalItems/'+_id)
                    .then(response=>{
                        if (response.data.delete === 'success') {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'NewArrival Item is deleted.',
                                'success'
                            )
                            this.getAllNewArrailItems();
                        }else{
                            swalWithBootstrapButtons.fire(
                                'Cancelled',
                                'NewArrival details not deleted',
                                'error'
                            )
                        }

                    })
                    .catch(err => console.log(err))

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



    saveDetails(e) {
        e.preventDefault();
        if (this.state.newItemCodeArray.length !== 0) {
            axios.post(constants.backend_url + 'api/item/addNewArraivalItems', this.state.newItemCodeArray)
                .then(res => {
                        console.log(res);
                        if (res.data.newArrival === 'success') {
                            Swal.fire(
                                '',
                                'Item Details Added Success.',
                                'success'
                            );
                            this.setState({
                               newItemCodeArray :[],
                                itemCodeObject: ' ',
                                newArraivalItemArray: [],
                                noItem :true
                            })
                            this.getAllNewArrailItems();
                        } else {
                            Swal.fire(
                                '',
                                'Item Added Faild',
                                'error'
                            )
                        }
                    }
                )
        } else {
            Swal.fire(
                '',
                'Table Is Empty Please Add Items To Table',
                'error'
            )
        }

    }


    onChangeGetItemCode(value) {
        if(value !==null){
            this.state.itemCodeObject = value;
            const newArraivalItem = {
                itemCode: value.itemCode,
                itemName: value.itemName,
                newArraivalId: uuid(),
            }

            const newItemCodeObj = {
                itemCode: value,

            }
            const array = [newArraivalItem, ...this.state.newArraivalItemArray];
            const array2 = [newItemCodeObj, ...this.state.newItemCodeArray];

            this.setState({
                itemCodeObject: this.state.itemCodeObject,
                itemCodeObjectValidation: false,
                newArraivalItemArray: array,
                newItemCodeArray: array2,
                noItem :false,
                newArraivalId: uuid(),
            });
        }

    }

    deletenewArrailavls(id){
        const notDeletedItems = this.state.newArraivalItemArray.filter(item => item.newArraivalId !== id);
        // const notDeletedItems2 = this.state.newItemCodeArray.filter(item => item.newArraivalId !== id);

        this.setState({
            newItemCodeArray: notDeletedItems,
            newArraivalItemArray: notDeletedItems,
            newArraivalId: id
            }
        )
        if (notDeletedItems.length === 0) {
            this.setState({
                noItem: true
            })
        }
    }

    render() {
        return (
            <div >

                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        {
                            localStorage.getItem("Position") === "StoreManager" ?
                                <NavLink exact={true} to="/item/newarraivalitems">
                                    <button type="button" className="btn btn-primary "> New Arrivals</button>

                                </NavLink>
                                : ''
                        }
                        {
                            localStorage.getItem("Position") === "StoreManager" ?
                                <NavLink exact={true} to="/item/itemcolor">
                                    <button type="button" className="btn btn-success"> ItemColor</button>
                                </NavLink>
                                : ''
                        }

                        {
                            localStorage.getItem("Position") === "StoreManager" ?
                                <NavLink exact={true} to="/item" activeClassName="activeClass">
                                    <button type="button" className="btn btn-success">New Item</button>
                                </NavLink>
                                : ''
                        }


                        {
                            localStorage.getItem("Position") === "Admin" ?
                                <NavLink exact={true} to="/item/brandcategory">
                                    <button type="button" className="btn btn-success"> Brand & Category</button>
                                </NavLink>
                                :
                                ''
                        }
                        {
                            localStorage.getItem("Position") === "StoreManager" ?
                                <NavLink exact={true} to="/item/discount">
                                    <button type="button" className="btn btn-success">Discount</button>
                                </NavLink>
                                : ''
                        }
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
                    <MDBCol size="8">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Add New Arrivals</MDBCardTitle>

                                <MDBCol size="5">
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.itemCodes}
                                        getOptionLabel={(option) => option.itemCode}
                                        style={{width: 300}}
                                        onChange={(event, value) => this.onChangeGetItemCode(value)}
                                        renderInput={(params) => <TextField {...params} label="Item Code"/>}
                                    />
                                    {
                                        this.state.itemCodeObjectValidation ?
                                            <MDBAlert color="danger">
                                                Item Code Field Is Empty
                                            </MDBAlert> : ''
                                    }
                                </MDBCol>
                                <br/>


                                <br/>
                                <br/>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBTable>
                                            <MDBTableHead color="primary-color" textWhite>
                                                <tr>
                                                    <th>Item Code</th>
                                                    <th>Item Name</th>

                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {
                                                        this.state.noItem ?
                                                            <tr >
                                                                <td colSpan="2">
                                                                    <MDBAlert color="danger" >
                                                                        No Items In List
                                                                    </MDBAlert>
                                                                </td>
                                                            </tr>
                                                            :

                                                    this.state.newArraivalItemArray.map(newItem => {
                                                        return (
                                                            <tr key={newItem.newArraivalId}>
                                                                <td>{newItem.itemCode}</td>
                                                                <td>{newItem.itemName}</td>
                                                                <MDBBtn tag="a" size="sm" color="danger"
                                                                        onClick={()=>this.deletenewArrailavls(newItem.newArraivalId)}>
                                                                    <MDBIcon size="lg" icon="times-circle"/>
                                                                </MDBBtn>

                                                            </tr>
                                                        )
                                                    })
                                                }


                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCol>


                                </MDBRow>
                                <MDBRow>
                                    <form onSubmit={this.saveDetails}>
                                        <MDBCol size="4">
                                            <MDBBtn type="submit">Save</MDBBtn>
                                        </MDBCol>
                                    </form>

                                </MDBRow>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>


                </MDBRow>
        <br/>
        <br/>
                <MDBRow>
                    <MDBCol size="8">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Delete New Arrivals</MDBCardTitle>

                                <br/>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBTable>
                                            <MDBTableHead color="primary-color" textWhite>
                                                <tr>
                                                    <th>Item Code</th>
                                                    <th>Item Name</th>

                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {
                                                    this.state.newArrailvaItemStatus ?
                                                        <tr >
                                                            <td colSpan="2">
                                                                <MDBAlert color="danger" >
                                                                    No Items In List
                                                                </MDBAlert>
                                                            </td>
                                                        </tr>
                                                        :

                                                        this.state.newArraivalItems.map(newItem => {
                                                            return (
                                                                <tr key={newItem._id}>
                                                                    <td>{newItem.itemCode[0].itemCode}</td>
                                                                    <td>{newItem.itemCode[0].itemName}</td>
                                                                    <MDBBtn tag="a" size="sm" color="danger"
                                                                            onClick={()=>this.deletenewArrailavlItem(newItem._id)}>
                                                                        <MDBIcon size="lg" icon="times-circle"/>
                                                                    </MDBBtn>

                                                                </tr>
                                                            )
                                                        })
                                                }


                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCol>
                                </MDBRow>


                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>


                </MDBRow>


            </div>
        );
    }

}