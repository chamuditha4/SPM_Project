import React, { Component } from 'react'
import './StyleSP/Stock.css'
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBInput,
    MDBRow, MDBTable,
    MDBTableBody, MDBTableHead
} from "mdbreact";

import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import constants from "../../../constants/constants";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StockPriceTableBody from "./StockPriceTableBody";
import {NavLink} from "react-router-dom";

export default class SupplierDetails extends Component{


    constructor(props) {
        super(props);


        this.state = {
            companyName: '',
            companyNameValidation: false,
            companyWebsite: '',
            companyWebsiteValidation: false,
            description: '',
            firstName: '',
            firstNameValidation: false,
            lastName: '',
            lastNameValidation: false,
            companyNumber: '',
            companyNumberValidation: false,
            mobileNumber: '',
            mobileNumberValidation: false,
            email: '',
            emailValidation: false,
            fax: '',
            faxValidation: false,
            address1: '',
            address1Validation: false,
            address2: '',
            address2Validation: false,
            city: '',
            cityValidation: false,
            country: '',
            countryValidation: false,
            state: '',
            stateValidation: false,

        }


        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeCompanyWebsite = this.onChangeCompanyWebsite.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCompanyNumber = this.onChangeCompanyNumber.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFax = this.onChangeFax.bind(this);


        this.onChangeAddress1 = this.onChangeAddress1.bind(this);
        this.onChangeAddress2 = this.onChangeAddress2.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }
    componentDidMount(){
        if(localStorage.getItem("userLogged")!=="userLogged"){
            this.props.history.push('/');
        }
    }
        //Supplier ---------------------------------------


        onChangeCompanyName(e)
        {
            this.setState({
                companyName: e.target.value,
                companyNameValidation: false
            });
        }

        onChangeCompanyWebsite(e)
        {
            this.setState({
                companyWebsite: e.target.value,
                companyWebsiteValidation: false
            });
        }

        onChangeDescription(e)
        {
            console.log(e.target.value);
            this.setState({
                description: e.target.value
                // descriptionValidation: false
            });
        }


        //Contact Information ----------------------------------------------------------------

        onChangeFirstName(e)
        {
            console.log("First Name");
            console.log(e.target.value)
            console.log("Fist Name")
            this.setState({
                firstName: e.target.value,
                firstNameValidation: false
            });
        }

        onChangeLastName(e)
        {
            this.setState({
                lastName: e.target.value,
                lastNameValidation: false
            });
        }

        onChangeCompanyNumber(e)
        {
            this.setState({
                companyNumber: e.target.value,
                companyNumberValidation: false
            });
        }

        onChangeMobileNumber(e)
        {
            this.setState({
                mobileNumber: e.target.value,
                mobileNumberValidation: false
            });
        }

        onChangeEmail(e)
        {
            this.setState({
                email: e.target.value,
                emailValidation: false
            });
        }

        onChangeFax(e)
        {
            this.setState({
                fax: e.target.value,
                faxValidation: false
            });
        }


        //Address Information ---------------------------------------

        onChangeAddress1(e)
        {
            this.setState({
                address1: e.target.value,
                address1Validation: false
            });
        }

        onChangeAddress2(e)
        {
            this.setState({
                address2: e.target.value,
                address2Validation: false
            });
        }

        onChangeCity(e)
        {
            this.setState({
                city: e.target.value,
                cityValidation: false
            });
        }

        onChangeCountry(e)
        {
            this.setState({
                country: e.target.value,
                countryValidation: false
            });
        }

        onChangeState(e)
        {
            this.setState({
                state: e.target.value,
                stateValidation: false
            });
        }


        onSubmit(e)
        {
            e.preventDefault();

            if(this.state.companyName !== ''){
                if(this.state.companyWebsite !== ''){
                    // if(this.state.description !== ''){
                        if(this.state.firstName !== ''){
                            if(this.state.lastName !== ''){
                                if(this.state.companyNumber !== ''){
                                    if(this.state.mobileNumber !== ''){
                                        if(this.state.email !== ''){
                                            if(this.state.fax !== ''){
                                                if(this.state.address1 !== ''){
                                                    if(this.state.address2 !== ''){
                                                        if(this.state.city !== ''){
                                                            if(this.state.country !== ''){
                                                                if(this.state.state !== ''){
                                                                    const newSupplier = {
                                                                        companyName: this.state.companyName,
                                                                        companyWebsite: this.state.companyWebsite,
                                                                        description: this.state.description,
                                                                        firstName: this.state.firstName,
                                                                        lastName: this.state.lastName,
                                                                        companyNumber: this.state.companyNumber,
                                                                        mobileNumber: this.state.mobileNumber,
                                                                        email: this.state.email,
                                                                        fax: this.state.fax,
                                                                        address1: this.state.address1,
                                                                        address2: this.state.address2,
                                                                        city: this.state.city,
                                                                        country: this.state.country,
                                                                        state: this.state.state
                                                                    }

                                                                    axios.post(constants.backend_url + 'api/supplier/add', newSupplier)
                                                                        .then(res => {
                                                                                console.log(res)
                                                                            console.log(newSupplier);
                                                                                if (res.data.supplier === 'successful') {
                                                                                    Swal.fire(
                                                                                        '',
                                                                                        'Supplier Details Added Successfully.',
                                                                                        'success'
                                                                                    );
                                                                                    this.setState({
                                                                                        companyName: '',
                                                                                        companyWebsite: '',
                                                                                        description: '',
                                                                                        firstName: '',
                                                                                        lastName: '',
                                                                                        companyNumber: '',
                                                                                        mobileNumber: '',
                                                                                        email: '',
                                                                                        fax: '',
                                                                                        address1: '',
                                                                                        address2: '',
                                                                                        city: '',
                                                                                        country: '',
                                                                                        state: ''
                                                                                    })

                                                                                } else {
                                                                                    Swal.fire(
                                                                                        '',
                                                                                        'Supplier Added Fail',
                                                                                        'error'
                                                                                    )
                                                                                }
                                                                            }
                                                                        );
                                                                }else{
                                                                    this.setState({
                                                                        stateValidation: true
                                                                    })
                                                                }
                                                            }else{
                                                                this.setState({
                                                                    countryValidation: true
                                                                })
                                                            }
                                                        }else{
                                                            this.setState({
                                                                cityValidation: true
                                                            })
                                                        }
                                                    }else{
                                                        this.setState({
                                                            address2Validation: true
                                                        })
                                                    }
                                                }else{
                                                    this.setState({
                                                        address1Validation: true
                                                    })
                                                }
                                            }else{
                                                this.setState({
                                                    faxValidation: true
                                                })
                                            }
                                        }else{
                                            this.setState({
                                                emailValidation: true
                                            })
                                        }
                                    }else{
                                        this.setState({
                                            mobileNumberValidation: true
                                        })
                                    }
                                }else{
                                    this.setState({
                                        companyNumberValidation: true
                                    })
                                }
                            }else{
                                this.setState({
                                    lastNameValidation: true
                                })
                            }
                        }else{
                            this.setState({
                                firstNameValidation: true
                            })
                        }
                    // }else{
                    //     this.setState({
                    //         descriptionValidation: true
                    //     })
                    // }
                }else{
                    this.setState({
                        companyWebsiteValidation: true
                    })
                }
            }else{
                this.setState({
                    companyNameValidation: true
                })
            }

        }



    render(){

        const suppliersArr = this.state.suppliers;
        const deleteSuppliers=this.deleteStockPrice;

        return(
    <div className="bg">

  
        <MDBCard className="mb-5">
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">

                <NavLink exact={true} to="/supplier/suppliermanage" >
                    <button type="button" className="btn btn-primary"> Supplier Manage</button>
                </NavLink>

                <NavLink exact={true} to="/supplier/supplieranalysis" activeClassName="activeClass">
                    <button type="button" className="btn btn-success ">Supplier Details</button>
                </NavLink>

                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </MDBCardBody>
        </MDBCard>

                <br/>
                <br/>

                {/*<MDBRow>*/}
                    {/*<MDBCol size="6">*/}

                        <MDBCard className="card">
                            <MDBCardBody>

                                <form onSubmit={this.onSubmit}>
                                    <MDBRow >
                                    <MDBCol size="6">
                                        <MDBCardTitle>Supplier</MDBCardTitle>

                                    <MDBInput label="Company Name" size="sm"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.companyName}
                                              onChange={this.onChangeCompanyName}
                                    />
                                    {
                                        this.state.companyNameValidation ? <MDBAlert color="danger">
                                            Company Name Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Website" size="sm"

                                              value={this.state.companyWebsite}
                                              onChange={this.onChangeCompanyWebsite}
                                    />
                                    {
                                        this.state.companyWebsiteValidation ? <MDBAlert color="danger">
                                            Company Website Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea2"
                                               >Description</label>
                                        <textarea className="form-control rounded-0" id="exampleFormControlTextarea2"
                                                  rows="3"
                                                  value={this.state.description}
                                                  onChange={this.onChangeDescription}
                                        />


                                        {/*{*/}
                                        {/*    this.state.descriptionValidation ? <MDBAlert color="danger">*/}
                                        {/*        Description Field Is Empty*/}
                                        {/*    </MDBAlert> : ''*/}
                                        {/*}*/}

                                    </div>
                                    </MDBCol>
                                      <MDBCol size="6">
                                    <MDBCardTitle>Contact Infromation</MDBCardTitle>

                                    <MDBInput label="First Name" size="sm" minLength="3"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.firstName}
                                              onChange={this.onChangeFirstName}

                                    />

                                    {

                                        this.state.firstNameValidation ? <MDBAlert color="danger">
                                            First Name Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Last Name" size="sm" minLength="3"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.lastName}
                                              onChange={this.onChangeLastName}
                                    />
                                    {
                                        this.state.lastNameValidation ? <MDBAlert color="danger">
                                            Last Name Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Company Number" size="sm" minLength="10" maxLength = "10"
                                              pattern="[0-9]*"
                                              value={this.state.companyNumber}
                                              onChange={this.onChangeCompanyNumber}
                                    />
                                    {
                                        this.state.companyNumberValidation ? <MDBAlert color="danger">
                                            Company Number Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Mobile Number" size="sm" minLength="10" maxLength = "10"
                                              pattern="[0-9]*"
                                              value={this.state.mobileNumber}
                                              onChange={this.onChangeMobileNumber}
                                    />
                                    {
                                        this.state.mobileNumberValidation ? <MDBAlert color="danger">
                                            Mobile Number Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Email" size="sm"
                                              pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                                              value={this.state.email}
                                              onChange={this.onChangeEmail}
                                    />
                                    {
                                        this.state.emailValidation ? <MDBAlert color="danger">
                                            Email Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Fax" size="sm" minLength="10" maxLength = "10"
                                              pattern="[0-9]*"
                                              value={this.state.fax}
                                              onChange={this.onChangeFax}
                                    />
                                    {
                                        this.state.faxValidation ? <MDBAlert color="danger">
                                            Fax Field Is Empty
                                        </MDBAlert> : ''
                                    }
                                       </MDBCol>
                                        <MDBCol size="6">
                                    <MDBCardTitle>Address Infromation</MDBCardTitle>


                                    <MDBInput label="Address 1" size="sm"
                                              value={this.state.address1}
                                              onChange={this.onChangeAddress1}

                                    />
                                    {
                                        this.state.address1Validation ? <MDBAlert color="danger">
                                            Address 1 Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Address 2" size="sm"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.address2}
                                              onChange={this.onChangeAddress2}

                                    />
                                    {
                                        this.state.address2Validation ? <MDBAlert color="danger">
                                            Address 2 Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Town/City" size="sm"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.city}
                                              onChange={this.onChangeCity}

                                    />
                                    {
                                        this.state.cityValidation ? <MDBAlert color="danger">
                                            City Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="Country" size="sm"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.country}
                                              onChange={this.onChangeCountry}

                                    />
                                    {
                                        this.state.countryValidation ? <MDBAlert color="danger">
                                            Country Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBInput label="State" size="sm"
                                              pattern="[a-zA-Z]*"
                                              value={this.state.state}
                                              onChange={this.onChangeState}

                                    />
                                    {
                                        this.state.stateValidation ? <MDBAlert color="danger">
                                            State Field Is Empty
                                        </MDBAlert> : ''
                                    }

                                    <MDBBtn type="submit">Save</MDBBtn>

                                        </MDBCol>
                                    </MDBRow >
                                </form>
                            </MDBCardBody>
                        </MDBCard>


            </div>


        );
    }
}
