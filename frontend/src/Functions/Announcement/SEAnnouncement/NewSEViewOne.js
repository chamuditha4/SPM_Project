import React, {Component} from "react";
import './Style/Item.css'
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBInput,
    MDBRow, MDBTable,
    MDBTableHead
} from "mdbreact";

import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BrandCategoryTableBody from "./BrandCategoryTableBody";
import uuid from 'react-uuid';
import {NavLink} from "react-router-dom";
import constants from "../../../constants/constants";
export default class BrandCategory extends Component {

    constructor(props) {
        super(props);


        this.state = {
            brandName: ' ',
            brandNameValidation: false,
            brandCode: ' ',
            brandCodeValidation: false,
            discount: 0,
            brandDiscountValidation: false,
            categoryName: ' ',
            categoryCode: ' ',
            categoryNameValidation: false,
            categoryCodeValidation: false,
            categories: [],
            brands: [],
            brandValue: ' ',
            selectedBrandObject: ' ',
            selectedCharacterObject: ' ',
            brandCategoryArray: [],
            noItem: true,
            selectedCharacterObjectValidation: false,
            selectedBrandObjectValidation: false,
            brandCategoryIdArray: [],
            brandCategoryId : uuid()

        }

        this.onChangeBrandCode = this.onChangeBrandCode.bind(this);
        this.onChangeBrandName = this.onChangeBrandName.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmitbBrands = this.onSubmitbBrands.bind(this);
        this.onChangeCategoryCode = this.onChangeCategoryCode.bind(this);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmitCategory = this.onSubmitCategory.bind(this);
        this.getAllBrands = this.getAllBrands.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.onChangeGetBrandName = this.onChangeGetBrandName.bind(this);
        this.onChangeGetCategoryName = this.onChangeGetCategoryName.bind(this);
        this.addDetailsToTable = this.addDetailsToTable.bind(this);
        this.submitBrandsAndCategory = this.submitBrandsAndCategory.bind(this);
        this.deleteBrandCategory = this.deleteBrandCategory.bind(this);


    }

    componentDidMount() {
        this.getAllBrands();
        this.getAllCategories();
        if(localStorage.getItem("userLogged")!=="userLogged"){
            this.props.history.push('/');
        }
    }

    onChangeCategoryCode(e) {
        this.setState({
            categoryCode: e.target.value,
            categoryCodeValidation: false

        })
    }

    onChangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value,
            categoryNameValidation: false
        })
    }

    onChangeBrandName(e) {
        this.setState({
            brandName: e.target.value,
            brandNameValidation: false
        });
    }

    onChangeBrandCode(e) {
        this.setState({
            brandCode: e.target.value,
            brandCodeValidation: false

        });
    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value,
            brandDiscountValidation: false
        });
    }

    onSubmitCategory(e) {
        e.preventDefault();
        if (this.state.categoryName !== ' ') {
            if (this.state.categoryCode !== ' ') {
                const newCategory = {
                    categoryName: this.state.categoryName,
                    categoryCode: this.state.categoryCode
                }
                axios.post(constants.backend_url + 'api/category/add', newCategory)
                    .then(res => {

                            if (res.data.category === 'success') {
                                Swal.fire(
                                    '',
                                    'Category Details Added Success.',
                                    'success'
                                );
                                this.setState({
                                    categoryName: ' ',
                                    categoryCode: ' '
                                })
                                this.getAllCategories();
                            } else {
                                Swal.fire(
                                    '',
                                    'Category Added Faild',
                                    'error'
                                )
                            }
                        }
                    );

            } else {
                this.setState({
                    categoryCodeValidation: true
                })
            }
        } else {
            this.setState({
                categoryNameValidation: true
            })
        }
    }


    onSubmitbBrands(e) {
        e.preventDefault();
        if (this.state.brandName !== ' ') {
            if (this.state.brandCode !== ' ') {
                // if (this.state.brandDiscountValidation !== ' ') {
                    const newBrand = {
                        brandCode: this.state.brandCode,
                        brandName: this.state.brandName,
                        sellingDiscount: this.state.discount,
                    }
                    axios.post(constants.backend_url + 'api/brand/add', newBrand)
                        .then(res => {

                                if (res.data.brand === 'success') {
                                    Swal.fire(
                                        '',
                                        'Brand Details Added Success.',
                                        'success'
                                    );
                                    this.setState({
                                        brandName: ' ',
                                        brandCode: ' ',
                                        discount: 0
                                    })
                                    this.getAllBrands();

                                } else {
                                    Swal.fire(
                                        '',
                                        'Brand Added Faild)',
                                        'error'
                                    )
                                }
                            }
                        );
                // } else {
                //     this.setState({
                //         brandDiscountValidation: true
                //     })
                // }
            } else {
                this.setState({
                    brandCodeValidation: true
                })
            }
        } else {
            this.setState({
                brandNameValidation: true
            })
        }

    }

    submitBrandsAndCategory(e) {
        e.preventDefault();
        if (this.state.brandCategoryArray.length !== 0) {
            this.state.brandCategoryArray.map(item => {
                const brandCategoryObj = {
                    brandCode: item.brand,
                    categoryCode: item.category,
                }
                this.state.brandCategoryIdArray.push(brandCategoryObj);
            });
            axios.post(constants.backend_url + 'api/brandcategory/add', this.state.brandCategoryIdArray)
                .then(res => {

                        if (res.data.brandCategory === 'success') {
                            Swal.fire(
                                '',
                                'Brand Category Details Added Success.',
                                'success'
                            );
                            this.setState({
                                brandCategoryIdArray: ' ',
                                brandCategoryArray :'',
                                noItem:true
                            })
                            this.getAllCategories();
                            this.getAllBrands();
                        } else {
                            Swal.fire(
                                '',
                                'Category Added Faild',
                                'error'
                            )
                        }
                    }
                );
        } else {
            Swal.fire(
                '',
                'Table is Empty Please Add Items To Table',
                'error'
            )
        }
    }

    addDetailsToTable(e) {

        e.preventDefault();
        if (this.state.selectedBrandObject !== ' ') {
            if (this.state.selectedCharacterObject !== ' ') {
                const newBrandCategory = {
                    category: this.state.selectedCharacterObject,
                    brand: this.state.selectedBrandObject,
                    brandCategoryId : uuid()
                }
                const array = [newBrandCategory, ...this.state.brandCategoryArray];
                this.setState({
                    brandCategoryArray: array,
                    noItem: false,
                    brandCategoryId :uuid()
                })
                this.getAllBrands();
                this.getAllCategories();

            } else {
                this.setState({
                    selectedCharacterObjectValidation: true
                })

            }
        } else {
            this.setState({
                selectedBrandObjectValidation: true
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
            this.setState({categories: response.data});
        }).catch(function (error) {
            console.log(error);
        })
    }



    deleteBrandCategory(id) {

        const notDeletedItems = this.state.brandCategoryArray.filter(item => item.brandCategoryId !== id);
        this.setState({
            brandCategoryArray: notDeletedItems,
                itemId: id
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
                            localStorage.getItem("Position") === "Admin" ?
                                <NavLink exact={true} to="/item/brandcategory">
                                    <button type="button" className="btn btn-primary"> Brand & Category</button>
                                </NavLink>
                                :
                                ''
                        }

                        {/*{*/}
                            {/*localStorage.getItem("Position") === "StoreManager" ?*/}
                                {/*<NavLink exact={true} to="/item/newarraivalitems">*/}
                                    {/*<button type="button" className="btn btn-success"> New Arrivals</button>*/}

                                {/*</NavLink>*/}
                                {/*: ''*/}
                        {/*}*/}
                        {/*{*/}
                            {/*localStorage.getItem("Position") === "StoreManager" ?*/}
                                {/*<NavLink exact={true} to="/item/itemcolor">*/}
                                    {/*<button type="button" className="btn btn-success"> ItemColor</button>*/}
                                {/*</NavLink>*/}
                                {/*: ''*/}
                        {/*}*/}
                        {/*{*/}
                            {/*localStorage.getItem("Position") === "StoreManager" ?*/}
                                {/*<NavLink exact={true} to="/item" activeClassName="activeClass">*/}
                                    {/*<button type="button" className="btn btn-success">New Item</button>*/}
                                {/*</NavLink>*/}
                                {/*: ''*/}
                        {/*}*/}

                        {/*{*/}
                            {/*localStorage.getItem("Position") === "StoreManager" ?*/}
                                {/*<NavLink exact={true} to="/item/discount">*/}
                                    {/*<button type="button" className="btn btn-primary ">Discount</button>*/}
                                {/*</NavLink>*/}
                                {/*: ''*/}
                        {/*}*/}
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
                    <MDBCol size="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Add New Brand</MDBCardTitle>
                                <form onSubmit={this.onSubmitbBrands}>
                                    <MDBInput label="Brand Name" size="sm"
                                              value={this.state.brandName}
                                              onChange={this.onChangeBrandName}
                                    />
                                    {
                                        this.state.brandNameValidation ? <MDBAlert color="danger">
                                            Brand Name Field Is Empty
                                        </MDBAlert> : ''
                                    }


                                    <MDBInput label="Brand Code" size="sm"
                                              value={this.state.brandCode}
                                              onChange={this.onChangeBrandCode}
                                    />
                                    {
                                        this.state.brandCodeValidation ? <MDBAlert color="danger">
                                            Brand Code Field Is Empty
                                        </MDBAlert> : ''
                                    }


                                    <MDBBtn type="submit">Save</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                    <MDBCol size="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Add New Category</MDBCardTitle>
                                <form onSubmit={this.onSubmitCategory}>

                                    <MDBInput label="Category Name" size="sm"
                                              value={this.state.categoryName}
                                              onChange={this.onChangeCategoryName}
                                    />
                                    {
                                        this.state.categoryNameValidation ? <MDBAlert color="danger">
                                            Category Name Field Is Empty
                                        </MDBAlert> : ''
                                    }
                                    <MDBInput label="Category Code" size="sm"
                                              value={this.state.categoryCode}
                                              onChange={this.onChangeCategoryCode}
                                    />
                                    {
                                        this.state.categoryCodeValidation ? <MDBAlert color="danger">
                                            Category Code Field Is Empty
                                        </MDBAlert> : ''
                                    }
                                    <MDBBtn type="submit">Save</MDBBtn>

                                </form>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

                <br/>
                <MDBRow>
                    <MDBCol>
                        <MDBCard size="6">
                            <MDBCardBody>
                                <MDBCardTitle>Add New Brand & Category</MDBCardTitle>
                                <form onSubmit={this.addDetailsToTable}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.brands}
                                        getOptionLabel={(option) => option.brandName}
                                        style={{width: 300}}
                                        onChange={(event, value) => this.onChangeGetBrandName(value)}
                                        renderInput={(params) => <TextField {...params} label="Brand Name"/>}
                                        size="sm"
                                    />
                                    <br/>
                                    {
                                        this.state.selectedBrandObjectValidation ? <MDBAlert color="danger">
                                            Brand Name Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.categories}
                                        getOptionLabel={(option) => option.categoryName}
                                        style={{width: 300}}
                                        onChange={(event, value) => this.onChangeGetCategoryName(value)}
                                        renderInput={(params) => <TextField {...params} label="Category Name"/>}
                                        size="sm"
                                    />
                                    <br/>
                                    {
                                        this.state.selectedCharacterObjectValidation ? <MDBAlert color="danger">
                                            Category Name Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <br/>
                                    <MDBBtn type="submit">Add</MDBBtn>
                                </form>

                                <br/>
                                <br/>
                                <MDBTable>
                                    <MDBTableHead color="primary-color" textWhite>
                                        <tr>
                                            <th>Brand Name</th>
                                            <th>Category Name</th>

                                        </tr>
                                    </MDBTableHead>
                                    <BrandCategoryTableBody
                                        brandCategoryListList={this.state.brandCategoryArray}
                                        noItem={this.state.noItem}
                                        deleteBrandCategory={this.deleteBrandCategory}

                                    />
                                </MDBTable>
                                <form onSubmit={this.submitBrandsAndCategory}>
                                    <MDBBtn type="submit">Save</MDBBtn>
                                </form>


                            </MDBCardBody>
                        </MDBCard>


                    </MDBCol>
                    <MDBCol size="6"/>
                </MDBRow>

            </div>
        );
    }
}