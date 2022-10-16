import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "react-loader-spinner";

const Leave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, SetOrder] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const doc = new jsPDF("landscape");
  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${APIURL}/leave_order/get_all_leave_order_details`
        );
        if (response.status === 200) {
          SetOrder(response.data.AllleaveDetails);
          setBaseData(response.data.AllleaveDetails);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  //document generation
  const downloadReport = () => {
    doc.text("leave Booking Status Report", 30, 10);

    let array = [];
    order.map((orders, index) => {
      let row = [];
      row.push(index + 1);
      row.push(orders.user_id);
      row.push(orders.user_name);
      row.push(orders._id);
      row.push(orders.leave_name);
      row.push(orders.leave_price);
      row.push(orders.no_of_leave);
      row.push(orders.person_count);
      row.push(orders.total_price);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "User ID",
          "User Name",
          "Order Id",
          "Room Name",
          "Room Price",
          "No Of leave",
          "Person Count",
          "Total Price",
        ],
      ],

      body: array,
    });

    doc.save("leave_Booking.pdf");
    //window.location.reload();
  };

  //search button
  const search = (inp) => {
    if (!inp.target.value) {
      SetOrder(baseData);
    } else {
      let searchList = baseData.filter(
        (data) =>
          data.user_name
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.leave_name.toLowerCase().includes(inp.target.value.toLowerCase())
      );
      SetOrder(searchList);
    }
  };

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
            href="/leave-dash"
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
            <a className="nav-link" href="/leave-dash">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
          <br />
          <div className="sidebar-heading">leave Management</div>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/add-new-leave">
                <button className="dropbtn">
                  <i className="fa fa-plus-circle" /> New leave
                </button>
              </Link>
            </div>
          </li>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get-all-leave-details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get_leave_order_details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave Orders List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/check_all_leave_order_status">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> Check leave Orders Status
                </button>
              </Link>
            </div>
          </li>
          <br />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand topbar mb-4 static-top">
              <h1 className="h3 mb-2 text-gray-800">All leave List</h1>
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
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
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <p className="mb-4">All leave List available in here.</p>
              <div className="row"></div>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-6">
                  <div>
                    <button
                      onClick={downloadReport}
                      style={{ marginLeft: 70, fontSize: 20 }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginLeft: 190 }}>
                    <input
                      type="search"
                      placeholder="Search.."
                      name="searchQuery"
                      style={{ height: 40 }}
                      onChange={search}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Check leave{" "}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th>leave Name</th>
                          <th>leave Price</th>
                          <th>Number of leaves</th>
                          <th>Person Count</th>
                          <th>Total </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th> Name</th>
                          <th>leave Price</th>
                          <th>No </th>
                          <th>Person Count</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>

                      {order.length > 0 &&
                        order.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{item.user_id}</td>
                              <td>{item.user_name}</td>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.no}</td>
                              <td>{item.person_count}</td>
                              <td>{item.total}</td>

                              <td>
                                {item.isApprove === 2 && (
                                  <>
                                    <p className="p-1 mb-1  text-warning">
                                      Pending
                                    </p>
                                  </>
                                )}

                                {item.isApprove === 1 && (
                                  <>
                                    <p className="p-1 mb-1 text-success">
                                      Approved
                                    </p>
                                    <br />
                                  </>
                                )}

                                {item.isApprove === 0 && (
                                  <>
                                    <p className="p-1 mb-1 text-danger">
                                      Cancled
                                    </p>
                                    <br />
                                  </>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto text-black ">
                <span>Copyright © leave </span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
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

  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${APIURL}/leave_order/get_all_leave_order_details`
        );
        if (response.status === 200) {
          SetOrder(response.data.AllleaveDetails);
          setBaseData(response.data.AllleaveDetails);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  //document generation
  const sdownloadReport = () => {
    doc.text("leave Booking Status Report", 30, 10);

    let array = [];
    order.map((orders, index) => {
      let row = [];
      row.push(index + 1);
      row.push(orders.user_id);
      row.push(orders.user_name);
      row.push(orders._id);
      row.push(orders.leave_name);
      row.push(orders.leave_price);
      row.push(orders.no_of_leave);
      row.push(orders.person_count);
      row.push(orders.total_price);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "User ID",
          "User Name",
          "Order Id",
          "Room Name",
          "Room Price",
          "No Of leave",
          "Person Count",
          "Total Price",
        ],
      ],

      body: array,
    });

    doc.save("leave_Booking.pdf");
    //window.location.reload();
  };

  //search button
  const ssearch = (inp) => {
    if (!inp.target.value) {
      SetOrder(baseData);
    } else {
      let searchList = baseData.filter(
        (data) =>
          data.user_name
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.leave_name.toLowerCase().includes(inp.target.value.toLowerCase())
      );
      SetOrder(searchList);
    }
  };

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
            href="/leave-dash"
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
            <a className="nav-link" href="/leave-dash">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
          <br />
          <div className="sidebar-heading">leave Management</div>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/add-new-leave">
                <button className="dropbtn">
                  <i className="fa fa-plus-circle" /> New leave
                </button>
              </Link>
            </div>
          </li>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get-all-leave-details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get_leave_order_details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave Orders List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/check_all_leave_order_status">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> Check leave Orders Status
                </button>
              </Link>
            </div>
          </li>
          <br />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand topbar mb-4 static-top">
              <h1 className="h3 mb-2 text-gray-800">All leave List</h1>
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
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
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <p className="mb-4">All leave List available in here.</p>
              <div className="row"></div>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-6">
                  <div>
                    <button
                      onClick={downloadReport}
                      style={{ marginLeft: 70, fontSize: 20 }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginLeft: 190 }}>
                    <input
                      type="search"
                      placeholder="Search.."
                      name="searchQuery"
                      style={{ height: 40 }}
                      onChange={search}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Check leave{" "}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th>leave Name</th>
                          <th>leave Price</th>
                          <th>Number of leaves</th>
                          <th>Person Count</th>
                          <th>Total </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th> Name</th>
                          <th>leave Price</th>
                          <th>No </th>
                          <th>Person Count</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>

                      {order.length > 0 &&
                        order.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{item.user_id}</td>
                              <td>{item.user_name}</td>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.no}</td>
                              <td>{item.person_count}</td>
                              <td>{item.total}</td>

                              <td>
                                {item.isApprove === 2 && (
                                  <>
                                    <p className="p-1 mb-1  text-warning">
                                      Pending
                                    </p>
                                  </>
                                )}

                                {item.isApprove === 1 && (
                                  <>
                                    <p className="p-1 mb-1 text-success">
                                      Approved
                                    </p>
                                    <br />
                                  </>
                                )}

                                {item.isApprove === 0 && (
                                  <>
                                    <p className="p-1 mb-1 text-danger">
                                      Cancled
                                    </p>
                                    <br />
                                  </>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto text-black ">
                <span>Copyright © leave </span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
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


const Leave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, SetOrder] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const doc = new jsPDF("landscape");
  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${APIURL}/leave_order/get_all_leave_order_details`
        );
        if (response.status === 200) {
          SetOrder(response.data.AllleaveDetails);
          setBaseData(response.data.AllleaveDetails);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  //document generation
  const downloadReport = () => {
    doc.text("leave Booking Status Report", 30, 10);

    let array = [];
    order.map((orders, index) => {
      let row = [];
      row.push(index + 1);
      row.push(orders.user_id);
      row.push(orders.user_name);
      row.push(orders._id);
      row.push(orders.leave_name);
      row.push(orders.leave_price);
      row.push(orders.no_of_leave);
      row.push(orders.person_count);
      row.push(orders.total_price);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "User ID",
          "User Name",
          "Order Id",
          "Room Name",
          "Room Price",
          "No Of leave",
          "Person Count",
          "Total Price",
        ],
      ],

      body: array,
    });

    doc.save("leave_Booking.pdf");
    //window.location.reload();
  };

  //search button
  const search = (inp) => {
    if (!inp.target.value) {
      SetOrder(baseData);
    } else {
      let searchList = baseData.filter(
        (data) =>
          data.user_name
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.leave_name.toLowerCase().includes(inp.target.value.toLowerCase())
      );
      SetOrder(searchList);
    }
  };

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
            href="/leave-dash"
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
            <a className="nav-link" href="/leave-dash">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
          <br />
          <div className="sidebar-heading">leave Management</div>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/add-new-leave">
                <button className="dropbtn">
                  <i className="fa fa-plus-circle" /> New leave
                </button>
              </Link>
            </div>
          </li>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get-all-leave-details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get_leave_order_details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave Orders List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/check_all_leave_order_status">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> Check leave Orders Status
                </button>
              </Link>
            </div>
          </li>
          <br />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand topbar mb-4 static-top">
              <h1 className="h3 mb-2 text-gray-800">All leave List</h1>
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
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
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <p className="mb-4">All leave List available in here.</p>
              <div className="row"></div>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-6">
                  <div>
                    <button
                      onClick={downloadReport}
                      style={{ marginLeft: 70, fontSize: 20 }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginLeft: 190 }}>
                    <input
                      type="search"
                      placeholder="Search.."
                      name="searchQuery"
                      style={{ height: 40 }}
                      onChange={search}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Check leave{" "}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th>leave Name</th>
                          <th>leave Price</th>
                          <th>Number of leaves</th>
                          <th>Person Count</th>
                          <th>Total </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th> Name</th>
                          <th>leave Price</th>
                          <th>No </th>
                          <th>Person Count</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>

                      {order.length > 0 &&
                        order.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{item.user_id}</td>
                              <td>{item.user_name}</td>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.no}</td>
                              <td>{item.person_count}</td>
                              <td>{item.total}</td>

                              <td>
                                {item.isApprove === 2 && (
                                  <>
                                    <p className="p-1 mb-1  text-warning">
                                      Pending
                                    </p>
                                  </>
                                )}

                                {item.isApprove === 1 && (
                                  <>
                                    <p className="p-1 mb-1 text-success">
                                      Approved
                                    </p>
                                    <br />
                                  </>
                                )}

                                {item.isApprove === 0 && (
                                  <>
                                    <p className="p-1 mb-1 text-danger">
                                      Cancled
                                    </p>
                                    <br />
                                  </>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto text-black ">
                <span>Copyright © leave </span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
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
};

  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${APIURL}/leave_order/get_all_leave_order_details`
        );
        if (response.status === 200) {
          SetOrder(response.data.AllleaveDetails);
          setBaseData(response.data.AllleaveDetails);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  //document generation
  const ssdownloadReport = () => {
    doc.text("leave Booking Status Report", 30, 10);

    let array = [];
    order.map((orders, index) => {
      let row = [];
      row.push(index + 1);
      row.push(orders.user_id);
      row.push(orders.user_name);
      row.push(orders._id);
      row.push(orders.leave_name);
      row.push(orders.leave_price);
      row.push(orders.no_of_leave);
      row.push(orders.person_count);
      row.push(orders.total_price);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "User ID",
          "User Name",
          "Order Id",
          "Room Name",
          "Room Price",
          "No Of leave",
          "Person Count",
          "Total Price",
        ],
      ],

      body: array,
    });

    doc.save("leave_Booking.pdf");
    //window.location.reload();
  };

  //search button
  const sssearch = (inp) => {
    if (!inp.target.value) {
      SetOrder(baseData);
    } else {
      let searchList = baseData.filter(
        (data) =>
          data.user_name
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.leave_name.toLowerCase().includes(inp.target.value.toLowerCase())
      );
      SetOrder(searchList);
    }
  };

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
            href="/leave-dash"
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
            <a className="nav-link" href="/leave-dash">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
          <br />
          <div className="sidebar-heading">leave Management</div>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/add-new-leave">
                <button className="dropbtn">
                  <i className="fa fa-plus-circle" /> New leave
                </button>
              </Link>
            </div>
          </li>
          <br />
          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get-all-leave-details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/get_leave_order_details">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> leave Orders List
                </button>
              </Link>
            </div>
          </li>
          <br />

          <li className="nav-item">
            <div className="dropdown">
              <Link to="/check_all_leave_order_status">
                <button className="dropbtn">
                  <i className="fa fa-bars" /> Check leave Orders Status
                </button>
              </Link>
            </div>
          </li>
          <br />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand topbar mb-4 static-top">
              <h1 className="h3 mb-2 text-gray-800">All leave List</h1>
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
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
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <p className="mb-4">All leave List available in here.</p>
              <div className="row"></div>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-6">
                  <div>
                    <button
                      onClick={downloadReport}
                      style={{ marginLeft: 70, fontSize: 20 }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginLeft: 190 }}>
                    <input
                      type="search"
                      placeholder="Search.."
                      name="searchQuery"
                      style={{ height: 40 }}
                      onChange={search}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Check leave{" "}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th>leave Name</th>
                          <th>leave Price</th>
                          <th>Number of leaves</th>
                          <th>Person Count</th>
                          <th>Total </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Order ID</th>
                          <th> Name</th>
                          <th>leave Price</th>
                          <th>No </th>
                          <th>Person Count</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>

                      {order.length > 0 &&
                        order.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{item.user_id}</td>
                              <td>{item.user_name}</td>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.no}</td>
                              <td>{item.person_count}</td>
                              <td>{item.total}</td>

                              <td>
                                {item.isApprove === 2 && (
                                  <>
                                    <p className="p-1 mb-1  text-warning">
                                      Pending
                                    </p>
                                  </>
                                )}

                                {item.isApprove === 1 && (
                                  <>
                                    <p className="p-1 mb-1 text-success">
                                      Approved
                                    </p>
                                    <br />
                                  </>
                                )}

                                {item.isApprove === 0 && (
                                  <>
                                    <p className="p-1 mb-1 text-danger">
                                      Cancled
                                    </p>
                                    <br />
                                  </>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto text-black ">
                <span>Copyright © leave </span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
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
};
export default Leaves;


