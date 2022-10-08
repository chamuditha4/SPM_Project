import React, {Component} from 'react'
import './StyleSP/Stock.css'

import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBInput,
    MDBRow, MDBTable, MDBTableHead
} from "mdbreact";

import 'sweetalert2/src/sweetalert2.scss'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import uuid from "react-uuid";
import StockPriceTableBody from "./StockPriceTableBody";
import constants from "../../../constants/constants";
import StocksTableBody from "./StocksTableBody";
import {NavLink} from "react-router-dom";


export default class StockDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            startDateValidation: false,
            endDate: '',
            endDateValidation: false,
            buyingPrice: 0,
            buyingPriceValidation: false,
            sellingPrice: 0,
            sellingPriceValidation: false,
            quantity: 0,
            quantityValidation: false,
            discount: 0,
            discountValidation: false,
            totalPrice: 0,
            totalPriceValidation: false,
            stockPriceArray: [],
            stockPriceIDArray: [],
            stocksArray: [],
            noItem: true,
            suppliers: [],
            ItemColourId: [],
            stocks: '',
            fullTotalPrice: 0,
            selectedSupplierObject: '',
            selectedSupplierObjectValidation: false,
            selectedItemColourIdObject: '',
            selectedItemColourIdObjectValidation: false
        }

        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeBuyingPrice = this.onChangeBuyingPrice.bind(this);
        this.onChangeSellingPrice = this.onChangeSellingPrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
        this.onSubmitPrices = this.onSubmitPrices.bind(this);
        this.AddStockPricesToTable = this.AddStockPricesToTable.bind(this);
        this.deleteStockPrice = this.deleteStockPrice.bind(this);
        // this.stockPriceArray = this.stockPriceArray.bind(this);
        this.getAllSuppliers = this.getAllSuppliers.bind(this);
        this.getAllItemColourId = this.getAllItemColourId.bind(this);
        this.onChangeGetCompanyName = this.onChangeGetCompanyName.bind(this);
        this.updateStocks = this.updateStocks.bind(this);
        this.getAllSuppliers();
        this.getAllItemColourId();
    }

    componentDidMount() {
        if (localStorage.getItem("userLogged") !== "userLogged") {
            this.props.history.push('/');
        }
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value,
            startDateValidation: false
        })

    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value,
            endDateValidation: false
        })

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

    getAllItemColourId() {
        axios.get(constants.backend_url + 'api/itemcolor/getAllItemColors').then(response => {
            this.setState({ItemColourId: response.data});
        }).catch(function (error) {
            console.log(error);
        })
        // console.log(this.state.itemColourId);
    }

    onChangeGetCompanyName(value) {
        // console.log(value);
        this.state.selectedSupplierObject = value;
        this.setState({
            selectedSupplierObject: this.state.selectedSupplierObject,
            selectedSupplierObjectValidation: false
        });

    }

    onChangeGetItemColourID(value) {
        console.log(value)
        this.state.selectedItemColourIdObject = value;
        this.setState({
            selectedItemColourIdObject: this.state.selectedItemColourIdObject,
            selectedItemColourIdObjectValidation: false
        });
        console.log("SelectedItemColorID-" + this.state.selectedItemColourIdObject);
    }

    onChangeBuyingPrice(e) {
        this.setState({
            buyingPrice: e.target.value,
            buyingPriceValidation: false
        });

    }

    onChangeSellingPrice(e) {
        this.setState({
            sellingPrice: e.target.value,
            sellingPriceValidation: false
        });

    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value,
            quantityValidation: false
        });

    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value,
            discountValidation: false
        });

    }

    onChangeTotalPrice(e) {
        this.setState({
            totalPrice: e.target.value,
            totalPriceValidation: false
        });

    }

    /////////////Onsubmit Prices

    onSubmitPrices(e) {
        e.preventDefault();
        if (this.state.stocks.length !== 0) {
            if (this.state.stockPriceArray.length !== 0) {
                const newStock = {
                    stock: this.state.stocks,
                    stockPriceArray: this.state.stockPriceArray
                }
                console.log("Outside stock details frontend");
                axios.post(constants.backend_url + 'api/stockdetails/add', newStock.stock)
                    .then(res => {
                            console.log("Inside stock details frontend");
                            if (res.data.stocks !== null) {
                                newStock.stockPriceArray.map(stocksPrice => {
                                    const stockPrice = {
                                        stockDetails: res.data.stocks._id,
                                        itemColorId: stocksPrice.itemColorId._id,
                                        buyingPrice: stocksPrice.buyingPrice,
                                        sellingPrice: stocksPrice.sellingPrice,
                                        quantity: stocksPrice.quantity,
                                        discount: stocksPrice.discount,
                                        totalPrice: stocksPrice.totalPrice
                                    }

                                    this.updateStocks(stocksPrice.itemColorId._id, stocksPrice.quantity, stocksPrice.sellingPrice);
                                    axios.post(constants.backend_url + 'api/stockprice/add', stockPrice)
                                        .then(res => {
                                                console.log("response")
                                                if (res.data.stockPrice === 'successful') {
                                                    Swal.fire(
                                                        '',
                                                        'Stocks Details Added ',
                                                        'success'
                                                    )
                                                } else {
                                                    Swal.fire(
                                                        '',
                                                        'Stock Details Added Fail',
                                                        'error'
                                                    )
                                                }
                                            }
                                        );
                                })


                            } else {
                                Swal.fire(
                                    '',
                                    'Stock Details Added Fail',
                                    'error'
                                )
                            }
                        }
                    );

            } else {
                Swal.fire(
                    '',
                    'Table is Empty Please Add Stock Prices To Table',
                    'error'
                )
            }
        } else {
            Swal.fire(
                '',
                'Please add stock Details',
                'error'
            )
        }
    }


    AddStockPricesToTable(e) {
        console.log("inside");
        console.log("totttttttt:" + this.state.fullTotalPrice);
        e.preventDefault();
        if (this.state.selectedSupplierObject !== '') {
            console.log("selectedSupplierObject");
            if (this.state.startDate !== '') {
                console.log("startDate");
                if (this.state.endDate !== '') {
                    console.log("endDate");
                    if (this.state.selectedItemColourIdObject !== '') {
                        console.log("checkedItemcolourID");
                        if (this.state.buyingPrice != 0) {
                            if (this.state.sellingPrice != 0) {
                                if (this.state.quantity != 0) {
                                    if (this.state.discount != 0) {
                                        // if (this.state.totalPrice != 0) {
                                        console.log("Full Total Price1111:");
                                        const newStockPrice = {
                                            itemColorId: this.state.selectedItemColourIdObject,
                                            buyingPrice: this.state.buyingPrice,
                                            sellingPrice: this.state.sellingPrice,
                                            quantity: this.state.quantity,
                                            discount: this.state.discount,
                                            totalPrice: this.state.quantity * this.state.buyingPrice,
                                            stockPriceId: uuid()
                                        }
                                        console.log("Full Total Price22222:");
                                        this.state.fullTotalPrice = this.state.fullTotalPrice + newStockPrice.totalPrice;
                                        console.log("Full Total Price:" + this.state.fullTotalPrice);
                                        const newStocks = {
                                            supplier: this.state.selectedSupplierObject._id,
                                            startDate: this.state.startDate,
                                            endDate: this.state.endDate,
                                            fullTotalPrice: this.state.fullTotalPrice
                                        }
                                        console.log("newSsss:" + newStocks);
                                        // console.log("itemcolourid" + this.state.selectedItemColourIdObject);
                                        const array = [newStockPrice, ...this.state.stockPriceArray];

                                        this.setState({
                                            stockPriceArray: array,
                                            stocks: newStocks,
                                            noItem: false,
                                            stockPriceId: uuid()
                                        })
                                        // console.log("Stock Price Array:" + this.state.stockPriceArray);
                                        this.getAllItemColourId();
                                        this.getAllSuppliers();

                                    } else {
                                        this.setState({
                                            discountValidation: true
                                        })

                                    }
                                } else {
                                    this.setState({
                                        quantityValidation: true
                                    })

                                }
                            } else {
                                this.setState({
                                    sellingPriceValidation: true
                                })

                            }
                        } else {
                            this.setState({
                                buyingPriceValidation: true
                            })

                        }
                    } else {
                        this.setState({
                            selectedItemColourIdObjectValidation: true
                        })
                    }
                } else {
                    this.setState({
                        endDateValidation: true
                    })
                }
            } else {
                this.setState({
                    startDateValidation: true
                })
            }
        } else {
            this.setState({
                selectedSupplierObjectValidation: true

            })
        }
    }

    deleteStockPrice(id) {
        const nonDeletedItems = this.state.stockPriceArray.filter(stockP => stockP.stockPriceId !== id);
        this.setState({
                stockPriceArray: nonDeletedItems,
                stockPriceId: id
            }
        )
        if (nonDeletedItems.length === 0) {
            this.setState({
                noItem: true
            })
        }
    }


    updateStocks(id, quantity, price) {
        console.log("Stock Update Frontend");
        console.log("ID: " + id);
        console.log("quantity: " + quantity);
        console.log("SellingPrice:" + price);

        axios.get(constants.backend_url + 'api/stockprice/updateQuantityPrice/' + id + '/' + quantity + '/' + price)
            .then(res => {
                console.log("Stock Update Frontend222222222222");
                if (res.data.stockPrice === 'successful') {
                    console.log("Updated Successfully")
                } else {
                    console.log("Updated fail")
                }
            });
    }

    fullTotalPrice(total) {

    }

    render() {
        return (

            <div>

                <MDBCard className="mb-5">
                    <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                        <NavLink exact={true} to="/stock/stockmanage" activeClassName="activeClass">
                            <button type="button" className="btn btn-primary">Stock Details</button>
                        </NavLink>
                        <NavLink exact={true} to="/stock/stockanalysis">
                            <button type="button" className="btn btn-success ">Items</button>
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

                <div>
                    <MDBRow>
                        <MDBCol size="8">
                            <MDBCard className="card">
                                <MDBCardBody>
                                    <form onSubmit={this.AddStockPricesToTable}>
                                        <MDBRow>
                                            <MDBCol size="6">
                                                <MDBCardTitle>Stock Details</MDBCardTitle>
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={this.state.suppliers}
                                                    getOptionLabel={(option) => option.companyName}
                                                    style={{width: 300}}
                                                    onChange={(event, value) => this.onChangeGetCompanyName(value)}
                                                    renderInput={(params) => <TextField {...params}
                                                                                        label="Supplier"/>}
                                                    size="sm"
                                                />
                                                {
                                                    this.state.selectedSupplierObjectValidation ?
                                                        <MDBAlert color="danger">
                                                            Supplier Field Is Empty
                                                        </MDBAlert> : ''
                                                }

                                                <div className="md-form">
                                                    <label htmlFor="defaultFormCardNameEx1" className="grey-text font-weight-light"><b>Start Date</b></label><br/>
                                                    <input placeholder="Start date" type="date"
                                                           id="date-picker-example"
                                                           className="form-control datepicker"
                                                           value={this.state.startDate}
                                                           onChange={this.onChangeStartDate}/>

                                                </div>
                                                {
                                                    this.state.startDateValidation ? <MDBAlert color="danger">
                                                        Start Date Field Is Empty
                                                    </MDBAlert> : ''
                                                }

                                                <div className="md-form">
                                                    <label htmlFor="defaultFormCardNameEx1" className="grey-text font-weight-light"><b>End Date</b></label><br/>
                                                    <input placeholder="End date" type="date"
                                                           id="date-picker-example"
                                                           className="form-control datepicker"
                                                           value={this.state.endDate}
                                                           onChange={this.onChangeEndDate}/>

                                                </div>
                                                {
                                                    this.state.endDateValidation ? <MDBAlert color="danger">
                                                        End Date Field Is Empty
                                                    </MDBAlert> : ''
                                                }
                                            </MDBCol>
                                            <MDBCol size="6">
                                                <MDBCardTitle>Stock Prices</MDBCardTitle>
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={this.state.ItemColourId}
                                                    getOptionLabel={(option) => option.itemColorsId}
                                                    style={{width: 300}}
                                                    onChange={(event, value) => this.onChangeGetItemColourID(value)}
                                                    renderInput={(params) => <TextField {...params}
                                                                                        label="Item ColourID"/>}
                                                    size="sm"
                                                />

                                                {
                                                    this.state.selectedItemColourIdObjectValidation ?
                                                        <MDBAlert color="danger">
                                                            Item Colour ID Field Is Empty
                                                        </MDBAlert> : ''
                                                }


                                                <MDBInput label="Buying Price" size="sm"
                                                          pattern="[0-9]*"
                                                          value={this.state.buyingPrice}
                                                          onChange={this.onChangeBuyingPrice}

                                                />
                                                {
                                                    this.state.buyingPriceValidation ? <MDBAlert color="danger">
                                                        Buying Price Field Is Empty
                                                    </MDBAlert> : ''
                                                }

                                                <MDBInput label="Selling Price" size="sm"
                                                          pattern="[0-9]*"
                                                          value={this.state.sellingPrice}
                                                          onChange={this.onChangeSellingPrice}

                                                />
                                                {
                                                    this.state.sellingPriceValidation ? <MDBAlert color="danger">
                                                        Selling Price Field Is Empty
                                                    </MDBAlert> : ''
                                                }
                                                <MDBInput label="Quantity" size="sm"
                                                          pattern="[0-9]*"
                                                          value={this.state.quantity}
                                                          onChange={this.onChangeQuantity}
                                                />
                                                {
                                                    this.state.quantityValidation ? <MDBAlert color="danger">
                                                        Quantity Field Is Empty
                                                    </MDBAlert> : ''
                                                }
                                                <MDBInput label="Discount" size="sm"
                                                          pattern="[0-9]*"
                                                          value={this.state.discount}
                                                          onChange={this.onChangeDiscount}
                                                />
                                                {
                                                    this.state.discountValidation ? <MDBAlert color="danger">
                                                        Discount Field Is Empty
                                                    </MDBAlert> : ''
                                                }

                                                <MDBBtn type="submit">ADD</MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <br/>
                    <br/>
                    <MDBRow>
                        <MDBCol size="12">
                            <MDBCard className="card">
                                <MDBCardBody>
                                    <MDBTable>
                                        <MDBTableHead color="primary-color" textWhite>
                                            <tr>
                                                <th>Item Colour ID</th>
                                                <th>Buying Price</th>
                                                <th>Selling Price</th>
                                                <th>Quantity</th>
                                                <th>Discount</th>
                                                <th>Total Price</th>
                                                <th>Action</th>

                                            </tr>
                                        </MDBTableHead>
                                        <StockPriceTableBody
                                            stockPriceList={this.state.stockPriceArray}
                                            noItem={this.state.noItem}
                                            deleteStockPrice={this.deleteStockPrice}

                                        />
                                    </MDBTable>
                                    <form onSubmit={this.onSubmitPrices}>
                                        <MDBBtn type="submit">Save</MDBBtn>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>


            </div>


        );
    }
}


