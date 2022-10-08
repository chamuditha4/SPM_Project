import React, {Component} from 'react';
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardTitle, MDBCol,
    MDBIcon, MDBListGroup,
    MDBListGroupItem, MDBRow
} from "mdbreact";
import {NavLink} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../../../constants/constants";


export class Item extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            brands: [],
            itemCode: ' ',
            itemCodeValidation: false,
            itemName: ' ',
            itemNameValidation: false,
            onChangeItemName: ' ',
            itemDescription: '',
            itemDescriptionValidation: false,
            image: ' ',
            imageURL: ' ',
            imageURLValidation: false,
            selectedBrandObject: ' ',
            selectedBrandObjectValidation: false,
            selectedCharacterObject: ' ',
            selectedCharacterObjectValidation: false,
            imageValidation: false,
            brandCategory_Id: '',
            itemDiscountValidation :false,
            itemDiscount :0,
            itemDiscountIncreaseValidation :false
        }


        this.onChangeGetBrandName = this.onChangeGetBrandName.bind(this);
        this.onChangeGetCategoryName = this.onChangeGetCategoryName.bind(this);
        this.getAllBrands = this.getAllBrands.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.onChangeItemCode = this.onChangeItemCode.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
        this.itemOnSubmit = this.itemOnSubmit.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);


    }


    componentDidMount() {
        this.getAllBrands();
        this.getAllCategories();
        if (localStorage.getItem("userLogged") !== "userLogged") {
            this.props.history.push('/');
        }
        if (localStorage.getItem("Position") === "Admin") {
            this.props.history.push('item/brandcategory');
        }
    }

    onChangeItemDescription(e) {
        this.setState({
            itemDescription: e.target.value,
            itemDescriptionValidation: false
        });
    }

    onchangeFile(e) {

        this.setState({
            image: e.target.files[0],
            imageUrl: URL.createObjectURL(e.target.files[0]),
            imageURLValidation: true,
            imageValidation: false
        })

    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageValidation: false
        })

    }

    // getBrandDetailsId(){
    //     axios.get(constants.backend_url + 'api/brand/getAllBrands').then(response => {
    //         this.setState({brands: response.data});
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    // }
    getBrandDetailsId(_id, _id2) {

    }

    itemOnSubmit(e) {
        e.preventDefault();

        if (this.state.itemCode !== ' ') {
            if (this.state.selectedBrandObject !== ' ') {
                if (this.state.itemName !== ' ') {
                    if (this.state.selectedCharacterObject !== ' ') {
                        if (this.state.itemDescription !== ' ') {

                            // this.getBrandDetailsId(this.state.selectedBrandObject._id, this.state.selectedCharacterObject._id);

                            axios.get(constants.backend_url + 'api/brandcategory/getBrandCategoryId/' + this.state.selectedBrandObject._id + '/' + this.state.selectedCharacterObject._id).then(response => {
                                // console.log(response.data);
                                //
                                // this.setState({brandCategory_Id: response.data});
                                const newItem = {
                                    itemCode: this.state.itemCode,
                                    brandCategoryId: response.data,
                                    itemName: this.state.itemName,
                                    description: this.state.itemDescription,
                                    discount: this.state.itemDiscount
                                }
                                axios.post(constants.backend_url + 'api/item/add', newItem)
                                    .then(res => {
                                            console.log(res);
                                            if (res.data.item === 'success') {
                                                Swal.fire(
                                                    '',
                                                    'Item Details Added Success.',
                                                    'success'
                                                );
                                                this.setState({
                                                    itemCode: ' ',
                                                    itemName: ' ',
                                                    itemDescription: ' ',
                                                    brandCode: ' ',
                                                    categoryCode: ' '
                                                })
                                                this.getAllCategories();
                                                this.getAllBrands();
                                            } else {
                                                Swal.fire(
                                                    '',
                                                    'Item Added Faild',
                                                    'error'
                                                )
                                            }
                                        }
                                    )

                            }).catch(function (error) {
                                console.log(error);
                            })

                        } else {
                            this.setState({
                                itemDescriptionValidation: true
                            })
                        }
                    } else {
                        this.setState({
                            selectedCharacterObjectValidation: true
                        })
                    }
                } else {
                    this.setState({
                        itemNameValidation: true
                    })
                }
            } else {
                this.setState({
                    selectedBrandObjectValidation: true
                })
            }
        } else {
            this.setState({
                itemCodeValidation: true
            })
        }


    }

    getAllBrands() {
        axios.get(constants.backend_url + 'api/brand/getAllBrands').then(response => {
            this.setState({brands: response.data});
        }).catch(function (error) {
            console.log(error);
        })
    }

    onChangeGetBrandName(value) {
        this.state.selectedBrandObject = value;
        this.setState({
            selectedBrandObject: this.state.selectedBrandObject,
            selectedBrandObjectValidation: false
        });
    }

    onChangeGetCategoryName(value) {
        this.setState({
            selectedCharacterObject: value,
            selectedCharacterObjectValidation: false
        });
    }

    getAllCategories() {

        axios.get(constants.backend_url + 'api/category/getAllCategories').then(response => {
            console.log(response.data);
            this.setState({categories: response.data});
        }).catch(function (error) {
            console.log(error);
        })

        console.log(this.state.categories);
    }

    onChangeItemCode(e) {
        this.setState({
            itemCode: e.target.value,
            itemCodeValidation: false
        });
    }
    onChangeDiscount(e) {
        if(e.target.value >=0 &&  e.target.value<=100){
            this.setState({
                itemDiscount: e.target.value,
                itemDiscountValidation: false,
                itemDiscountIncreaseValidation :false
            });
        }else{
            this.setState({
                itemDiscount: 0,
                itemDiscountIncreaseValidation: true
            });
        }
    }



    onChangeItemName(e) {
        this.setState({
            itemName: e.target.value,
            itemNameValidation: false
        })
    }

    render() {
        return (
            <div>
                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        {
                            localStorage.getItem("Position") === "StoreManager" ?
                                <NavLink exact={true} to="/item" activeClassName="activeClass">
                                    <button type="button" className="btn btn-primary">New Item</button>
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
                                <NavLink exact={true} to="/item/newarraivalitems">
                                    <button type="button" className="btn btn-success"> New Arrivals</button>

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
                                <MDBCardTitle>Add New Item</MDBCardTitle>
                                <form onSubmit={this.itemOnSubmit}>
                                    <MDBRow>
                                        <MDBCol size="5">
                                            <TextField id="standard-basic" label="Item Code"
                                                       value={this.state.itemCode}
                                                       onChange={this.onChangeItemCode}
                                            />
                                            <br/>
                                            {

                                                this.state.itemCodeValidation ?
                                                    <MDBAlert color="danger">
                                                        Item Code Field Is Empty
                                                    </MDBAlert> : ''
                                            }
                                        </MDBCol>
                                        <MDBCol size="4">
                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={this.state.brands}
                                                getOptionLabel={(option) => option.brandName}
                                                style={{width: 300}}
                                                onChange={(event, value) => this.onChangeGetBrandName(value)}
                                                renderInput={(params) => <TextField {...params} label="Brand Name"/>}
                                                size="sm"
                                            />
                                            {
                                                this.state.selectedBrandObjectValidation ? <MDBAlert color="danger">
                                                    Brand Name Field Is Empty
                                                </MDBAlert> : ''
                                            }
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol size="5">
                                            <TextField id="standard-basic" label="Item Name"
                                                       value={this.state.itemName}
                                                       onChange={this.onChangeItemName}
                                            />

                                            {
                                                this.state.itemNameValidation ? <MDBAlert color="danger">
                                                    Item Name Field Is Empty
                                                </MDBAlert> : ''
                                            }
                                        </MDBCol>
                                        <MDBCol size="6">
                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={this.state.categories}
                                                getOptionLabel={(option) => option.categoryName}
                                                style={{width: 300}}
                                                onChange={(event, value) => this.onChangeGetCategoryName(value)}
                                                renderInput={(params) => <TextField {...params} label="Category Name"/>}
                                                size="sm"
                                            />

                                            {
                                                this.state.selectedCharacterObjectValidation ? <MDBAlert color="danger">
                                                    Category Name Field Is Empty
                                                </MDBAlert> : ''
                                            }
                                        </MDBCol>

                                    </MDBRow>

                                    <br/>
                                    <MDBRow>
                                        <MDBCol size="5">
                                            <TextField id="standard-basic" label="Item Discount"
                                                       value={this.state.itemDiscount}
                                                       onChange={this.onChangeDiscount}
                                            />

                                            {
                                                this.state.itemDiscountValidation ? <MDBAlert color="danger">
                                                    Item Discount Field Is Empty
                                                </MDBAlert> : ''
                                            }
                                            {
                                                this.state.itemDiscountIncreaseValidation ? <MDBAlert color="danger">
                                                    Item Discount Is greter than 100
                                                </MDBAlert> : ''
                                            }

                                        </MDBCol>


                                    </MDBRow>

                                    <br/>
                                    <MDBRow>
                                        <MDBCol size="9">
                                            <div className="form-group">
                                                <label htmlFor="descriptionItem">Description</label>
                                                <textarea className="form-control rounded-0" id="descriptionItem"
                                                          rows="3"
                                                          value={this.state.itemDescription}
                                                          onChange={this.onChangeItemDescription}
                                                />
                                            </div>
                                            {
                                                this.state.itemDescriptionValidation ?

                                                    <MDBAlert color="danger">
                                                        Description Name Field Is Empty
                                                    </MDBAlert> : ''
                                            }

                                        </MDBCol>
                                    </MDBRow>

                                    <br/>
                                    <MDBRow>
                                        <MDBCol size="4">
                                            <MDBBtn type="submit">Save</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                    <MDBCol size="4">


                    </MDBCol>
                </MDBRow>
            </div>
        );
    }

}


