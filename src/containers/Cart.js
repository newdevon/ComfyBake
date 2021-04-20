import React, { useState } from 'react';
import firebase from '../firebase';
import './Cart.css';
// import Products from './Product';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Display from './DisplayGrid';
const user = "user1";

const PAGE_PRODUCTS = 'products';

//const db = database.firestore();
//const storage = database.storage();

const PAGE_CART = 'cart'
const senderEmail = "cbakeTeam@gmail.com"
const templateId = "template_j303hv9"
const Email = "franciscor343@gmail.com"
const FirstName = "franciscor343@gmail.com"
const LastName = "franciscor343@gmail.com"



function Cart(){
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState ('products');
    const [test, setTest] = useState([]);


    const addToCart = (product) => {
        setCart([...cart, {...product}]);
    };

    const navigateTo = (nextPage) => {
        setPage(nextPage);
    };

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product !== productToRemove))
    }

    const handleSumbit = (e) =>{
        sendFeedback({
            templateId,
            senderEmail,
            receiverEmail:Email,
            FirstName,
            LastName,
          })
        e.preventDefault();
        //here we should probably change the status of the order so that the cart empties
        // and all of the information goes from the cart to the order history page
    }
    const sendFeedback = ({
        templateId,
        senderEmail,
        receiverEmail,
        FirstName,
        LastName,
      }) => {
        window.emailjs
          .send(
            "default_service",
            templateId,
            {
              senderEmail,
              receiverEmail,
              FirstName,
              LastName,
            },
          )
          .then(res => {
            if (res.status === 200) {
              //setFormSubmitSuccessful(true)
            }
          })
          // Handle errors here however you like
          .catch(err => console.error("Failed to send feedback. Error: ", err))
      }
      


      // firebase.database().ref().child("user").child(user).get().then((snapshot)=>{
      //   setTest(snapshot.val().name)
      // })

      

// render everything that has been added to the cart
    const renderCart = () => (
        <div className='back_home_btn'>
            <button onClick={() => navigateTo(PAGE_PRODUCTS)}> Back to home </button>
            
            <h2 className="cart-title">Shopping cart</h2>


            {/* <input type='text' onChange={handleOnChange} value={title}></input>
            <button onClick={createToDo}> ADD</button> */}


            <div className="products">
                    {/* <table className="table">
                      <th>Name</th>
                      <th>Price</th>
                      <th>Price</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </table> */}

                    <p>here {test}</p>
                    <tbody id="tableProducts">
                      {cart.map((product)=> (
                        <table className="table">
                        
                          <th><img src={product.ImageUrl} /></th>
                          <th>{product.Foodname}</th>
                          <th>{product.Price}</th>
                          <th><button onClick={() => removeFromCart(product)}> Revome </button></th>
                        </table>
                      ))}
                    </tbody>
                    <tfoot id="total">
                      <p>Total</p>
                    </tfoot>

                {cart.map((product) => (
                <div className="product" >
                    {/* <img src={product.ImageUrl}/>
                    <h3>{product.Foodname}</h3>
                    <h4>${product.Price}</h4> */}
                    
                    {/* <button onClick={() => removeFromCart(product)}> Remove </button> */}
                
                </div>
            ))}
            </div>
            <br/> <br/> <br/>
            <button className="checkoutBtn" onclick={handleSumbit}>Checkout</button>
        </div>
    );

    return(
        <div className="cart">
        {/* <Link onClick={() => navigateTo(PAGE_CART)} className="cart-link" to="/orders/cart">View Cart 🛒 ({cart.length})</Link> */}
        <br/><br/><br/><br/>
        <header>
            {/* <button onClick={() => navigateTo(PAGE_CART)}>Cart holder ({cart.length})</button> */}
            <Link onClick={() => navigateTo(PAGE_CART)} className="cart-link" to="/orders/cart">View Cart 🛒 ({cart.length})</Link>
            {/* <button onClick={() => navigateTo(PAGE_CART)}> Go to Cart ({cart.length})</button> */}
            <br/><br/><br/><br/>
        </header>
        {/* {page === PAGE_PRODUCTS && <Products addToCart={addToCart}/>} */}
        {page === PAGE_PRODUCTS && <Display addToCart={addToCart}/>}
        {page === PAGE_CART && renderCart()}
        
        </div>
    )
};

export default Cart;