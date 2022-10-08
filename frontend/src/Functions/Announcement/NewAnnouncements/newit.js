import React from "react";
import {Bar, Pie} from "react-chartjs-2";
import {MDBCard, MDBCardBody} from "mdbreact";
import PassengerTripNavBar from "./NavBar.PassengerTrips";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import {serverUrl} from "../config";

class StatisticsPassengerTrips extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userByType: {},
            trips: [],
            passengerByBus: [],
            passengerByRoute:[],
            buses: [],
            routes: [],
            Bid: [],
            BCount: [],
            userByBus: [],
            userByRoute: [],
            Rid: [],
            RCount: [],

        }

    }
    componentDidMount() {

        axios.get(serverUrl + "/users")
            .then(response => {
                this.setState({
                    users: response.data,
                })

                const userSet = response.data;
                this.userByType(userSet);

            })

        axios.get(serverUrl+"/buses/")
            .then(response => {
                console.log(response.data);
                this.setState({
                    buses: response.data,
                })

            })
        axios.get(serverUrl+"/routes/")
            .then(response => {
                console.log(response.data);
                this.setState({
                    routes: response.data,
                })

            })

        axios.get(serverUrl + "/trips")
            .then(response => {
                this.setState({
                    trips: response.data,
                })

                const userSet = response.data;
                this.userByBus(userSet);
                this.userByRoute(userSet);

            })



    }

    userByType(userData) {

        let Type= [];
        let TypeCounts =[];
        userData.forEach(element => {
            if (Type.indexOf(element.type) === -1) {
                Type.push(element.type);
            }
        });

        let usersByType= userData.reduce((countData, user, index) => {
            if (!!countData[user.type]) {
                countData[user.type] += 1;
            } else {
                countData[user.type] = 1;

            }

            return countData;
        }, {})
        TypeCounts = Object.keys(usersByType).map(user =>{

            return usersByType[user]
        })

        let categories =['Admin', 'Inspector', 'Passenger'];


        this.setState({
            loading:false,
            userByType : {
                labels: categories,
                datasets: [{
                    label:'Count',
                    data:TypeCounts,
                    backgroundColor: [
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD"
                    ],
                    hoverBackgroundColor: [
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB"
                    ]
                }]
            }
        })
    }

    //getting passenger count by bus
    userByBus(userBusData) {

        let bType = [];
        let TypeCounts = [];
        userBusData.forEach(element => {
            if (bType.indexOf(element.busID) === -1) {
                bType.push(element.busID);
            }
        });

        console.log(bType);

        let bresult = [];
        userBusData.reduce(function (res, value) {
            if (!res[value.busID]) {
                res[value.busID] = {busID: value.busID, count: 0};
                bresult.push(res[value.busID])
            }
            res[value.busID].count += 1;
            console.log(res);
            return res;
        }, {});


        let bcount = [];
        let bid = [];
        let bRegNo = [];

        bresult.map(resarr => {
            bcount.push(resarr.count);
            bid.push(resarr.busID);

        })

        this.state.buses.map(r => {
            console.log(r.regNo);
            bid.map(buid => {
                if (buid === r._id) {
                    bRegNo.push(r.regNo);
                }
            })
        })

        if (bresult != null) {
            this.setState({
                BCount: bcount,
                Bid: bid,
                passengerByBus: {
                    labels: bRegNo,
                    datasets: [{
                        data: bcount,
                        label: 'Total Count',
                        backgroundColor: [
                            '#ff764a',
                            '#ffa600',
                            '#bc5090',
                            '#ef5675',
                            '#003f5c',
                            '#7a5195'
                        ],
                        hoverBackgroundColor: [
                            '#ff764a',
                            '#ffa600',
                            '#bc5090',
                            '#ef5675',
                            '#003f5c',
                            '#bc5090',
                            '#ef5675',
                            '#7a5195'
                        ]
                    }]
                }
            })
        }

    }

        //getting passenger count by bus route
        userByRoute(userRouteData) {

            let rType = [];
            let TypeCounts = [];
            userRouteData.forEach(element => {
                if (rType.indexOf(element.routeID) === -1) {
                    rType.push(element.routeID);
                }
            });


            let Rresult = [];
            userRouteData.reduce(function (res, value) {
                if (!res[value.routeID]) {
                    res[value.routeID] = {routeID: value.busID, count: 0};
                    Rresult.push(res[value.routeID])
                }
                res[value.routeID].count += 1;
                console.log(res);
                return res;
            }, {});


            let rcount = [];
            let rid = [];
            let rNo = [];

            Rresult.map(resarr => {
                rcount.push(resarr.count);
                rid.push(resarr.routeID);

            })

            this.state.routes.map(r => {
                console.log(r.routeNo);
                rid.map(roid => {
                    if (roid === r._id) {
                        rNo.push(r.routeNo);
                    }
                })
            })

            if (Rresult != null) {
                this.setState({
                    RCount: rcount,
                    Rid: rid,
                    passengerByRoute: {
                        labels: rNo,
                        datasets: [{
                            data: rcount,
                            label: 'Total Count',
                            backgroundColor: [
                                '#bc5090',
                                '#ef5675',
                                '#ff764a',
                                '#ffa600',
                                '#003f5c',
                                '#7a5195'
                            ],
                            hoverBackgroundColor: [
                                '#bc5090',
                                '#ef5675',
                                '#ff764a',
                                '#ffa600',
                                '#003f5c',
                                '#bc5090',
                                '#ef5675',
                                '#7a5195'
                            ]
                        }]
                    }
                })
            }
        }

    render() {
        return (
            <div className="content">
                <PassengerTripNavBar/>
                <div className="container" style={{maxWidth: "90%"}}>
                    <Row>
                        <Col xs="6">
                            <br/>
                            <MDBCard style={{width: "40rem"}}>
                                <MDBCardBody>
                                    <h3 className="mt-5">Passenger Count Per Bus</h3>
                                    <Pie data={this.state.passengerByBus} options={{responsive: true}}/>
                                </MDBCardBody>
                            </MDBCard>
                        </Col>
                        <Col xs="6">
                            <br/>
                            <MDBCard style={{width: "40rem"}}>
                                <h3 className="mt-5">Passenger Count Per Bus Route</h3>
                                <Bar data={this.state.passengerByRoute} options={{
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }}/>
                            </MDBCard>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default StatisticsPassengerTrips;