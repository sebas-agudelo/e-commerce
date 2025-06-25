import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { ProductContext } from "../../Context/ProductContext";
import ShowCartItems from "../../components/CartComponent/ShowCartItems";
import Footer from "../Footer";
import CartRemoveProductConfirm from "../../components/CartComponent/CartRemoveProductConfirm";
// let productTodelete = null;

export default function Cart() {
  const { cartItems, setCartItems, total, showCart, updateCartQty, setTotal } =
    useContext(CartContext);
  const { session } = useContext(AuthSessionContext);
  const { fetchProductById } = useContext(ProductContext);
  const [showDelMessage, setShowDelMessage] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { id } = useParams();



  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    showCart();
  }, [setCartItems, id]);


 const handleConfirmDelete = () => {
  if (!productToDelete){
    return;
  };

  const updatedCart = cartItems.filter(
    (p) => p.product_id !== productToDelete.product_id
  );

  setCartItems(updatedCart);

  let newTotal = 0;
  updatedCart.forEach((p) => {
    newTotal += p.quantity * p.unit_price;
  });
  setTotal(newTotal);

  if (!session) {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    updateCartQty(productToDelete.product_id, 0); 
  }

  setShowDelMessage(false);
  setProductToDelete(null);
};


  const handleCancelDeleteProduct = () => {
    setShowDelMessage(false);
     setProductToDelete(null);
  };

  const incruseQty = (item) => {
    if (!item) {
      return;
    }

    const newQty = item.quantity + 1;
    const totalPrice = item.unit_price * newQty;

    const updatedCart = cartItems.map((items) => {
      if (items.product_id === item.product_id) {
        return {
          ...items,
          quantity: newQty,
          total_price: totalPrice,
        };
      } else {
        return items;
      }
    });

    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });

    setTotal(newTotal);
    setCartItems(updatedCart);

    if (!session) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      updateCartQty(item.product_id, newQty);
    }
  };

  const reduceQty = (item) => {
    if (!item) {
      return;
    }
    const newQty = item.quantity - 1;
    const totalPrice = item.unit_price * newQty;

    console.log(newQty);
    

     if (newQty === 0) {
      //  productToDelete = item;
      setShowDelMessage(true);
      setProductToDelete(item);
      return;
    }

    const updatedCart = cartItems.map((items) => {
      if (items.product_id === item.product_id) {
        return {
          ...items,
          quantity: newQty,
          total_price: totalPrice,
        };
      } else {
        return items;
      }
    });

    setCartItems(updatedCart);

    let newTotal = 0;
    updatedCart.forEach((p) => {
      newTotal += p.quantity * p.unit_price;
    });

    setTotal(newTotal);

    if (!session) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else if (session) {
      updateCartQty(item.product_id, newQty);
    }
  };

  return (
    <main className="cart-container">
      <section>
        <ShowCartItems reduceQty={reduceQty} incruseQty={incruseQty} />
        {showDelMessage ? (
          <CartRemoveProductConfirm
            onDelete={handleConfirmDelete}
            onCancel={handleCancelDeleteProduct}
          />
        ) : (
          ""
        )}
      </section>
      <Footer />
    </main>
  );
}
