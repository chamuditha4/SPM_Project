import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SelectAll from './Selectall/SelectAll';
import CartItem from './CartItem/CartItem';
import Summary from './Summary/Summary';
import PaymentDetail from './PaymentDetail/PaymentDetail';
import * as actionTypes from '../../Store/Actions';
import WindowLoadingSpinner from '../WindowLoadingSpinner/WindowLoadingSpinner';

import classes from "./Cart.module.css";

import axios from 'axios';
const $ = require('jquery');


class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {

      addedUserFirstName: '',
      addedUserLastName: '',
      addedUserEmail: '',
      totalItems: '',
      isAllItemsSelected: false,
      isCartLoading: true,

      buyerDetails: {
        firstName: 'Dinuan',
        lastName: 'kakakd',
        mobile: '76273',
        email: 'sjhsud'
      },

      diliverAddress: '',
      subPrice: '',
      totalPrice: '',
      totalDiscount: ''

    }
  }

  /////////////////////////////////////////// functions ///////////////////////////////////////////////////////
  // select all items in the cart
  componentDidMount = () => {
    const token = localStorage.userLoginToken;
    const decoded = jwt_decode(token);

    if (localStorage.getItem("userLoginToken") !== null) {

      const userBuyer = {
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        mobile: decoded.mobile,
        email: decoded.email
      }

      this.setState({
        addedUserFirstName: decoded.firstName,
        addedUserLastName: decoded.lastName,
        addedUserEmail: decoded.email,
        buyerDetails: userBuyer
      })
      console.log('Decoded Email in Cart : ', decoded.email);
    }

    // check if cart item already have
    if (this.props.theItems.length == 0) {
      console.log("reloaded cart");
      this.getCartItems(decoded.email);
    }

  }

  // USED REDUX
  getCartItems = (email) => {
    axios({
      method: 'get',
      url: `/api/cart/view/${email}`
    })
      .then(res => {
        let cartProducts = res.data;
        cartProducts.forEach((product, index) => {
          console.log(product);
        });
        this.props.updateItems(res.data);
        this.setState({ isCartLoading: false });
        console.log('Item Data : ', res.data)
        // this.setState({
        //   items: res.data
        // })
        console.log('Items details : ', this.props.theItems);
      })
  }


  selectAllHandler = () => {
    let tempItems = [...this.props.theItems];

    tempItems.forEach(item => {
      item.isSelectedItem = !this.props.isAllItemsSelected;
    });
    console.log(tempItems);

    // set summary
    let summary = this.setSummary(tempItems);

    this.props.select(tempItems, !this.props.isAllItemsSelected, summary);
    //this.setState({ items: tempItems, isAllItemsSelected: !this.state.isAllItemsSelected, cartSummary: summary });
  };

  // select single item in the cart - USED REDUX
  itemSelectHandler = (id) => {
    console.log(id);
    let tempItems = [...this.props.theItems];
    let allItemsSelected = true;
    tempItems.forEach(item => {
      if (item._id === id) {
        item.isSelectedItem = !item.isSelectedItem;
        if (!item.isSelectedItem) {
          allItemsSelected = false;
        }
      }
    });

    // set summary
    let summary = this.setSummary(tempItems);
    console.log("change " + summary);

    if (!allItemsSelected) {
      this.props.select(tempItems, false, summary);
      // this.setState({ items: tempItems, isAllItemsSelected: false, cartSummary: summary });
      return;
    }

    console.log(this.props.theItems);
    this.props.updateItemSummary(tempItems, summary);
    // this.setState({ items: tempItems, cartSummary: summary });
  };


  // remove an item from the cart - REDUX
  removeItem = (id) => {
    console.log(id);
    let tempItems;

    axios({
      method: 'delete',
      url: `/api/cart/remove/${id}`,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

    tempItems = this.props.theItems.filter(item => {
      if (item._id !== id) {
        return item;
      }
    });
    let summary = this.setSummary(tempItems);
    this.props.updateItemSummary(tempItems, summary);

  };

  // add an item to wishlist - REDUX
  moveToWishList = (item) => {
    console.log('move to wishlist', item);
    let tempItems;
    let moveItem;

    let itemId = item._id;

    axios({
      method: 'post',
      url: `/api/wishlist/add`,
      data: {
        itemName: item.itemName,
        price: item.price,
        category: item.category,
        itemImage: item.itemImage,
        size: item.size,
        brand: item.brand,
        discount: item.discount,
        addedUserFirstName: item.addedUserFirstName,
        addedUserLastName: item.addedUserLastName,
        addedUserEmail: item.addedUserEmail,
        rating: item.rating,
        quantity: item.quantity,
        company: item.company,
        isSelectedItem: false,
        totalPrice: 0,
        itemId: item.itemId,
        stockQuantity: item.stockQuantity

      }
    })
      .then(res => {
        axios({
          method: 'delete',
          url: `/api/cart/remove/${itemId}`,
        })
          .then(res => {
            console.log('Deleting Done')
          })
          .catch(err => {
            console.log('Deleting err')
          })
      })
      .then(() => {
        swal({
          title: "Done",
          text: "Moved to WishList",
          icon: 'success'
        });
      })
      .catch(err => {
        console.log(err)
      })


    tempItems = this.props.theItems.filter(item => {
      if (item._id !== itemId) {
        return item;
      } else {
        moveItem = item;
      }
    });

    // move item to wishlist schema in database
    //
    //

    // set summary
    let summary = this.setSummary(tempItems);
    this.props.updateItemSummary(tempItems, summary);
    // this.setState({ items: tempItems, cartSummary: summary });

  };

  // change quantity of an item - REDUX
  changeQuantity = (id, quantity) => {
    let tempItems = [...this.props.theItems];
    let subAmount = 0;
    let discount = 0;
    let isDisabled = true;
    let summary = {};

    tempItems.forEach(item => {
      if (item._id === id) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        if (item.isSelectedItem) {
          subAmount += item.price * quantity;
          discount += (item.price * quantity) * (item.discount / 100.0);
        }
      } else {
        if (item.isSelectedItem) {
          subAmount += item.price * item.quantity;
          discount += (item.price * item.quantity) * (item.discount / 100.0);
        }
      }
    });

    if (subAmount > 0) {
      isDisabled = false;
    }

    summary = {
      subtotal: subAmount,
      totalDiscount: discount,
      total: subAmount - discount,
      isDisabled: isDisabled
    };
    this.props.updateItemSummary(tempItems, summary);
    // this.setState({ items: tempItems, cartSummary: summary });

  };

  setSummary = (tempItems) => {
    let subAmount = 0;
    let discount = 0;
    let total = 0;
    let isDisabled = true;

    tempItems.forEach(item => {
      if (item.isSelectedItem) {
        subAmount += item.price * item.quantity;
        discount += (item.price * item.quantity) * (item.discount / 100.0);
      }
    });
    if (subAmount > 0) {
      isDisabled = false;
    }
    let summary = {
      subtotal: subAmount,
      totalDiscount: discount,
      total: subAmount - discount,
      isDisabled: isDisabled
    };

    return summary;
  };

  // when user clicked buy
  buy = () => {
    // selected items move to the checkout component

    setTimeout(() => {
      if (this.props.summary.subtotal > 0) {
        this.props.history.push({
          pathname: '/checkout',
        });
      }
    }, 3000);

  };

  render() {
    const body = document.body;
    if (this.state.isCartLoading) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }


    let content = (
      <div className={classes.subContainer}>
        <div className={classes.leftPanel}>
          <div className={classes.selectAll}>
            <SelectAll
              clicked={this.selectAllHandler}
              selected={this.props.isAllItemsSelected}
              totalItems={this.props.theItems.length} />
          </div>

          <div className={classes.cartItems}>
            {this.props.theItems.map(item =>
              <CartItem
                key={item._id}
                item={item}
                allSelected={this.props.isAllItemsSelected}
                select={this.itemSelectHandler}
                move={this.moveToWishList}
                remove={this.removeItem}
                changeQuantity={this.changeQuantity} />
            )}
          </div>

          <div className={classes.paymentDetail}>
            <PaymentDetail />
          </div>
        </div>

        <div id="rightPanel" className={classes.rightPanel} >
          <Summary buy={this.buy} />
        </div>


      </div>
    );

    // check cart is empty
    if (this.props.theItems.length == 0 && !this.state.isCartLoading) {
      content = (
        <div className={classes.emptyCart}>
          <img src={require('./assets/images/emptyCart.jpeg')} alt="Empty cart" />
          <h2>Your Shopping Cart is empty</h2>
          <a href="/">Start shopping now</a>
        </div>
      );
    }

    return (
      <div className={classes.container}>
        {this.state.isCartLoading && this.props.theItems.length == 0 ?
          <div className={classes.cartLoading}>
            <WindowLoadingSpinner />
          </div>
          : null
        }
        {content}
      </div>

    );
  }
}


$(window).scroll(function () {
  $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()));
});

$(document).ready(function () {
  $(this).scrollTop(0);
});

// $(window).scroll(function () {
//   $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()))
// });

const mapStateToProps = state => {
  return {
    theItems: state.items,
    summary: state.cartSummary,
    isAllItemsSelected: state.isAllItemsSelected,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateItems: (newItems) => dispatch({ type: actionTypes.UPDATE_ITEMS, newItems: newItems }),
    select: (items, isAllItemsSelected, summary) => dispatch({ type: actionTypes.SELECT, items: items, isAllItemsSelected: isAllItemsSelected, summary: summary }),
    updateItemSummary: (items, summary) => dispatch({ type: actionTypes.UPDATE_ITEMS_SUMMARY, items: items, summary: summary })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);