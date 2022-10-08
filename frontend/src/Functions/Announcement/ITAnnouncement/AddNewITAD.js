import '../index.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export default function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;
    //const subTotal = cartItems.reduce((c) => c.price * c.qty, 0);
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.05;
    const shippingPrice = itemsPrice > 2000 ? 0 : 100 && itemsPrice < 100 ? 50 : 100;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;



    const data = {

        // productId: data2.productId,
        // productName: data2.productName,
        // productPrice: data2.productPrice,
        // quantity: data2.quantity,


        // itemsPrice: itemsPrice,
        // taxPrice: taxPrice,
        // shippingPrice: shippingPrice,
        // totalPrice: totalPrice,

    }


    // for (let i = 0; i < cartItems.length; i++) {
    //     var data2 = {
    //         productId: cartItems[i].id,
    //         productName: cartItems[i].name,
    //         productPrice: cartItems[i].price,
    //         quantity: cartItems[i].qty
    //     }

    // }


    // for (let i = 0; i < cartItems.length; i++) {
    //     var data2 = {
    //         id: cartItems[i].id,
    //         name: cartItems[i].name,
    //         price: cartItems[i].price,
    //         qty: cartItems[i].qty
    //     }
    //     console.log(data2)
    // }


    //console.log(data2)

    // const  [{ 'id' , 'name'  }] = cartItems[0]
    //     console.log(id)


    // while (cartItems.length == 0) {
    //     for (const i = 0; i == cartItems.length; i++) {

    //         console.log(cartItems[i].name)
    //     }
    // }

    // const data2 = {
    //     id: cartItems[0].id,
    //     name: cartItems[0].name,
    //     qty: cartItems[0].qty
    // }

    function saveCart(e) {


        // for (let i = 0; i < cartItems.length; i++) {
        //     var data2 = {
        //         productId: cartItems[i].id,
        //         productName: cartItems[i].name,
        //         productPrice: cartItems[i].price,
        //         quantity: cartItems[i].qty
        //     }
        //     console.log(data2)

        //     axios.post(`/cart/add`, data2).then(() => {
        //         alert('cart added successfully');
        //     }).catch((err) => {
        //         alert(err);
        //     })
        // }



        for (let i = 0; i < cartItems.length; i++) {
            var data2 = {

                productId: cartItems[i].id,
                productName: cartItems[i].name,
                productPrice: cartItems[i].price,
                quantity: cartItems[i].qty,
                subTotal: cartItems[i].qty * cartItems[i].price,
                taxPrice: cartItems[i].qty * cartItems[i].price * 0.05,
                shippingPrice: cartItems[i].qty * cartItems[i].price > 2000 ? 0 : 100 && cartItems[i].qty * cartItems[i].price < 100 ? 50 : 100,
                totalPrice: (cartItems[i].qty * cartItems[i].price) + (cartItems[i].qty * cartItems[i].price * 0.05) + (cartItems[i].qty * cartItems[i].price > 2000 ? 0 : 100 && cartItems[i].qty * cartItems[i].price < 100 ? 50 : 100)

            }
            console.log(data2)





            axios.post(`/cart/add`, data2).then(() => {
                //alert('cart added successfully');
                //toast.success('Items Added Successfully', { position: toast.POSITION.TOP_CENTER })
            }).catch((err) => {
                alert(err);
            })

        }
        toast.success('Items Added Successfully', { position: toast.POSITION.TOP_CENTER })



        // itemsPrice: itemsPrice,
        // taxPrice: taxPrice,
        // shippingPrice: shippingPrice,
        // totalPrice: totalPrice,
        // totalPrice: totalPrice


        // .then(response => response.data);


    }
    //for check
    // if (cartItems[0]) {
    //     console.log(cartItems[0].id.name)
    // }
    // else if (cartItems[1]) {
    //     console.log(cartItems[1].name)
    // }
    // else if (cartItems[2]) {
    //     console.log(cartItems[2].name)
    // }

    console.log(data)
    //console.log(cartItems)
    // console.log(data2)



    return (
        <aside className="">
            <h2>YOUR BASKET</h2>
            <h6>
                <br></br>
                <div>{cartItems.length === 0 && <div style={{ textDecoration: 'none', color: 'red', fontSize: '20px' }}>Your Cart Is Empty...!<br></br>Please Add Some Items!</div>}</div>
                {cartItems.map((item) => (
                    <div key={item.id} className="row">
                        <div className="col-6">{item.name}</div>
                        <div className="col-2">
                            <i class="fas fa-minus-circle" onClick={() => onRemove(item)} style={{ color: 'red', fontSize: '20px' }}></i>&nbsp;
                            <i class="fas fa-plus-circle" onClick={() => onAdd(item)} style={{ color: 'red', fontSize: '20px' }}></i>
                        </div>
                        <div className="col-3 text-right">
                            {item.qty} x RS.{item.price.toFixed(2)}
                        </div>
                    </div>
                ))}
            </h6>

            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <h6>
                        <div className="row">
                            <div className="col-8">Items Price</div>
                            <div className="col-3 text-right">RS.{itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-8">Tax Price</div>
                            <div className="col-3 text-right">RS.{taxPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-8">Shipping Price</div>
                            <div className="col-3 text-right">RS.{shippingPrice.toFixed(2)}</div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-8"><strong>Total Price</strong></div>
                            <div className="col-3"><strong>RS.{totalPrice.toFixed(2)}</strong></div>
                        </div>
                        <hr></hr>
                        <div>
                            <div className="d-grid gap-2">
                                <Button varient="primary" onClick={e => saveCart()}>Add to My Orders</Button>
                            </div>
                        </div>
                        &nbsp;
                        <div>
                            <a href="/mycart" style={{ textDecoration: 'none' }}>
                                <div className="d-grid gap-2">
                                    <Button variant="outline-dark">View My Orders</Button>
                                </div>
                            </a>
                        </div>
                    </h6>
                </>
            )}

        </aside>
    );

}