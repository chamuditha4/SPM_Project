/**This file contains implementation of salary page 
owned by IT19965550
Walpola S.R.
*/

//importing react and axios
import React, { Component } from "react";
import axios from "axios";

export default class ViewSalary extends Component {
  //creating constructor
  constructor(props) {
    super(props);

    //creating an array to store data
    this.state = {
      sals: [],
    };
  }

  //calling the method
  componentDidMount() {
    this.getData();
  }

  //creting a method for retrieve data
  getData() {
    axios.get("https://sigiri-furniture-app.herokuapp.com/sals").then((res) => {
      if (res.data.success) {
        this.setState({
          sals: res.data.existingPosts,
        });
        var x = this.state.sals[0].Amount;
        console.log(this.state.sals);
        console.log(x);
      }
    });
  }

  //function declarion for delete
  onDelete = (id) => {
    axios.delete(`https://sigiri-furniture-app.herokuapp.com/sals/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.getData();
    });
  };

  //adding components to the page body
  render() {
    return (
      <div className="container" id="height">
        <div>
          <div class="area"></div>
          <nav class="main-menu bg-primary">
            <ul>
              <li>
                <a href="/ViewFinancial">
                  <i class="fa fa-home fa-2x"></i>
                  <span class="nav-text">Daily Income</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/ViewBills">
                  <i class="fa fa-user-plus fa-2x"></i>
                  <span class="nav-text">Bill Payments</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/ViewPayments">
                  <i class="fa fa-user-plus fa-2x"></i>
                  <span class="nav-text">Other Payments</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/ViewSalary">
                  <i class="fa fa-user-plus fa-2x"></i>
                  <span class="nav-text"> Salary </span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/ViewLedger">
                  <i class="fa fa-user-plus fa-2x"></i>
                  <span class="nav-text"> Ledger </span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>

            <ul class="logout">
              <li>
                <a href="/">
                  <i class="fa fa-power-off fa-2x"></i>
                  <span class="nav-text">Logout</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h2 align="center">Salary</h2>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">EmpId</th>
              <th scope="col">No of Leaves</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.sals.map((sals, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{sals.EmpId}</td>
                <td>{sals.Leaves}</td>
                <td>{sals.Salary}</td>
                <td>
                  <a className="btn btn-success" href={`/add/${sals._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Add
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(sals._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}