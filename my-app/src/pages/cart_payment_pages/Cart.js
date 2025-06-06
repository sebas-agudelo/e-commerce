import React, { useContext, useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { ProductContext } from "../../Context/ProductContext";
import ShowCartItems from "../../components/ShowCartItems";

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    total,
    showCart,
    updateCartQty,
    setTotal,
  } = useContext(CartContext);
  const {session} = useContext(AuthSessionContext);
  const { fetchProductById } = useContext(ProductContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    showCart();
  }, [setCartItems, id]);

  const incruseQty = (item) => {
    if (!item) {
      return;
    }

    const newQty = item.quantity + 1;
    const totalPrice = item.unit_price * newQty;

    const updatedCart = cartItems.map((items) =>{
      if(items.product_id === item.product_id){
        return {
          ...items, 
          quantity: newQty, 
          total_price: totalPrice 
        }
      } else {
        return items
      }
    });

    
    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });
    
    setTotal(newTotal);
    setCartItems(updatedCart);

    if(!session){
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }else {
      updateCartQty(item.product_id, newQty);
    }
  };

  const reduceQty = (item) => {
    if (!item) {
      return;
    }
    const newQty = item.quantity - 1;
    const totalPrice = item.unit_price * newQty;

    const updatedCart = cartItems.map((items) =>{
      if(items.product_id === item.product_id){
        return {
          ...items, 
          quantity: newQty, 
          total_price: totalPrice 
        }
      } else {
        return items
      }
    });

    const filteredCart = updatedCart.filter((p) => p.quantity > 0);

    setCartItems(filteredCart);

    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });
    
    setTotal(newTotal);

    
    if(!session){
      localStorage.setItem("cart", JSON.stringify(filteredCart));

    } else if(session) {
      updateCartQty(item.product_id, newQty);
    }
  };

  return (
    <main className="cart-container">
      <section>
        <ShowCartItems 
        reduceQty={reduceQty}
        incruseQty={incruseQty}
        />
      </section>
    </main>
  );
}
