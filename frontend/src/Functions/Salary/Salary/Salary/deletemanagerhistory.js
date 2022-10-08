import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UpdatePromotionDetails() {
  const { salesid } = useParams();
  let history = useHistory();

  const [salesID, setsalesID] = useState("");
  const [productid, setProductid] = useState("");
  const [category, setCategory] = useState("");
  const [starting_date, setStarting_date] = useState("");
  const [clossing_date, setClossing_date] = useState("");
  const [discount, setdiscount] = useState("");
  const [price, setprice] = useState("");
  const [discountprice, setdiscountprice] = useState("");
  const [newprice, setnewprice] = useState("");
  const [quentity, setquentity] = useState("");

  useEffect(() => {
    loadProductPricesDetails();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const newProductPrices = {
      salesid, productid, category, starting_date, clossing_date, discount, price, discountprice, newprice, quentity

    }

    await axios.put(`https://sigiri-furniture-app.herokuapp.com/productprice/updateupdate/${salesid}`, newProductPrices).then(() => {
      alert("Product Price details update Successfully")
    }).catch((err) => {
      alert(err);
    })

  }

  const loadProductPricesDetails = async () => {
    await axios.get(`https://sigiri-furniture-app.herokuapp.com/productprice/getget/${salesid}`).then((res) => {
      console.log(res.data);
      setsalesID(res.data.productprices.salesid);
      setProductid(res.data.productprices.productid);
      setCategory(res.data.productprices.category);
      setStarting_date(res.data.productprices.starting_date);
      setClossing_date(res.data.productprices.clossing_date);
      setdiscount(res.data.productprices.discount);
      setprice(res.data.productprices.price);
      setdiscountprice(res.data.productprices.discountprice);
      setnewprice(res.data.productprices.newprice);
      setquentity(res.data.productprices.quentity);

    }).catch((err) => {
      alert(err.message);
    })
  };



  return (
    <div>

      <div>
        <div>
          <nav class="main-menu bg-primary">
            <ul>
              <li>
                <a href="/allview">
                  <i class="fa fa-home fa-2x"></i>
                  <span class="nav-text">Home</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>

              <li>
                <a href="/allview">
                  <i class="fa fa-table fa-2x"></i>
                  <span class="nav-text">View Promotions</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/addpromotion">
                  <i class="fa fa-plus-circle fa-2x"></i>
                  <span class="nav-text">Add Promotions</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <hr></hr>
              <li class="has-subnav">
                <a href="/getproductprice">
                  <i class="fa fa-dollar fa-2x"></i>
                  <span class="nav-text">View Product Prices</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li class="has-subnav">
                <a href="/addadd">
                  <i class="fa fa-plus-circle fa-2x"></i>
                  <span class="nav-text">Add Product Prices</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <hr></hr>

              <li>
                <a href="/promotion/report">
                  <i class="fa fa-file-pdf-o fa-2x"></i>
                  <span class="nav-text">Promotion Report</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="/price/report">
                  <i class="fa fa-file-pdf-o fa-2x"></i>
                  <span class="nav-text">Price Report</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>

            <ul class="logout">
              <li>
                <a href="/">
                  <i class="fa fa-power-off fa-2x"></i>
                  <span class="nav-text" >Logout</span>
                  <i class="fa fa-angle-right fa-2x"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="container" style={{ width: 800, marginTop: 120 }}>
        
        <div className="border border-info" style={{ marginBottom: 60, backgroundColor: "#e7ebe8" }} >


          <form onSubmit={onSubmit} style={{ marginTop: 50, marginLeft: 30, marginRight: 30, height: 910 }}>
          <h1 style={{ fontSize:30, top :70,fontFamily:"Georgia",textAlign:"center"}}>Update Product prices Details</h1><br></br>
            <div className="mb-3">
              <label for="salesid" >sales ID</label>
              <input type="text" className="form-control" id="salesid" value={salesid} onChange={(e) => {
                setsalesID(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="productid" >Product ID</label>
              <input type="text" className="form-control" id="productid" pattern="PI[0-9]{3}" value={productid} onChange={(e) => {
                setProductid(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="category" >Category</label>
              <input type="text" className="form-control" id="category" value={category} onChange={(e) => {
                setCategory(e.target.value);
              }} />

            </div>

            <div className="row">
              <div className="col">
                <label for="starting_date" >Starting Date</label>
                <input type="date" class="form-control" id="starting_date" value={starting_date} onChange={(e) => {
                  setStarting_date(e.target.value);
                }} />

              </div>

              <div className="col">
                <label for="clossing_date" >Closing Date</label>
                <input type="date" class="form-control" id="clossing_date" value={clossing_date} onChange={(e) => {
                  setClossing_date(e.target.value);
                }} />

              </div>
            </div>

            <br></br>
            <div className="mb-3">
              <label for="discount" >Discount</label>
              <input type="text" className="form-control" id="discount" value={discount} onChange={(e) => {
                setdiscount(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="price" >Price</label>
              <input type="text" className="form-control" id="price" value={price} onChange={(e) => {
                setprice(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="discountprice" >Discount Price</label>
              <input type="text" className="form-control" id="discountprice" value={discountprice} onChange={(e) => {
                setdiscountprice(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="newprice" >New Price</label>
              <input type="text" className="form-control" id="newprice" value={newprice} onChange={(e) => {
                setnewprice(e.target.value);
              }} />

            </div>

            <div className="mb-3">
              <label for="quentity" >Quentity</label>
              <input type="number" className="form-control" id="quentity" value={quentity} onChange={(e) => {
                setquentity(e.target.value);
              }} />

            </div><br></br>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-outline-info" >Update Product Prices</button>
              <Link className="btn btn-outline-info ml-2" role="button" to="/getproductprice">View All Product Prices List </Link>
            </div>
          </form><br></br>
        </div>
      </div>
    </div>

  );

};