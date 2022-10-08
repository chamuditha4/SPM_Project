/**This file contains implementation of payments details page 
owned by IT19965550
Walpola S.R.
*/

import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Modal } from "react-bootstrap";
import axios from "axios";
import EditPaymentForm from "./EditPaymentForm";

//create constant for path
const HOST = "https://sigiri-furniture-app.herokuapp.com";

export default function Viewpayments() {
 

  const [payment, setState] = useState([]);

  
  const [modalPaymentUpdate, setModalPaymentUpdate] = useState(false);
  const [currentPaymentUpdate, setCurrentPaymentUpdate] = useState();

  const [ModalPaymentDelete, setModalPaymentDelete] = useState(false);
  const [currentPaymentDelete, setCurrentPaymentDelete] = useState();



  //creting a method for retrieve data
  useEffect(() => {
    axios
      .get(HOST + "/payments")
      .then((res) => {
        setState(res.data);
      })
      .catch(() => {
        alert("Error in retrieving data");
      });
  }, []);

   //Delete method implementation
  function onDelete() {
    axios
      .delete(HOST + "/payments/delete/" + currentPaymentDelete)
      .then((res) => {
        alert("Deleted Successfully!");
        window.location.reload(true);
      })
      .catch(() => {
        alert("Deleted Successfully");
      });
  }

  //adding components to the page body
    return (
      /* side navigtaion bar components*/
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

        {/* implementing the meterial table for display data */}
        
        <div class="OtherPaymentTable">
        <MaterialTable style={{background:"#E3ECFF"}}
          title="Other Payments"
          columns={[
            { title: "Description", field: "Description", type: "string" },
            { title: "Date", field: "Date", type: "string" },
            { title: "Amount", field: "Amount", type: "number" }

          ]}
          data={payment}
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            exportButton: true,
          }}
          actions={[
            {
              icon: () => (
                <button class="btn btn-sm btn-warning">Edit</button>
              ),
              onClick: (event, rowData) => {
                setCurrentPaymentUpdate(rowData);
                setModalPaymentUpdate(true);
              },
            },
            {
              icon: () => <button class="btn btn-sm btn-danger">Delete</button>,
              onClick: (event, rowData) => {
                setCurrentPaymentDelete(rowData._id);
                setModalPaymentDelete(true);
              },
            },
          ]}
          
          />
      </div>
      <div>
      <Modal show={modalPaymentUpdate}>
        <Modal.Body>
          <EditPaymentForm
            data={currentPaymentUpdate}
            data01={() => setModalPaymentUpdate(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal show={ModalPaymentDelete}>
        <Modal.Body>
          <p>Are you want to delete this item ?</p>
          <button type="button" class="btn btn-success mr-3" onClick={onDelete}>
            Delete Item
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => setModalPaymentDelete(false)}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>
      </div>
      <button class="btn btn-success"
      style={{ marginBottom: "20px" }}>
          <a
            href="/AddPayment"
            style={{ textDecoration: "none", color: "white" }}
          >
            {" "}
            Add Payment details
          </a>
        </button>


      </div>
      
    );
  }