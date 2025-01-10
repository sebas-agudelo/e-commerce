import { createContext, useContext, useEffect, useState } from "react";
import { AuthSessionContext } from "./SessionProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const {session} = useContext(AuthSessionContext);
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    checkLocalStorage()
  }, [session]);

  const showCart = async () => {
    if (!session) {
    
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    } else {
   
      try {
        const response = await fetch('http://localhost:3030/api/cart/show', {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setCartItems(data.shopping_cart);
        } else {
          alert(data.error || "Kunde inte ladda varukorgen.");
        }
      } catch (error) {
        console.error("Ett fel uppstod vid hämtning av varukorgen:", error);
      }
    }
  };
  

  const checkLocalStorage = async () => {
      if(cart.length > 0 && session){
        for(let i = 0; i < cart.length; i++){

          const product_id = cart[i].product_id
          const quantity = cart[i].quantity
          
          try {
            const response = await fetch("http://localhost:3030/api/cart/addtocart", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ product_id, quantity }),
            });

            const data = await response.json();

            if(response.ok){
              console.log(`välkommen`);
              
            }
          }catch(error){
            console.error(error);
            
          }
        }
        localStorage.removeItem("cart");
        alert("Din varukorg har synkroniserats med databasen!");
      }

  };

  const addToCart = async (product, product_id) => {
    if(!session){
      const existingProductIndex = cart.findIndex(
        (item) => item.product_id === product.id
      );
  
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        const productToaAdd = {
          product_id: product.id,
          product_title: product.title,
          unit_price: product.price,
          product_img: product.img,
          quantity: quantity,
        };
  
        cart.push(productToaAdd);
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} har lagts till i varukorgen!`);
    } 
    
    else if(session){

      const response = await fetch('http://localhost:3030/api/cart/addtocart', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({product_id, quantity}),
      });

      const data = await response.json();

      if(response.ok){
        alert(data.success)
      }

    }
  };

  const clearCart = async () => {
    if(!session){
      localStorage.removeItem("cart");
      setCartItems([]);
    } else if(session){
      try {
      const response = await fetch('http://localhost:3030/api/cart/deletecart', {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if(response.ok){
        alert(data.success);
        setCartItems([]);
      }
    
      
    }catch(error){
      console.error(error);
      
    }
  }
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        quantity,
        addToCart,
        setQuantity,
        clearCart,
        showCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
