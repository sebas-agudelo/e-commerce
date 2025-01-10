import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { AuthSessionContext } from "../../Context/SessionProvider";

export default function Cart() {
  const {clearCart, cartItems, setCartItems, showCart, } = useContext(CartContext);
  const {session} = useContext(AuthSessionContext);
  

  useEffect(() => {
    showCart()
  }, [setCartItems]);

  if(cartItems.length === 0){
    return <h3>Varukorgen är tom</h3>
  }
  return (
    <div style={{paddingTop: "55px"}}>
      {cartItems.map((item) => (
        <div key={item.product_id}>
          <h3>{item.product_title}</h3>
          <h3>{item.unit_price}</h3>
          <img style={{width: "55px"}} src={item.product_img} alt={item.product_title}/>
          <p>Antal: {item.quantity}</p>
        </div>
      ))}
        <Link to={`/checkout`}>{cartItems.length > 0 ? "checkout" : ""}</Link>     
        <button onClick={() => clearCart()}>{cartItems.length > 0 ? "Ta bort" : ""}</button>  
    </div>
  );
}
