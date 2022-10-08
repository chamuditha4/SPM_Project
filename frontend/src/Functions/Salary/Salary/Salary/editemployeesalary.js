/**This file contains implementation of ledger page 
owned by IT19965550
Walpola S.R.
*/

//importing react and axios
import React, { useState, useEffect } from "react"; 
import MaterialTable from "material-table";
import axios from "axios";

//create constant for path
const HOST = "https://sigiri-furniture-app.herokuapp.com";

//export default class ViewLedger extends Component
export default function ViewLedger() {


   const [ledger, setState] = useState([]);

  //creting a method for retrieve data
   useEffect(() => {
    axios
      .get(HOST + "/ledgers")
      .then((res) => {
        setState(res.data);
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
          <div className="area"></div>
          <nav className="main-menu bg-primary">
            <ul>
              <li>
                <a href="/ViewFinancial">
                  <i className="fa fa-home fa-2x"></i>
                  <span className="nav-text">Daily Income</span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li className="has-subnav">
                <a href="/ViewBills">
                  <i className="fa fa-user-plus fa-2x"></i>
                  <span className="nav-text">Bill Payments</span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li className="has-subnav">
                <a href="/ViewPayments">
                  <i className="fa fa-user-plus fa-2x"></i>
                  <span className="nav-text">Other Payments</span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li className="has-subnav">
                <a href="/ViewSalary">
                  <i className="fa fa-user-plus fa-2x"></i>
                  <span className="nav-text"> Salary </span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li className="has-subnav">
                <a href="/ViewLedger">
                  <i className="fa fa-user-plus fa-2x"></i>
                  <span className="nav-text"> Ledger </span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>

            <ul className="logout">
              <li>
                <a href="/">
                  <i className="fa fa-power-off fa-2x"></i>
                  <span className="nav-text">Logout</span>
                  <i className="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* implementing the meterial table for display data */}
        <div className="LedgerTable">
        <MaterialTable style={{background:"#E3ECFF"}}
          title="Ledger"
          columns={[
            { title: "Date", field: "Date", type: "string" },
            { title: "Order Id", field: "OrderId", type: "string" },
            { title: "Amount", field: "Amount", type: "number" },
            { title: "Date", field: "lDate", type: "string" },
            { title: "Description", field: "Description", type: "string" },
            { title: "Amount", field: "lAmount", type: "number" },
           

          ]}
          data={ledger}
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