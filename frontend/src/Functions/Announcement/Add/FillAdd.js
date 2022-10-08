import React, {Component} from 'react';
import axios from 'axios'

//Initial states of input fields
const initialState = {
    researcherName:'',
    researcherContactNo:'',
    researcherEmail: '',
    researchTitle: '',
    description: '',
    researchURL: '',
}

class researchRegistration extends Component {

    constructor(props) {
        super(props);
        //bind onChange function
        this.onChange = this.onChange.bind(this);
        //bind onSubmit function
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    //to store values into input fields
    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    //To pass values into database
    onSubmit(e) {
        e.preventDefault();
        //create a object to send to database
        let research = {
            researcherName: this.state.researcherName,
            researcherContactNo: this.state.researcherContactNo,
            researcherEmail: this.state.researcherEmail,
            researchTitle: this.state.researchTitle,
            description: this.state.description,
            researchURL: this.state.researchURL,
        }
        //call the end point and pass the values using axios
        console.log('data to send', research);
        axios.post('http://localhost:8081/research/create', research)
            .then(response => {
                alert('Data successfully inserted')
                this.props.history.push('/admin/research');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>RESEARCH REGISTRATION</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="researcherName" className="form-label">Researcher Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="researcherName"
                            name="researcherName"
                            value={this.state.researcherName}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="researcherContactNo" className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="researcherContactNo"
                            name="researcherContactNo"
                            value={this.state.researcherContactNo}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="researcherEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="researcherEmail"
                            placeholder="name@example.com"
                            name="researcherEmail"
                            value={this.state.researcherEmail}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="researchTitle" className="form-label">Research Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="researchTitle"
                            name="researchTitle"
                            value={this.state.researchTitle}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}>
                            required
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="researchURL" className="form-label">Research Proposal</label>
                        <input
                            type="file"
                            className="form-control"
                            id="researchURL"
                            name="researchURL"
                            value={this.state.researchURL}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }
}

export default researchRegistration;