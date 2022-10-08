import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

//Initial states of input fields
const initialState = {
    name:'',
    contactNo:'',
    email: '',
    depositedAmount: 0,
    depositedDate: '',
    bank: '',
    branch: '',
    workshops: [],
    options: [],
    selectedWorkShop:[]
}

class AttendeeWorkShopPayment extends Component {
    constructor(props) {
        super(props);
        //bind onChange function
        this.onChange = this.onChange.bind(this);
        //bind user define functions onSubjectSelect
        this.onWorkShopSelect = this.onWorkShopSelect.bind(this);
        //bind onSubmit function
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    //to get workshop array from the backend
    componentDidMount() {
        axios.get('http://localhost:8081/workshop/')
            .then(response => {
                this.setState({workshops: response.data.data}, () => {
                    let data = [];
                    this.state.workshops.map((item, index) =>{
                        let  workshop = {
                            value:item._id,
                            label:item.workShopTitle
                        }
                        data.push(workshop)
                    });
                    this.setState({options: data});
                })
            })
    }

    //to store values into input fields
    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onWorkShopSelect(e) {
        this.setState({selectedWorkShop: e ? e.map(item => item.value) : [] });
    }

    //To pass values into database
    onSubmit(e) {
        e.preventDefault();
        //create a object to send to database
        let workshoppayment = {
            name: this.state.name,
            contactNo: this.state.contactNo,
            email: this.state.email,
            depositedAmount: this.state.depositedAmount,
            depositedDate: this.state.depositedDate,
            bank: this.state.bank,
            branch: this.state.branch,
            workshops: this.state.selectedWorkShop
        }
        //call the end point and pass the values using axios
        console.log('data to send', workshoppayment);
        axios.post('http://localhost:8081/workshoppayment/create', workshoppayment )
            .then(response => {
                alert('Data successfully inserted')
                this.props.history.push('/workshop-payment');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                <h1>Payment Form</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactNo" className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contactNo"
                            name="contactNo"
                            value={this.state.contactNo}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="depositedAmount" className="form-label">Payment Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="depositedAmount"
                            name="depositedAmount"
                            value={this.state.depositedAmount}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="depositedDate" className="form-label">Deposited Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="depositedDate"
                            name="depositedDate"
                            value={this.state.depositedDate}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bank" className="form-label">Bank</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bank"
                            name="bank"
                            value={this.state.bank}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="branch" className="form-label">Branch</label>
                        <input
                            type="text"
                            className="form-control"
                            id="branch"
                            name="branch"
                            value={this.state.branch}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="workShop" className="form-label">WorkShop</label>
                        <Select
                            options = {this.state.options}
                            className="basic-multi-select"
                            onChange={this.onWorkShopSelect}
                            isMulti
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </header>
            </div>
        )
    }
}

export default AttendeeWorkShopPayment;