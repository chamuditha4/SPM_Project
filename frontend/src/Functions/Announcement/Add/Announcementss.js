import React, { Component} from 'react';
import axios from 'axios';

const initialState = {
    name: '',
    venue: '',
    time : '',
    date: '',
    description: ''
}

class Editor extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get('http://localhost:8081/main/mainForEditing')
            .then(response => {
                this.setState({ name: response.data.name,venue: response.data.venue,
                    time: response.data.time,date: response.data.date,description: response.data.description })
            })
            .catch(error => {
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let subject = {
            name: this.state.name,
            venue: this.state.venue,
            time: this.state.time,
            date: this.state.date,
            description: this.state.description
        }
        console.log('DATA TO update', subject);
        axios.post('http://localhost:8081/main/updateEventDetails', subject)
            .then(response => {
                alert('Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }


    render() {
        return (
            <div className="container">
                
                <h1> Add/Update Main Details</h1>
                <br/>
                <form onSubmit={this.onSubmit}>

                    <div className="mb-3">
                      <b> <label htmlFor="name" className="form-label">Conference Name to display:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b> <label htmlFor="date" className="form-label">Conference Date to display:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="date"
                            name="date"
                            value={this.state.date}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b>    <label htmlFor="venue" className="form-label">Conference Venue to display:</label></b>
                    <input
                            type="text"
                            className="form-control"
                            id="venue"
                            name="venue"
                            value={this.state.venue}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                    <b>    <label htmlFor="time" className="form-label">Conference time to display:</label></b>
                        <input
                            type="text"
                            className="form-control"
                            id="time"
                            name="time"
                            value={this.state.time}
                            onChange={this.onChange}
                        />
                    </div>




                    <div class="mb-3">
                    <b>    <label htmlFor="description" class="form-label">Description</label></b>
                    <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}>
                        </textarea>
                    </div>
                    <br/><br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  
                </form>
            </div>
        )
    }


}

export default Editor;




