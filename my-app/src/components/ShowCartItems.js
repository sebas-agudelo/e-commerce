import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { BsPlusLg } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";

export default function ShowCartItems({reduceQty, incruseQty}) {
  const { cartItems, total } = useContext(CartContext);

  return (
    <>
      <article className="cart-content">

        {cartItems.length <= 0 ? (
          <>
            <div className="empty-cart-container">
              <h1>Varukorgen är tom</h1>
              <Link to={`/products`}>Till butiken</Link>
            </div>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <>
                <article className="cart-items" key={item.product_id}>
                  <article className="cart-title-img">
                    <div className="cart-img">
                      <Link to={`/product/${item.product_id}`}>
                        <img src={item.product_img} alt={item.product_title} />
                      </Link>
                    </div>

                    <div className="cart-title-price">
                      <p>{item.product_title}</p>
                      <p>{item.unit_price}.-</p>
                    </div>
                  </article>

                  <article className="qty-items">
                    <div className="qty-btn">
                      <PiMinusThin onClick={() => reduceQty(item)} />
                      <p>{item.quantity}</p>
                      <BsPlusLg onClick={() => incruseQty(item)} />
                    </div>

                    <p className="cart-item-price">{item.unit_price}</p>
                  </article>
                  <div className="bor"></div>
                </article>
              </>
            ))}
          </>
        )}
      </article>

      <article className="checkout-container">
        {cartItems.length > 0 ? (
          <>
            <p>Summa: {total ? total : "0"}</p>

            <button className="checkout-btn">
              <Link to={`/checkout`}>Till kassan</Link>
            </button>
          </>
        ) : (
          ""
        )}
      </article>
    </>
  );
}
