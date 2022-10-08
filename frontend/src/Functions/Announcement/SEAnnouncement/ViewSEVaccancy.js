import React, {Component} from "react";
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
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
    MDBInput, MDBBtn, MDBTableHead, MDBTableBody, MDBTable, MDBDropdown, MDBCardText, MDBAlert
} from 'mdbreact';
import { Bar } from "react-chartjs-2";
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import '../UserManagement/UserManage.css'
import axios from "axios";
import constants from "../../../constants/constants";
import {AdminAnalysis} from "./AdminAnalysis";



export default class UserAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackList: [],
            detailList:[],
            countMale: 0,
            countFemale: 0,
            dataBar: {},
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        }


        this.getDetails = this.getDetails.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.countgender = this.countgender.bind(this);
    }
    componentDidMount() {
        this.getDetails();
        this.getUserDetails();
    }

    getDetails(){
        console.log("get Feedback");
        axios.get(constants.backend_url + 'api/feedback/getAlldetail').then(response => {
            console.log(response.data);
            this.setState({feedbackList:response.data})
            this.countgender();
        }).catch(function (error) {
            console.log(error);
        })
    }

    countgender(){
        console.log("gender count");
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
            if (result.value) {
                axios.get(constants.backend_url + 'api/feedback/deleteFeedback/'+ id).then(response => {
                    if (response.data.feedbackDelete === 'success') {
                        swalWithBootstrapButtons.fire(
                            '',
                            'Delete Failed !.',
                            'error'
                        )
                    }else {
                        Swal.fire(
                            '',
                            'Feedback Deleted !',
                            'success'
                        )

                        this.getDetails();
                    }
                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Feedback not deleted !',
                    'error'
                )
            }
        })
    }




    getUserDetails(){
        axios.get(constants.backend_url + 'api/userDetail/getAllusers').then(response => {

            console.log('JJJJJJJJJJJJ');
            console.log(response.data);
            console.log('JJJJJJJJJJJJ');
            let maleCount=0;
            let femaleCount=0;
            response.data.map(user=>{
                if(user.gender === 'Male'){
                    maleCount++;
                }
                if(user.gender === 'Female'){
                    femaleCount ++;
                }
            })
            this.setState({
                detailList:response.data,
                countMale :maleCount,
                countFemale :femaleCount,
                dataBar: {
                    labels: [ "Male", "Female"],
                    datasets: [
                        {
                            label: "Gender attraction towards website",


                            data: [maleCount, femaleCount],


                            backgroundColor: [
                                "rgba(236, 112, 99 )",
                                "rgba(93, 173, 226)",
                            ],
                            borderWidth: 2,
                            borderColor: [
                                "rgba(255, 134, 159, 1)",
                                "rgba(98,  182, 239, 1)",
                            ]
                        }
                    ]
                }
            })
        }).catch(function (error) {
            console.log(error);
        })
    }


    render() {
        const{feedbackList} = this.state;
        const NumberofFeedbacks =  feedbackList.length;
        return (
            <div >

                    <AdminAnalysis/>
                    <div className=" container-fluid itemColorMain">
                        <MDBRow>
                            <MDBCol size="5">
                                <MDBCard>
                                    <MDBCardBody className="charts">
                                        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            {/*    ---------------------------------------------Customer feedback----------------------------------------------------------------*/}
                            <MDBCol size="7"  >
                                <MDBCard >
                                    <MDBCardBody className="feedbackdiv2 feedbackcard">
                                        <MDBTable scrollY  maxHeight="420px">
                                            <div style={{"float" : "center" , "color" : "black", fontWeight: "bold"}}> Unread Feedbacks : {NumberofFeedbacks} </div>

                                            {
                                                this.state.feedbackList.length === 0 ?
                                                    <tr >
                                                        <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                                            <MDBAlert color="danger" >
                                                                No Feedbacks Available
                                                            </MDBAlert>
                                                        </td>
                                                    </tr> :
                                                this.state.feedbackList.map(item => {
                                                    return(


                                        <div>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <h5 className='pink-text '><MDBIcon icon='envelope'/> New Feedback</h5>
                                                    <MDBCardTitle className='font-weight-bold'>Customer : {item.firstName + " " + item.lastName } </MDBCardTitle>
                                                    <MDBCardText className="feedbacktext">{item.feedback}</MDBCardText>
                                                    <MDBBtn color='unique' onClick={() => this.sweetalertfunction(item._id)}>Delete</MDBBtn>
                                                </MDBCardBody>

                                            </MDBCard>
                                            <br/>
                                        </div>

                                                )
                                                })}

                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}


                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}

                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}

                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}

                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}

                                            {/*/!*-------------------------------------------------------------*!/*/}
                                            {/*<MDBCard >*/}
                                            {/*    <MDBCardBody>*/}
                                            {/*        <h5 className='pink-text'><MDBIcon icon='envelope'/> New Feedback</h5>*/}
                                            {/*        <MDBCardTitle className='font-weight-bold'>Customer name</MDBCardTitle>*/}
                                            {/*        <MDBCardText>This is a Feedback message from the customer - About his feedbacks and thoughts. suggestions,*/}
                                            {/*            his/her issues and requests that the user admin should consider</MDBCardText>*/}
                                            {/*        <MDBBtn color='unique' onClick={this.sweetalertfunction}>Delete</MDBBtn>*/}
                                            {/*    </MDBCardBody>*/}
                                            {/*</MDBCard>*/}
                                            {/*<br/>*/}
                                            {/*/!*-------------------------------------------------------------*!/*/}
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>

                            </MDBCol>
                        </MDBRow>
                    </div>
                {/*</MDBView>*/}
            </div>
        );
    }
}