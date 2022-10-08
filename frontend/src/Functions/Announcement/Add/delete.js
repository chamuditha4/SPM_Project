import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
const initialState = {
    name: '',
    code: '',
    description: '',
    sentence: '',
    person: '',
    proposals: [],
    options: [],
    selectedProposals: []
}

class addEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onProposalsSelect = this.onProposalsSelect.bind(this);
        this.state = initialState;
    }


    //Need to edit here by referances------------- RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

    componentDidMount() {
        axios.get('http://localhost:8081/proposals/')
            .then(response => {
                this.setState({ proposals: response.data.data }, () => {
                    let data = [];
                    this.state.proposals.map((item, index) => {
                        let subject = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(subject)
                    });
                    this.setState({ options: data });
                })
            })
    }

    //Need to edit here by referances------------- RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR




    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onProposalsSelect(e) {
        this.setState({ selectedProposals: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        let course = {
            name: this.state.name,
            code: this.state.code,
            description: this.state.description,
            sentence: this.state.sentence,
            person: this.state.person,
            proposals: this.state.selectedProposals
        };
        console.log('DATA TO SEND', course)
        axios.post('http://localhost:8081/item/createEvent', course)
            .then(response => {
                alert('Event Data successfully inserted')
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
                <h1>Create Events for the Conference</h1>
                <br/>

                <form onSubmit={this.onSubmit}data-testid ="form-tag">
                    <div className="mb-3">
                    <b><label htmlFor="name" className="form-label">Name of the Event to Display:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            data-testid ="input-filed"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b>  <label htmlFor="code" className="form-label">Assigning Code of the Event:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b><label htmlFor="sentence" className="form-label">Brief quote on Event:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="sentence"
                            name="sentence"
                            value={this.state.sentence}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b>  <label htmlFor="person" className="form-label">Organizer person/s:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="person"
                            name="person"
                            value={this.state.person}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                     <b>  <label htmlFor="description" className="form-label">Description For Adding on the Event:</label> </b>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}>
                    </textarea>

                    </div>

                <b><label htmlFor="proposals" className="form-label">Selected Proposals:( Select From Approved Proposals)</label></b>
                    <Select
                        options={this.state.options}
                        onChange={this.onProposalsSelect}
                        className="basic-multi-select"
                        isMulti
                    />

                    <br/> <br/>
                    <button type="submit" className="btn btn-primary" data-testid ="submit-btn">Add Event to the Conference</button>
                  
                </form>

                </header>
            </div>
        )
    }



}

export default addEvent;