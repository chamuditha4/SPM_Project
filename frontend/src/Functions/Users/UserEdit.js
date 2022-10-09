import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  room_id: "",
  room_name: "",
  room_type: "",
  bed_type: "",
  person_count: "",
  room_meals: "",
  room_price: "",
  image: null,
};

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      userDetails: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(
        `${APIURL}/users/get-user-details-by-id/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ userDetails: response.data.userDetails });
        console.log("userDetails =>", this.state.userDetails);
        //get inserted data

        this.setState({ user_id: this.state.userDetails.user_id });
        this.setState({ user_name: this.state.userDetails.user_name });
        this.setState({ user_type: this.state.userDetails.user_type });
        this.setState({ user_type: this.state.userDetails.user_type });
        this.setState({ person_count: this.state.userDetails.person_count });
        this.setState({ user_meals: this.state.userDetails.user_meals });
        this.setState({ user_price: this.state.userDetails.user_price });
        this.setState({ image: this.state.userDetails.user_url });
      });
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", this.state.image);
    formData.append("user_id", this.state.user_id);
    formData.append("user_name", this.state.user_name);
    formData.append("room_type", this.state.user_type);
    formData.append("user_type", this.state.user_type);
    formData.append("person_count", this.state.person_count);
    formData.append("user_meals", this.state.user_meals);
    formData.append("user_price", this.state.user_price);

    axios
      .put(
        `${APIURL}/users/update-user-details/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-user-details");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(`${APIURL}/users/delete-user/${this.props.match.params.id}`)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-user-details");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  render() {
    return (
      <div>
        <header id="home"></header>
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <br />
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/user-dash"
            >
              <div
                className="sidebar-brand-icon rotate-n-0"
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 140,
                  marginBottom: 100,
                }}
              >
                <img src={Logo} alt="" />
              </div>
              <div className="sidebar-brand-text mx-3"></div>
            </a>
            <br />
            <br />
            <br />
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="/user-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">user Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-new-user">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> New user
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-users-details">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> user List
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_user_order_details">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> user Orders List
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/check_all_room_order_status">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Check user Orders Status
                  </button>
                </Link>
              </div>
            </li>
            <br />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">Edit user Record </h1>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="img-profile rounded-circle"
                        src={User}
                        alt=""
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="/"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        {" "}
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div
                className="container-fluid"
                style={{
                  backgroundImage: 'url("../../../assets/images/hotel1.jpg")',
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                }}
              >
                <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                      <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                          <div className="row">
                            <div
                              className="col-lg-6 d-none d-lg-block"
                              style={{
                                backgroundImage:
                                  'url("../../../assets/images/room1.jpg")',
                              }}
                            />
                            <div className="col-lg-6">
                              <div className="p-5">
                                <div className="text-center">
                                  <h1 className="h4 text-gray-900 mb-4">
                                    Edit {this.state.userDetails.room_name}'s
                                    Details
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  {/* get room id */}
                                  <div className="form-group">
                                    <label>user ID</label>
                                    <input
                                      type="text"
                                      name="user_id"
                                      required="required"
                                      value={this.state.user_id}
                                      placeholder="RM-000"
                                      onChange={this.onChange}
                                      readOnly
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  {/* get room name */}
                                  <div className="form-group">
                                    <label>user Name</label>
                                    <input
                                      type="text"
                                      name="user_name"
                                      required="required"
                                      pattern="^[A-Za-zÀ-ÿ ,.'-]+$"
                                      value={this.state.user_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  {/* select room type */}
                                  <div className="form-group">
                                    <label>user Type</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="user_type"
                                      value={this.state.user_type}
                                      onChange={this.onChange}
                                    >
                                      <option>Select user Type</option>
                                      <option value="Single">Single</option>
                                      <option value="Double">Double</option>
                                      <option value="Delux">Delux</option>
                                      <option value="Luxary">Luxary</option>
                                    </select>
                                  </div>

                                  {/* select bed type */}
                                  <div className="form-group">
                                    <label>user Type</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="bed_type"
                                      value={this.state.bed_type}
                                      onChange={this.onChange}
                                    >
                                      <option>Select user Type</option>
                                      <option value="Single">Normal</option>
                                      <option value="Queen">Queen</option>
                                      <option value="King">King</option>
                                      <option value="Air Bed">Air Bed</option>
                                      <option value="Four-Poster Bed">
                                        Four-Poster user
                                      </option>
                                    </select>
                                  </div>

                                  {/* get person count */}
                                  <div className="form-group">
                                    <label>Person Count</label>
                                    <input
                                      type="Number"
                                      name="person_count"
                                      required="required"
                                      pattern="[0-9]*"
                                      value={this.state.person_count}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  {/* select meals availability*/}
                                  <div className="form-group">
                                    <label>Meals Available</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="user_meals"
                                      value={this.state.room_meals}
                                      onChange={this.onChange}
                                    >                                  
                                      <option>Select Meals Available</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>

                                  {/* get the user price per person */}
                                  <div className="form-group">
                                    <label>user Pricer Per Person (Rs.)</label>
                                    <input
                                      type="text"
                                      name="room_price"
                                      required="required"
                                      pattern="[0-9]*"
                                      value={this.state.user_price}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  {/* Upload image */}
                                  <div className="form-group">
                                    <label>Images</label>
                                    <input
                                      type="file"
                                      name="image"
                                      required="required"
                                      accept="image/*"
                                      onChange={this.onFileChange}
                                      className=" images-upload"
                                    />
                                  </div>

                                  {/* Display Update Button */}
                                  <button
                                    type="submit"
                                    style={{ fontSize: 15 }}
                                    className="btn btn-primary btn-user btn-block"
                                  >
                                    Update Records
                                  </button>
                                </form>

                                {/* Display Delete Button */}
                                <button
                                  type="submit"
                                  className="btn btn-danger btn-user btn-block"
                                  style={{
                                    borderRadius: 25,
                                    height: 40,
                                    marginTop: 10,
                                  }}
                                  onClick={this.onDelete}
                                >
                                  Delete Records
                                </button>

                                <Link to="/get-all-users-details">

                                  {/* Display Cancle Butoon */}
                                  <button
                                    type="submit"
                                    className="btn btn-success btn-user btn-block"
                                    style={{
                                      borderRadius: 25,
                                      height: 40,
                                      marginTop: 10,
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </Link>
                                <hr />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto text-black ">
                  <span>Copyright © users </span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#home">
          <i className="fas fa-angle-up" />
        </a>
        <a href="#home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="/">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditUser;
