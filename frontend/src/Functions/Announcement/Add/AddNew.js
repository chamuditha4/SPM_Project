import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

//Initial states of input fields
const initialState = {
    name:'',
    contactNo:'',
    email: '',
    affiliation: '',
    interest: '',
    workshops: [],
    options: [],
    selectedWorkShop:[]
}

class AttendeeWorkshopRegistration extends Component {
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

    //to get subjects array from the backend
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
        let attendee = {
            name: this.state.name,
            contactNo: this.state.contactNo,
            email: this.state.email,
            affiliation: this.state.affiliation,
            interest: this.state.interest,
            workshops: this.state.selectedWorkShop
        }
        //call the end point and pass the values using axios
        console.log('data to send', attendee);
        axios.post('http://localhost:8081/attendee/create', attendee )
            .then(response => {
                alert('Data successfully inserted')
                this.props.history.push('/workshop-attendee');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>WORKSHOP REGISTRATION OF ATTENDEES</h1>
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
                        <label htmlFor="affiliation" className="form-label">Affiliation</label>
                        <input
                            type="text"
                            className="form-control"
                            id="affiliation"
                            name="affiliation"
                            value={this.state.affiliation}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="interest" className="form-label">Interest</label>
                        <input
                            type="text"
                            className="form-control"
                            id="interest"
                            name="interest"
                            value={this.state.interest}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="workShop" className="form-label">Preferred WorkShop</label>
                        <Select
                            options = {this.state.options}
                            className="basic-multi-select"
                            onChange={this.onWorkShopSelect}
                            isMulti
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AttendeeWorkshopRegistration;