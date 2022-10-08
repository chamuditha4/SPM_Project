import React, {Component} from 'react';
import axios from 'axios';

class ViewAttendeeRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: []
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/attendee')
            .then(response => {
                this.setState({attendees: response.data.data})
            } )
    }

    //to call the end point and delete a value using axios
    deletePayment(e, id){
        axios.delete(`http://localhost:8081/attendee/delete/${id}`)
            .then(response => {
                alert('Data successfully deleted')
                this.componentDidMount()
            })
    }

    render() {
        return (
            <div className="container">
                 <header className="jumbotron"> 
                <h1>REGISTERED WORKSHOPS</h1>
                {/* Check whether array have any value */}
                {this.state.attendees.length > 0 && this.state.attendees.map((item,index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h6>Name: {item.name}</h6>
                            <h6>Contact Number: {item.contactNo}</h6>
                            <h6>Email: {item.email}</h6>
                            <h6>Affiliation: {item.affiliation}</h6>
                            <h6>Interest: {item.interest}</h6>
                            <div>
                                {item.workshops && item.workshops.length > 0 ?
                                    <div>
                                        <b>Workshop Detail</b>
                                        {item.workshops.map((workshops, index) => (
                                            <div key={index} className="card p-2 mb-2">
                                                <h6>WorkShop Title: {workshops.workShopTitle}</h6>
                                                <h6>Description: {workshops.description}</h6>
                                            </div>
                                        ))}
                                    </div>
                                    : null}
                            </div>
                            {item.status === "not approved" &&
                            <h6>Status: <span className="badge bg-danger">{item.status}</span></h6>
                            }
                            {item.status === "not approved" &&
                            <button onClick={e => this.deletePayment(e,item._id)}>DELETE</button>
                            }
                            {item.status === "approved" &&
                            <h6>Status: <span className="badge bg-success">{item.status}</span></h6>
                            }
                        </div>
                    </div>
                ))}
              </header>
            </div>
        )
    }
}

export default ViewAttendeeRegistration;