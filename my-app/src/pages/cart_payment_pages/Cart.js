import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { ProductContext } from "../../Context/ProductContext";
import { BsPlusLg } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";
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
  const { fetchProductById } = useContext(ProductContext);
  const {session} = useContext(AuthSessionContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    showCart();
  }, [setCartItems, id]);

  const incruseQty = (item) => {
    if (!item) {
      console.log(item);
      return;
    }

    const newQty = item.quantity + 1;

    const updatedCart = cartItems.map((items) =>
      items.product_id === item.product_id
        ? { ...items, quantity: newQty }
        : items
    );

    setCartItems(updatedCart);

    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });

    console.log("New total", newTotal);
    setTotal(newTotal);

    if(!session){
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Varukorgen uppdaterad i localStorage");
    }else {
      updateCartQty(item.product_id, newQty);
    }
  };

  const reduceQty = (item) => {
    if (!item) {
      console.log(item);
      return;
    }
    const newQty = item.quantity - 1;

    const updatedCart = cartItems.map((items) =>
      items.product_id === item.product_id
        ? { ...items, quantity: newQty }
        : items
    );

    const filteredCart = updatedCart.filter((p) => p.quantity > 0);

    setCartItems(filteredCart);

    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });
    
    setTotal(newTotal);

    
    if(!session){
      localStorage.setItem("cart", JSON.stringify(filteredCart));

    } else {
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
