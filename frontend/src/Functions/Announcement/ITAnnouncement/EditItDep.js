import React, { Component, Fragment } from 'react';
import ReviewMain from '../Review/ReviewMain/ReviewMain';
import './assets/css/single.css';
import swal from 'sweetalert';
import Axios from 'axios';
import jwt_decode from 'jwt-decode'
import Spinner from '../WindowLoadingSpinner/WindowLoadingSpinner';
import { Redirect } from 'react-router';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentDocuments: [],
      Size: 0,
      AverageStarRating: [0],
      AverageRating: 0,
      MyComments: [],
      MyLiked: [],
      MyDisliked: [],
      Rating: [0, 0, 0, 0, 0],
      userType: "Customer",

      itemImage: "",
      itemColors: [],
      StockQuantity:'',
      discount: 0,
      description: "",
      company: "",
      itemId: "",
      itemName: "",
      price:'',
      category: "",
      size: "",
      Brand: "",

      addedUserFirstName: '',
      addedUserLastName: '',
      addedUserEmail: '',
      addedDate: '',
      quantity: 1,
      isSelectedItem: false,
      totalPrice: 0,


      isLoading: true

    }

  }
  componentDidMount = () => {


    if (localStorage.getItem("userLoginToken") !== null) {
      const token = localStorage.userLoginToken;
      const decoded = jwt_decode(token);
      this.setState({
        addedUserFirstName: decoded.firstName,
        addedUserLastName: decoded.lastName,
        addedUserEmail: decoded.email,
      })
    }


    this.getItemDetails();
    this.getCommentData();
    this.getStarRating();
    this.getMyRating();

  }

  getItemDetails = () => {
    const itemId = this.props.match.params.id;
    const url = `/api/items/${itemId}`;
    Axios.get(url).then(res => {
      this.setState({
        itemImage: res.data.itemImage,
        itemColors: res.data.color,
        StockQuantity: res.data.stockQuantity,
        discount: res.data.discount,
        description: res.data.description,
        company: res.data.company,
        itemId: res.data._id,
        itemName: res.data.itemName,
        price: res.data.price,
        category: res.data.category,
        size: res.data.size,
        Brand: res.data.Brand,
        stockQuantity:res.data.stockQuantity,
        isLoading: false
      })

    }).catch(err => {
      window.location.href = "/404.html"

    })
  }

  getStarRating = () => {
    const { id } = this.props.match.params;
    const url = `/api/review/getRating/${id}`;
    Axios.get(url).then(res => {

      const AverageRating = res.data.AverageStarRating.toFixed(1);
      const AverageStarRating = [];
      for (let index = 1; index <= 5; index++) {
        if (Math.floor(res.data.AverageStarRating) >= index) {
          AverageStarRating.push(1);
        } else if ((index - res.data.AverageStarRating.toFixed(1)) <= 0.5) {
          AverageStarRating.push(0.5);
        } else {
          AverageStarRating.push(0);
        }
      }

      this.setState({
        AverageStarRating,
        AverageRating
      });


    });

  }

  getMyRating = () => {
    const { id } = this.props.match.params;
    const url = `/api/review/MyRating/${id}`;
    const token = localStorage.getItem('userLoginToken');
    if (token) {
      Axios.get(url,
        {
          headers:
          {
            Authorization: `bearer ${token}`
          }
        }).then(res => {
          const MyRating = [0, 0, 0, 0, 0];
          if (res.data.MyRating >= 1 && res.data.MyRating <= 5) {
            MyRating[res.data.MyRating - 1] = 1;
            this.setState({
              Rating: MyRating
            })
          } else {
            this.setState({
              Rating: MyRating
            })
          }

        }).catch(err => {
        });
    }

  }

  addRate = (value) => {
    if(localStorage.userLoginToken !== null){
    const MyRating = [];
    for (let index = 0; index < 5; index++) {
      if (value == index + 1) {
        MyRating.push(1);
      } else {
        MyRating.push(0);
      }
    }

    if (MyRating.length == 5) {
      this.setState({
        Rating: MyRating
      });
    }
  }
  else{
    window.location.href = '/login'
  }
  }
  confirmRate = () => {

    if(localStorage.userLoginToken !== null){

    const { id } = this.props.match.params;
    const url = `/api/review/newRating/${id}`;
    const token = localStorage.getItem('userLoginToken');
    if (token) {
      let data = {
        starRating: 0
      }
      for (let index = 0; index < 5; index++) {
        const element = this.state.Rating[index];
        if (element == 1) {
          data.starRating = (index + 1);
          break;
        }
      }
      if (data.starRating == 0) {
        return;
      }

      Axios.patch(url, data,
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }).then(res => {
          this.getStarRating();
          swal({
            title: "Status",
            text: res.data.msg,
            icon: "success"

          })
        }).catch(err => {
          swal({
            title: "Error!",
            text: err.message,
            icon: 'error'
          });
        });
    } else {
      swal({
        title: "Error!",
        text: "Login/Signup to Rate Items",
        icon: "error"
      });
    }
  }

  else{
    window.location.href = '/login'
  }
}
  getCommentData = () => {
    const { id } = this.props.match.params;
    const url = `/api/review/${id}`;
    const token = localStorage.getItem('userLoginToken');
    if (token) {
      Axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {

        const MyComments = res.data.myCommentID;
        const CommentDocuments = res.data.CommentDocuments;
        const Size = res.data.CommentDocuments.length;
        const MyLikedData = res.data.myLiked;
        const MyLiked = [];
        const MyDisliked = [];
        const userType = res.data.userType;
        if (userType) {
          this.setState({
            userType
          });
        }

        if (MyLikedData) {
          for (let index = 0; index < MyLikedData.length; index++) {
            if (MyLikedData[index].status == 1) {
              MyLiked.push(MyLikedData[index].reviewId);
            }
            if (MyLikedData[index].status == (-1)) {
              MyDisliked.push(MyLikedData[index].reviewId);
            }
          }
        }
        this.setState({
          CommentDocuments,
          Size,
          MyComments,
          MyLiked,
          MyDisliked
        });
      }).catch(err => {

        // swal({
        //   title: "Error",
        //   text: err.message,
        //   icon: 'error'
        // });
      })
    } else {
      Axios.get(url).then(res => {

        const CommentDocuments = res.data.CommentDocuments;
        const Size = res.data.CommentDocuments.length;
        this.setState({
          CommentDocuments,
          Size
        });
      }).catch(err => {
        // swal({
        //   title: "Error",
        //   text: err.message,
        //   icon: 'error'
        // });
      })
    }
  }



  addReview = () => {
    if(localStorage.userLoginToken !== null){
    const { id } = this.props.match.params;
    const url = `/api/Review/newReviewComment/${id}`;
    const token = localStorage.getItem('userLoginToken');
    if (token) {
      swal({
        title: "Add Review",
        content: {
          element: "input",
          attributes: {
            placeholder: "Add your review here"
          }
        }
      }).then(msg => {
        if (msg != "" && msg) {


          const data = {
            reviewMessage: msg
          }
          Axios.post(url, data, {
            headers: {
              Authorization: `bearer ${token}`
            }
          }).then(async res => {
            await swal({
              title: "Status",
              text: res.data.msg,
              icon: 'success'
            });
            this.getCommentData();
          }).catch(err => {
            swal({
              title: "Error!",
              text: err.message,
              icon: 'error'
            });
          });
        }
      });
    } else {
      swal({
        title: "Error!",
        text: "Login/Signup to Add Reviews to Items",
        icon: "error"
      });
    }
  }else{
    window.location.href='/login'
  }
}

  EditComment = async (id, editreview) => {
    const itemId = this.props.match.params.id;
    const url = `/api/Review/updateReviceComment/${itemId}`;
    const token = localStorage.getItem('userLoginToken');
    if (token) {
      let data = {
        reviewID: id,
        reviewMessage: editreview
      }
      await Axios.patch(url, data, {
        headers: {
          Authorization: `bearer ${token}`
        }
      }).then(res => {
        swal({
          title: "Status",
          text: res.data.msg,
          icon: 'success'
        });
      }).catch(err => {
        swal({
          title: "Error!",
          text: err.message,
          icon: 'error'
        });
      });
      this.getCommentData();
    } else {
      swal({
        title: "Error!",
        text: "Login/Signup to Edit Review",
        icon: "error"
      });
    }
  }
  DeleteComment = async (id, adminAccess) => {
    const itemId = this.props.match.params.id;
    const url = `/api/Review/deleteReviewComment/${itemId}`;

    const token = localStorage.getItem('userLoginToken');
    if (token) {

      await Axios.delete(url, {
        headers: {
          Authorization: `bearer ${token}`
        },
        data: {
          reviewID: id,
          adminAccess
        }
      }).then(res => {

        swal({
          title: "Status",
          text: res.data.msg,
          icon: 'success'
        });
      }).catch(err => {
        swal({
          title: "Error!",
          text: err.message,
          icon: 'error'
        });
      });
      this.getCommentData();
    } else {
      swal({
        title: "Error!",
        text: "Login/Signup to Delete Review",
        icon: "error"
      });
    }
  }

  redirectToCart = () => {
    this.props.history.push("/cart");
  };


  addProductintoCart = () => {
    Axios({
      method: 'post',
      url: `/api/cart/add`,
      data: {
        itemName: this.state.itemName,
        price: this.state.price,
        category: this.state.category,
        itemImage: this.state.itemImage,
        size: this.state.size,
        brand: this.state.brand,
        discount: this.state.discount,
        addedUserFirstName: this.state.addedUserFirstName,
        addedUserLastName: this.state.addedUserLastName,
        addedUserEmail: this.state.addedUserEmail,
        rating: this.state.rating,
        quantity: this.state.quantity,
        company: this.state.company,
        isSelectedItem: false,
        totalPrice: 0,
        stockQuantity:this.state.stockQuantity,
        itemId:this.props.match.params.id,
      }
    })
      .then(() => {
        swal({
          title: "Status",
          text: "Done",
          icon: 'success'
        });
      })
      .catch(err => {
        console.log(err)
      })
  }



  addToWishList = () =>{
 
    Axios({
      method: 'post',
      url: `/api/wishlist/add`,
      data: {
        itemName: this.state.itemName,
        price: this.state.price,
        category: this.state.category,
        itemImage: this.state.itemImage,
        size: this.state.size,
        brand: this.state.brand,
        discount: this.state.discount,
        addedUserFirstName: this.state.addedUserFirstName,
        addedUserLastName: this.state.addedUserLastName,
        addedUserEmail: this.state.addedUserEmail,
        rating: this.state.rating,
        quantity: this.state.quantity,
        company: this.state.company,
        isSelectedItem: false,
        totalPrice: 0,
        itemId:this.props.match.params.id,
        stockQuantity:this.state.stockQuantity
      }
    })
    .then(() => {
      swal({
        title: "Status",
        text: "Done",
        icon: 'success'
      });
    })
    .catch(err => {
      console.log(err)
    })

  }

  render() {
    return (

      this.state.isLoading === true ?
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12" style={{ margin: "10% auto" }}>
                <Spinner />
                {/* <div class="loader"></div> */}
                {/* <img src={require('./assets/images/loading2.gif')} type="image/gif" style={{ width: "50%", height: "25%", textAlign: "center" }} /> */}
              </div>
            </div>
          </div>
        </div> :
        <Fragment>
          <div className="products">
            <div className="container">
              <div className="single-page">
                <div className="single-page-row" id="detail-21">
                  <div className="col-md-6 single-top-left">
                    <div className="flexslider">
                      <ul className="slides">
                        <li data-thumb={this.state.itemImage ? this.state.itemImage : require("./assets/images/s1.jpg")}>
                          <div className="thumb-image detail_images">
                            {" "}
                            <img
                              src={this.state.itemImage ? this.state.itemImage : require("./assets/images/s1.jpg")}
                              data-imagezoom="true"
                              className="img-responsive"
                              alt=""
                            />{" "}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 single-top-right">
                    <h3 className="item_name"> {this.state.itemName} <span style={{ backgroundColor: "#00E58B" }} className="badge">{this.state.company}</span></h3>

                    <p>
                      Processing Time: Item will be shipped out within 2-3 working
                days.{" "}
                    </p>
                    <div className="single-rating">
                      <ul>
                        {
                          this.state.AverageStarRating.map((element) => (
                            <li data-toggle="modal" data-target="#myModal">
                              <i className={element == 1 ? "fa fa-star" : element == 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                            </li>
                          ))
                        }

                        <li className="rating">{this.state.AverageRating}</li>
                        <li className="rating"><a href="#headingThree">Reviews</a></li>
                        <li className="rating add-rating" data-toggle="modal" data-target="#myModal" >
                          <a>Rate Item</a>
                        </li>
                        <li>
                          <p className="add-review" onClick={() => this.addReview()}>Add your review</p>
                        </li>
                      </ul>
                    </div>
                    <div className="single-price">
                      <ul>
                        <li>{"LKR" + (this.state.price - this.state.price * this.state.discount / 100)}</li>
                        {this.state.discount == 0 ? "" :
                          <Fragment>
                            <li>
                              <del>{"LKR" + this.state.price}</del>
                            </li>

                            <li>
                              <span className="w3off">{this.state.discount + "%"} OFF</span>
                            </li>
                          </Fragment>
                        }
                      </ul>
                    </div>
                    <p className="single-price-text">
                      {this.state.description}{" "}
                    </p>
                    <form action="#" method="post">
                      <input type="hidden" name="cmd" value="_cart" />
                      <input type="hidden" name="add" value="1" />
                      <input type="hidden" name="w3ls1_item" value="Handbag" />
                      <input type="hidden" name="amount" value="540.00" />
                    </form>


{(localStorage.getItem("userLoginToken") !== null) &&
                    <button onClick={this.addProductintoCart}
                      className="w3ls-cart"
                    >
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                       Add to cart
              </button>
}


{(localStorage.getItem("userLoginToken") === null) &&
  <button disabled onClick={this.addProductintoCart}
    className="w3ls-cart"
  >
    <i className="fa fa-cart-plus" aria-hidden="true"></i>
     Add to cart
</button>
}

{(localStorage.getItem("userLoginToken") !== null) &&
                    <button className="w3ls-cart w3ls-cart-like" onClick={this.addToWishList}>
                      <i className="fa fa-heart-o" aria-hidden="true"></i> Add to
                Wishlist
              </button>
}

{(localStorage.getItem("userLoginToken") === null) &&
<button disabled className="w3ls-cart w3ls-cart-like" onClick={this.addToWishList}>
  <i className="fa fa-heart-o" aria-hidden="true"></i> Add to
Wishlist
</button>
}
                  </div>
                  <div className="clearfix"> </div>
                </div>
              </div>

              <div className="collpse tabs">
                <h3 className="w3ls-title">About this item</h3>
                <div
                  className="panel-group collpse"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                        <a
                          className="pa_italic"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <i
                            className="fa fa-file-text-o fa-icon"
                            aria-hidden="true"
                          ></i>{" "}
                    Description{" "}
                          <span
                            className="fa fa-angle-down fa-arrow"
                            aria-hidden="true"
                          ></span>{" "}
                          <i
                            className="fa fa-angle-up fa-arrow"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseOne"
                      className="panel-collapse collapse in"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                    >
                      <div className="panel-body">
                        {this.state.description}
                      </div>
                    </div>
                  </div>

                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingThree">
                      <h4 className="panel-title">
                        <a
                          className="collapsed pa_italic"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <i
                            className="fa fa-check-square-o fa-icon"
                            aria-hidden="true"
                          ></i>{" "}
                    Reviews {this.state.Size}{" "}
                          <span
                            className="fa fa-angle-down fa-arrow"
                            aria-hidden="true"
                          ></span>{" "}
                          <i
                            className="fa fa-angle-up fa-arrow"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseThree"
                      className="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                    >
                      <div className="panel-body">
                        <ReviewMain
                          CommentDocuments={this.state.CommentDocuments}
                          getCommentData={this.getCommentData}
                          MyComments={this.state.MyComments}
                          EditComment={this.EditComment}
                          DeleteComment={this.DeleteComment}
                          MyLiked={this.state.MyLiked}
                          MyDisliked={this.state.MyDisliked}
                          itemId={this.props.match.params.id}
                          userType={this.state.userType}
                          getCommentData={this.getCommentData}
                          company={this.state.company}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingFour">
                      <h4 className="panel-title">
                        <a
                          className="collapsed pa_italic"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <i
                            className="fa fa-question-circle fa-icon"
                            aria-hidden="true"
                          ></i>{" "}
                    help{" "}
                          <span
                            className="fa fa-angle-down fa-arrow"
                            aria-hidden="true"
                          ></span>{" "}
                          <i
                            className="fa fa-angle-up fa-arrow"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseFour"
                      className="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingFour"
                    >
                      <div className="panel-body">
                        Phasellus mauris lorem, efficitur ac lectus vel, convallis scelerisque
                        sapien. Proin dictum fermentum leo, ut ultricies risus rhoncus non.
                        Praesent mauris turpis, tempor elementum consectetur vel, luctus a metus.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ornare congue
                        rhoncus. Nunc quis cursus nisl. Suspendisse pulvinar lectus lacus, sit amet maximus
                        metus sollicitudin ut. In faucibus risus a lectus vulputate, vel ultrices lacus
                        porttitor. Duis et malesuada mi, ut laoreet quam. Sed ultrices interdum sem at
                        elementum. Sed quis arcu ac tortor gravida eleifend.
                </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header" style={{ textAlign: "right" }}>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true" style={{ float: "initial" }}>&times;</button>

                    {/* <h2 className="modal-title" id="myModalLabel">Please rate:</h2> */}
                    <div class="swal-title" style={{ paddingTop: "0" }} >Please rate</div>
                  </div>
                  <div className="modal-body">
                    <fieldset className="rating-stars">
                      {this.state.Rating.slice(0, 5).reverse().map((element, index, self) => (
                        <Fragment>
                          <input type="radio" id={"star" + (5 - index)}
                            name="rating-stars"
                            value={(5 - index)}
                            onChange={(e) => this.addRate(e.currentTarget.value)}
                            checked={element}
                          />
                          <label for={"star" + (5 - index)} title={(5 - index) + " Stars"}>{(5 - index)} star</label>
                        </Fragment>
                      ))}
                    </fieldset>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.confirmRate()}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>

    );
  }
}
export default SingleProduct;
