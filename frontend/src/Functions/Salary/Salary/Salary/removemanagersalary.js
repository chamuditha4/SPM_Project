import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AllPromotionDetails() {

  const [promotions, setPromotions] = useState([]);

  const [searchproid, setsearchproid] = useState("");

  useEffect(() => {

    if (document.getElementById('searchid').clicked) {

      searchPromotionByID();

    } else { //normally the fetched promotion details are here

      function getpromotiondetails() {
        axios.get("https://sigiri-furniture-app.herokuapp.com/promotion/").then((res) => {
          console.log(res.data);
          setPromotions(res.data);
        }).catch((err) => {
          alert(err.message);
        })
      }
      getpromotiondetails();
    }

  }, [])

  const deletePromotion = async promotionid => {



    const answer = window.confirm("Are you sure you want to delete promotion?");

    if (answer) {

      await axios.delete(`https://sigiri-furniture-app.herokuapp.com/promotion/delete/${promotionid}`);
    alert("Promotion delete Successfully");
    getPromotion();
        
    }
}

 
  function getPromotion() {
    axios.get("https://sigiri-furniture-app.herokuapp.com/promotion/").then((res) => {
      setPromotions(res.data);
    }).catch((error) => {
      alert(error.message);
    })

  }

  function searchPromotionByID(e) {
    e.preventDefault();
    axios.get(`https://sigiri-furniture-app.herokuapp.com/promotion/searchPromotionByID/${searchproid}`).then((res) => {
      console.log(res.data);
      setPromotions(res.data);
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
        <form onSubmit={searchPromotionByID} class="d-flex" >
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
            value={searchproid} onChange={(e) => { setsearchproid(e.target.value); }} />
          <button class="btn btn-outline-success mr-2" id="searchid" type="submit" value="submit">Search</button>
          <button class="btn btn-success fa fa-refresh " name="refresh" id="refresh" onClick={refreshPage}></button>
        </form>

      </div>

      <div style={{ position: "absolute", top: "18%", right: "0%", width: "20%", height: "10%", }}>

        <Link class="btn btn-info" class="fa fa-file-word-o fa-5x" role="button" to="/promotion/report" style={{ fontSize: 48 }}></Link>

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

        <h1 style={{ fontSize:30, top :70,fontFamily:"Georgia" }}>All Promotion Details</h1><br></br>

        <table class="table table-striped table-hover " >
          <thead>
            <tr>
              <th scope="col" class="text-center">Promotion ID</th>
              <th scope="col" class="text-center">Product ID</th>
              <th scope="col" class="text-center">Category</th>

              <th scope="col" class="text-center">Description</th>
              <th scope="col" class="text-center">Media</th>
              <th scope="col" class="text-center">Budget</th>
              <th scope="col" class="text-center">Status</th>
              <th scope="col" class="text-center">Action</th>

            </tr>
          </thead>
          <tbody>
            {promotions.map((promotions) => {
              return (
                <tr>
                  <td class="text-center">{promotions.promotionid}</td>
                  <td class="text-center">{promotions.productid}</td>
                  <td class="text-center">{promotions.category}</td>
                  <td class="text-center">{promotions.description}</td>
                  <td class="text-center">{promotions.media}</td>
                  <td class="text-center">{promotions.budget}</td>
                  <td class="text-center">{promotions.status}</td>
                  <td class="text-center"><Link class="fa fa-arrow-right  btn btn-info " role="button" to={`/get/viewpromotion/${promotions.promotionid}`}>  </Link>
                    <Link class="fa fa-pencil-square-o  btn btn-warning " role="button" to={`/update/promotion/${promotions.promotionid}`}></Link>
                    <Link class="btn btn-danger fa fa-trash" role="button" onClick={() => deletePromotion(promotions.promotionid)} ></Link></td>

                </tr>
              )
            })}
          </tbody>

        </table>

        <Link class="btn btn-info" role="button" to="/addpromotion"> + ADD NEW PROMOTION </Link>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>
    </div>
  )

}