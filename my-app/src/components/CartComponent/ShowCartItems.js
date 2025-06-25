import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { BsPlusLg } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";

export default function ShowCartItems({ reduceQty, incruseQty }) {
  const { cartItems, total } = useContext(CartContext);

  return (
    <>
      {cartItems && cartItems.length === 0 ? (
        <article className="cart-content-empty">
          <div className="empty-cart-container">
            <h1>Varukorgen är tom</h1>
            <Link to={`/products`}>Till butiken</Link>
          </div>
        </article>
      ) : (
        <article className="cart-content">
          {cartItems.map((item) => (
            <article className="cart-items" key={item.product_id}>
              <article className="cart-title-img">
                <div className="cart-img">
                  <Link to={`/product/${item.product_id}`}>
                    <img src={item.product_img} alt={item.product_title} />
                  </Link>
                </div>
                <div className="cart-title-price">
                  <p className="cart-product-title">{item.product_title}</p>
                  <p className="cart-product-qty">Antal: {item.quantity}</p>
                </div>
              </article>

              <article className="qty-items">
                <p className="cart-item-price">{item.unit_price},00kr.</p>
                <div className="qty-btn">
                  <PiMinusThin onClick={() => reduceQty(item)} />
                  <p>{item.quantity}</p>
                  <BsPlusLg onClick={() => incruseQty(item)} />
                </div>
              </article>
              <div className="bor"></div>
            </article>
          ))}
        </article>
      )}

      {cartItems.length === 0 ? (
        ""
      ) : (
        <article className="checkout-container">
          <>
            <p>Summa: {total ? `${total},00kr.` : "0"}</p>
            <button className="checkout-btn">
              <Link to={`/checkout`}>Till kassan</Link>
            </button>
          </>
        </article>
      )}
    </>
  );
}
