import React, { Component } from 'react';
import axios from 'axios';

class DiscriptedEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {

            proposals: [],

            name: '',
            description: '',
            code: '',
            person: ''

        }
    }


    componentDidMount() {

        //Edit following with research paper table -----------------------RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

        axios.get(`http://localhost:8081/item/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ proposals: response.data.data })
            })
            .catch(error => {
                alert(error.message)
            })

        //Edit with research paper table ------------Render Method Also-----------RRRRRRRRR
        //Edit with research paper table -----------------------RRRRRRRRRRRRRRRRRRRRRRRRRRR




        axios.get(`http://localhost:8081/item/details/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ name: response.data.name,description: response.data.description,code: response.data.code,person: response.data.person })
            })
            .catch(error => {
            alert(error.message)
            })

    }






    render() {
        return (
            <div className="container">
                
                <header className="jumbotron">
                <center><h1><b>{this.state.name} Event Page</b></h1></center>

                <center><h5>Organized by, Sri Lanka Institute of Information Technology</h5></center> <br/>
            
                <center>  <h5><b>---- Details to Know ---- </b></h5> </center> <br/>
                <center>  <h6><b>{this.state.description}</b></h6>           </center><br />
                
                <center>  <h6> <b> Event Code from ICAF for the Event : </b>{this.state.code}</h6></center>
                <center>  <h6> <b> Assigned Event Organizers : </b>{this.state.person}</h6></center>
               
                <br />

                <center> <img src="http://www.observereducation.lk/wp-content/uploads/2019/06/SLIIT-LOGO-827x1024.png" alt="Conferace-Logo" width="168" height="200"/>   </center>

                <br />
            
                <center> <b> Mail For further Details : ruvinduagk@gmail.com</b></center>

                </header>

            </div>
        )
    }
}

export default DiscriptedEvents;
