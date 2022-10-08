/**This file contains implementation of daily income page 
owned by IT19965550
Walpola S.R.
*/

//importing react and axios
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

//create constant for path
const HOST = "https://sigiri-furniture-app.herokuapp.com";

export default function ViewFinancialDetails () {
  
  const [income, setState] = useState([]);

  

  //creting a method for retrieve data
  useEffect(() => {
    axios
      .get(HOST + "/order/displayOrders")
      .then((res) => {
        setState(res.data);
        console.log("Data has been received");
      })
      .catch(() => {
        alert("Error in retrieving data");
      });
  }, []);


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
        <div class="DailyIncomeTable">
        <MaterialTable style={{background:"#E3ECFF"}}
          title="Daily Income"
          columns={[
            { title: "Order ID", field: "orderId", type: "string" },
            { title: "Date", field: "oDate", type: "string" },
            { title: "Amount", field: "finalPrice", type: "number" }

          ]}
          data={income}
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            exportButton: true,
          }}
          
          />
      </div>
      </div>
    
    );
}      