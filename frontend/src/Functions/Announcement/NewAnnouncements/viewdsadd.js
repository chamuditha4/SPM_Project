import React from "react";
import "./CreateUser.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../config";

toast.configure();

//New User can create using This component
export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
            conPassword: "",
            type: "user",
        };
    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const users = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            password: this.state.password,
            type: this.state.type,
        };

        if (this.state.password === this.state.conPassword) {
            console.log(users);

            axios
                .post(serverUrl + "/users/add", users)
                .then((response) => {
                    console.log(response);
                    toast("User Added, You will be redirected to Login Page");
                    setTimeout(() => {
                        window.location = "/login";
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error.response);
                    toast("Email or Username Exists");
                    this.setState({
                        email: "",
                        password: "",
                        conPassword: "",
                    });
                });
        } else {
            toast("Password doesn't match");
            this.setState({
                password: "",
                conPassword: "",
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signup">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <label className="control-label">First Name</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={(e) =>
                                            this.updateInput("firstName", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Last Name</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={(e) =>
                                            this.updateInput("lastName", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <label className="control-label">Email</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-at" />
                                    </span>
                                    </div>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(e) => this.updateInput("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <label className="control-label">Phone No</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-phone" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone No"
                                        value={this.state.phoneNo}
                                        onChange={(e) =>
                                            this.updateInput("phoneNo", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Password</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-key" />
                                    </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(e) =>
                                            this.updateInput("password", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Confirm Password</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-key" />
                                    </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={this.state.conPassword}
                                        onChange={(e) =>
                                            this.updateInput("conPassword", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn float-right reg-btn">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}