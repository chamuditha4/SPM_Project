import React, {Component} from 'react';
import axios from "axios";

class ViewWorkShops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshops: [],
            isExpandClick: false
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/workshop/')
            .then(response => {
                this.setState({workshops: response.data.data})
            } )
    }

    //to call the end point and delete a value using axios
    deleteWorkShop(e, id){
        axios.delete(`http://localhost:8081/workshop/delete/${id}`)
            .then(response => {
                alert('Data successfully deleted')
                this.componentDidMount()
            })
    }

    updateStatus(e, id){
        const status = prompt("Enter the status: ");
        axios.put(`http://localhost:8081/workshop/update/${id}`, {status: status, id:id})
            .then(response => {
                alert('Data successfully updated')
                this.componentDidMount()
            })
    }

    render() {
        return (
            <div className="p-3">
                 <header className="jumbotron"> 
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Organizer Name</th>
                            <th>Contact Number</th>
                            <th>Organizer Email</th>
                            <th>WorkShop Title</th>
                            <th>Description</th>
                            <th>Proposal URL</th>
                            <th>Estimated Duration(in days):</th>
                            <th>Payment Amount($):</th>
                            <th>Current Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.workshops.length > 0 && this.state.workshops.map((item,index) => (
                            <tr key={index} className="align-top">
                                <td>{item.organizerName}</td>
                                <td>{item.organizerContactNo}</td>
                                <td>{item.organizerEmail}</td>
                                <td>{item.workShopTitle}</td>
                                <td>{item.description}</td>
                                <td>{item.proposalURL}</td>
                                <td>{item.estimatedDuration}</td>
                                <td>{item.paymentAmount}</td>
                                {item.status === "not approved" &&
                                <td><span className="badge bg-danger">{item.status}</span></td>
                                }
                                {item.status === "approved" &&
                                <td><span className="badge bg-success">{item.status}</span></td>
                                }
                                <td><button className="update" onClick={e => this.updateStatus(e,item._id)}>
                                    <i className="far fa-edit"></i>
                                </button></td>
                                <td><button className="delete" onClick={e => this.deleteWorkShop(e,item._id)}>
                                    <i className="fas fa-trash"></i>
                                </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </header>
            </div>
        )
    }
}

export default ViewWorkShops;

