import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default class addNewItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      price: "",
      Brand: "",
      category: [],
      selectedCategory: "",
      size: "",
      stockQuantity: "",
      addedBy: "",
      description: "",
      itemImage: "",
      company: "",
    };
    this.onChange = this.onChange.bind(this);
    console.log("localstorage login token :", localStorage.userLoginToken);
  }

  onChange = (e) => {
    let value = e.target.value;
    const itemName = document.getElementById("itemName");
    const price = document.getElementById("price");
    const size = document.getElementById("size");
    const brand = document.getElementById("brand");
    const stockQuantity = document.getElementById("stockQuantity");
    const description = document.getElementById("description");

    const nameWarningList = document.getElementById("nameWarningList");
    const priceWarningList = document.getElementById("priceWarningList");
    const sizeWarningList = document.getElementById("sizeWarningList");
    const brandWarningList = document.getElementById("brandWarningList");
    const sqWarningList = document.getElementById("sqWarningList");
    const desWarningList = document.getElementById("desWarningList");

    switch (e.target.name) {
      case "itemName":
        this.checkFieldEmpty(
          itemName,
          value,
          nameWarningList,
          "Item name is required"
        );
        this.setState({
          itemName: value,
        });
        break;

      case "price":
        this.checkFieldEmpty(
          price,
          value,
          priceWarningList,
          "Item price is required"
        );

        if (!isNaN(value)) {
          if (Number.parseInt(value) > 0 || value[0] != "0") {
            if (price.style.border == "1px solid #ccc") {
              price.style.border = "1px solid #ccc";
              this.removeWarning(
                priceWarningList,
                "Invalid price value, should be greater than 0"
              );
            }
          } else {
            price.style.border = "1px solid red";
            this.addWarning(
              priceWarningList,
              "Invalid price value, should be greater than 0"
            );
          }

          // check if there are more than 1 '.' and more than 2 decimal places
          if (value.split(".").length - 1 <= 1) {
            let array = value.split(".");
            if (array.length == 2) {
              if (array[1].length > 2) {
                value = array[0] + "." + array[1].substring(0, 2);
              }
            }
            this.setState({
              [e.target.name]: value,
            });
          }
        }

        break;

      case "category":
        this.setState({
          [e.target.name]: value,
        });
        break;

      case "size":
        this.checkFieldEmpty(
          size,
          value,
          sizeWarningList,
          "Please select a size"
        );
        this.setState({
          [e.target.name]: value,
        });
        break;

      case "Brand":
        this.checkFieldEmpty(
          brand,
          value,
          brandWarningList,
          "Item brand is required"
        );
        this.setState({
          [e.target.name]: value,
        });
        break;

      case "stockQuantity":
        this.checkFieldEmpty(
          stockQuantity,
          value,
          sqWarningList,
          "Stockquantity is required"
        );

        if (!isNaN(value)) {
          if (Number.parseInt(value) > 0 || value[0] != "0") {
            if (stockQuantity.style.border == "1px solid #ccc") {
              stockQuantity.style.border = "1px solid #ccc";
              this.removeWarning(
                sqWarningList,
                "Stock Quantity should be greater than 0"
              );
            }
          } else {
            stockQuantity.style.border = "1px solid red";
            this.addWarning(
              sqWarningList,
              "Stock Quantity should be greater than 0"
            );
          }

          // check value contain '.' decimal places
          if (value.split(".").length - 1 < 1) {
            this.setState({
              [e.target.name]: value,
            });
          }
        }
        break;

      case "description":
        this.checkFieldEmpty(
          description,
          value,
          desWarningList,
          "Description is required"
        );
        this.setState({
          [e.target.name]: value,
        });
        break;

      default:
        console.log("no field match");
    }
  };

  checkFieldEmpty = (field, value, warningList, warning) => {
    if (value.length == 0 || value == undefined) {
      field.style.border = "1px solid red";
      this.addWarning(warningList, warning);
    } else {
      field.style.border = "1px solid #ccc";
      this.removeWarning(warningList, warning);
    }
  };

  addWarning = (warningList, warning) => {
    let hasNode = false;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML.toString() == warning) {
        hasNode = true;
      }
    });
    if (!hasNode) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(warning));
      warningList.appendChild(li);
    }
  };

  removeWarning = (warningList, warning) => {
    let hasNode = false;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML == warning) {
        hasNode = true;
      }
    });
    if (hasNode) {
      warningList.innerHTML = "";
    }
  };

  //image on Change
  onChangeImage = (e) => {
    const image = document.getElementById("itemImage");
    const imageWarningList = document.getElementById("imageWarningList");

    this.checkFieldEmpty(
      image,
      e.target.value,
      imageWarningList,
      "Please select a image"
    );
    this.setState({ itemImage: e.target.files[0] });
  };

  // this.setState({ category: [...this.state.category, category] });
  componentDidMount() {
    axios.get(`/api/category`).then((res) => {
      const items = res.data;
      console.log(items);
      let categoryInfo = items.map((item) => {
        console.log(item);
        return { categoryName: item.categoryName };
      });
      this.setState({
        category: categoryInfo,
      });
    });
  }

  onImageHandle = () => {
    let formData = new FormData();
    formData.append("image", this.state.itemImage);
    axios
      .patch(`/api/items/image/${this.state.itemName}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const itemName = document.getElementById("itemName");
    const price = document.getElementById("price");
    const size = document.getElementById("size");
    const brand = document.getElementById("brand");
    const image = document.getElementById("itemImage");
    const stockQuantity = document.getElementById("stockQuantity");
    const description = document.getElementById("description");

    const nameWarningList = document.getElementById("nameWarningList");
    const priceWarningList = document.getElementById("priceWarningList");
    const sizeWarningList = document.getElementById("sizeWarningList");
    const brandWarningList = document.getElementById("brandWarningList");
    const imageWarningList = document.getElementById("imageWarningList");
    const sqWarningList = document.getElementById("sqWarningList");
    const desWarningList = document.getElementById("desWarningList");

    this.checkFieldEmpty(
      itemName,
      this.state.itemName,
      nameWarningList,
      "Item name is required"
    );
    this.checkFieldEmpty(
      price,
      this.state.price,
      priceWarningList,
      "Item price is required"
    );
    this.checkFieldEmpty(
      size,
      this.state.size,
      sizeWarningList,
      "Please select a size"
    );
    this.checkFieldEmpty(
      brand,
      this.state.Brand,
      brandWarningList,
      "Item brand is required"
    );
    this.checkFieldEmpty(
      stockQuantity,
      this.state.stockQuantity,
      sqWarningList,
      "Stockquantity is required"
    );
    this.checkFieldEmpty(
      description,
      this.state.description,
      desWarningList,
      "Description is required"
    );

    // check size
    if (this.state.size.length == 0 || this.state.size == undefined) {
      size.style.border = "1px solid red";
      this.addWarning(sizeWarningList, "Please select a size");
    }

    // check image
    if (this.state.itemImage.length == 0 || this.state.itemImage == undefined) {
      image.style.border = "1px solid red";
      this.addWarning(imageWarningList, "Please select a image");
    }

    if (
      (this.state.itemName != "" || this.state.itemName.length != 0) &&
      this.state.price.length != 0 &&
      this.state.category.length != 0 &&
      this.state.size.length != 0 &&
      (this.state.Brand != "" || this.state.Brand.length != 0) &&
      (this.state.itemImage != "" || this.state.itemImage.length != 0) &&
      (this.state.description != "" || this.state.description.length != 0) &&
      itemName.style.border != "1px solid red" &&
      price.style.border != "1px solid red" &&
      size.style.border != "1px solid red" &&
      brand.style.border != "1px solid red" &&
      image.style.border != "1px solid red" &&
      stockQuantity.style.border != "1px solid red" &&
      description.style.border != "1px solid red"
    ) {
      const token = localStorage.userLoginToken;
      const decoded = jwt_decode(token);
      e.preventDefault();
      console.log(this.state.selectedCategory);
      console.log(this.state);

      axios
        .post("/api/items", {
          itemName: this.state.itemName,
          price: this.state.price,
          Brand: this.state.Brand,
          category: this.state.selectedCategory,
          size: this.state.size,
          stockQuantity: this.state.stockQuantity,
          addedBy: decoded.email,
          description: this.state.description,
          company: decoded.company,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          swal({
            title: "THANK YOU",
            text: "ITEM ADDED SUCESSFULLY",
            icon: "success",
            button: "OKAY",
          });
        })
        .catch(function (error) {
          console.log(error.response);
          swal({
            title: "Oops!!!",
            text: "Something went wrong",
            icon: "error",
            button: "Please Enter the Again",
          });
        });

      this.onImageHandle();
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>ADD NEW ITEM</h3>
            <form enctype="multipart/form-data" onSubmit={this.onSubmitHandler}>
              <div class="form-group">
                <label>Item Name</label>
                <input
                  id="itemName"
                  type="text"
                  class="form-control"
                  name="itemName"
                  placeholder="Item Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <ul
                  id="nameWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <div class="form-group">
                <label>Price</label>
                <input
                  id="price"
                  type="text"
                  class="form-control"
                  name="price"
                  placeholder="Price (LKR)"
                  value={this.state.price}
                  onChange={this.onChange}
                />
                <ul
                  id="priceWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <div
                className="input-group mb-3"
                style={{
                  width: "100%",
                  height: 30,
                  marginBottom: 20,
                }}
              >
                <label>Category</label>
                <select
                  className="form-control form-control-lg"
                  style={{ height: 40 }}
                  name="category"
                  required=""
                  onChange={(e) =>
                    this.setState({
                      selectedCategory: e.target.value,
                    })
                  }
                >
                  {this.state.category.map((cat) => (
                    <option value={cat.categoryName}>{cat.categoryName}</option>
                  ))}
                </select>

                <div className="clearfix"></div>
              </div>

              <div
                className="input-group mb-3"
                style={{
                  width: "100%",
                  height: 30,
                  marginBottom: 20,
                }}
              >
                <label>Size</label>
                <select
                  id="size"
                  className="form-control form-control-lg"
                  style={{ height: 40 }}
                  name="size"
                  required=""
                  onChange={this.onChange}
                >
                  <option value="">SIZE</option>
                  <option value="Extra Small">Extra Small</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                  <option value="No-Size">No-Size</option>
                </select>

                <div className="clearfix"></div>
                <ul
                  id="sizeWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>

              <div class="form-group">
                <label>Brand</label>
                <input
                  id="brand"
                  type="text"
                  class="form-control"
                  name="Brand"
                  placeholder="Brand"
                  value={this.state.Brand}
                  onChange={this.onChange}
                />
                <ul
                  id="brandWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <div class="form-group">
                <label>Image</label>
                <input
                  id="itemImage"
                  type="file"
                  class="form-control"
                  name="itemImage"
                  placeholder="itemImage"
                  onChange={this.onChangeImage}
                />
                <ul
                  id="imageWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <div class="form-group">
                <label>Stock Quantity</label>
                <input
                  id="stockQuantity"
                  type="text"
                  class="form-control"
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  value={this.state.stockQuantity}
                  onChange={this.onChange}
                />
                <ul
                  id="sqWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea
                  id="description"
                  rows="4"
                  cols="50"
                  type="text-area"
                  class="form-control"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <ul
                  id="desWarningList"
                  style={{
                    listStyle: "none",
                    color: "red",
                    paddingLeft: "1rem",
                    fontSize: "1.2rem",
                  }}
                ></ul>
              </div>
              <button class="btn btn-primary btn-block btn-lg ">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}