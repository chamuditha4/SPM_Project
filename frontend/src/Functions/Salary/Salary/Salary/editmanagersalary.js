import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AllProductPriceDetails() {

  const [productprices, setProductPrices] = useState([]);

  const [searchsaleid, setsearchsaleid] = useState("");

  useEffect(() => {
    if (document.getElementById('searchsaleid').clicked) {

      searchProductPriceID();

    } else {
      function getproductpricedetails() {
        axios.get("https://sigiri-furniture-app.herokuapp.com/productprice/getproductprice").then((res) => {
          console.log(res.data);
          setProductPrices(res.data);
        }).catch((err) => {
          alert(err.message);
        })
      }
      getproductpricedetails();
    }
  }, [])


  const deleteProductPrice = async salesid => {



    const answer = window.confirm("Are you sure you want to delete product price?");

    if (answer) {

      await axios.delete(`https://sigiri-furniture-app.herokuapp.com/productprice/deletedelete/${salesid}`);
      alert("Product Price delete Successfully");
      getPromotion();
        
    }
}


  function getPromotion() {
    axios.get("https://sigiri-furniture-app.herokuapp.com/productprice/getproductprice").then((res) => {
      setProductPrices(res.data);
    }).catch((error) => {
      alert(error.message);
    })

  }

  function searchProductPriceID(e) {
    e.preventDefault();
    axios.get(`https://sigiri-furniture-app.herokuapp.com/productprice/searchProductByID/${searchsaleid}`).then((res) => {
      console.log(res.data);
      setProductPrices(res.data);
    }).catch((err) => {
      alert(err.message);
    })

  }


  function refreshPage() {
    window.location.reload();
  }

  return (

    <div>

      <div style={{ position: "absolute", top: "18%", left: "8.5%", width: "20%", height: "10%", }}>
        <form onSubmit={searchProductPriceID} class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
            value={searchsaleid} onChange={(e) => { setsearchsaleid(e.target.value); }} />
          <button class="btn btn-outline-success mr-2" id="searchsaleid" type="submit">Search</button>
          <button class="fa fa-refresh btn btn-success " name="refresh" id="refresh" onClick={refreshPage}></button>
        </form>
      </div>

      <div style={{ position: "absolute", top: "18%", right: "0%", width: "20%", height: "10%", }}>

        <Link class="btn btn-info" class="fa fa-file-word-o fa-5x" role="button" to="/price/report" style={{ fontSize: 48 }}></Link>

      </div>
      <div style={{ paddingLeft: 130, marginTop: 200, paddingRight: 100 }}>
        <br></br>
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

        <h1 style={{ fontSize:30, top :70,fontFamily:"Georgia"}}>All Product Prices Details</h1><br></br>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" class="text-center">Sales ID</th>
              <th scope="col" class="text-center">Product ID</th>
              <th scope="col" class="text-center">Category</th>
              <th scope="col" class="text-center">Discount</th>
              <th scope="col" class="text-center">Price</th>
              <th scope="col" class="text-center">Discount Price</th>
              <th scope="col" class="text-center">New Price</th>
              <th scope="col" class="text-center">Quentity</th>
              <th scope="col" class="text-center">Action</th>

            </tr>
          </thead>
          <tbody>
            {productprices.map((productprices) => {
              return (
                <tr>
                  <td class="text-center">{productprices.salesid}</td>
                  <td class="text-center">{productprices.productid}</td>
                  <td class="text-center">{productprices.category}</td>
                  <td class="text-center">{productprices.discount}</td>
                  <td class="text-center">{productprices.price}</td>
                  <td class="text-center">{productprices.discountprice}</td>
                  <td class="text-center">{productprices.newprice}</td>
                  <td class="text-center">{productprices.quentity}</td>
                  <td class="text-center"><Link class="fa fa-arrow-right btn btn-info" role="button" to={`/getget/${productprices.salesid}`}></Link>
                    <Link class="fa fa-pencil-square-o btn btn-warning" role="button" to={`/updateupdate/${productprices.salesid}`}></Link>
                    <Link class="btn btn-danger fa fa-trash" role="button" onClick={() => deleteProductPrice(productprices.salesid)}></Link></td>

                </tr>
              )
            })}
          </tbody>

        </table>

        <Link class="btn btn-info" role="button" to="/addadd"> + ADD NEW PRODUCT PRICES </Link>

        <br></br>
        <br></br>

      </div>
    </div>

  )
}