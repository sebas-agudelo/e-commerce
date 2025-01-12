import { createContext, useContext, useEffect, useState } from "react";
import { AuthSessionContext } from "./SessionProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cartMessages, setCartMessages] = useState("");
  const [total, setTotal] = useState();
  const { session } = useContext(AuthSessionContext);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    checkLocalStorage();
    showCart();
  }, [session]);

  //Hämtar hela varukorgen för utloggade och inloggade användare
  const showCart = async () => {
    const storedCart = localStorage.getItem("cart");
    const cartData = JSON.parse(storedCart);

    //Visar varukorgen för utloggade användare
    if (!session) {
      if (cartData) {
        setCartItems(cartData);

        let totalPrice = 0;
        cartData.forEach((item) => {
          totalPrice += item.total_price || 0;
        });

        setTotal(totalPrice);
        console.log(totalPrice);
      } else {
        setCartItems([]);
      }

      //Visar varukorgen för inloggade anvämdare
    } else {
      try {
        const response = await fetch("http://localhost:3030/api/cart/show", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
          setCartItems(data.shopping_cart);
          setTotal(data.totalPrice);
        } else {
          setCartMessages(data.error || "Kunde inte ladda varukorgen.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  //Lägger till produkter i varukorgen för utloggade och inloggade användare
  const addToCart = async (product, product_id) => {
    if (
      !product ||
      !product.id ||
      !product.title ||
      !product.price ||
      !quantity
    ) {
      alert("Produkten är ogiltig och kan inte läggas till i varukorgen.");
      return;
    }

    //Läger till produkter i vaurokorgen för utloggade användare
    if (!session) {
      setCartItems((prevCart) => {
        const existingProduct = prevCart.findIndex(
          (item) => item.product_id === product.id
        );
    
        let updatedCart;
    
        if (existingProduct !== -1) {
          updatedCart = prevCart.map((item, index) =>
            index === existingProduct
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  total_price: item.unit_price * (item.quantity + quantity),
                }
              : item
          );
        } else {
          // Lägg till den nya produkten
          const productToAdd = {
            product_id: product.id,
            product_title: product.title,
            unit_price: product.price,
            product_img: product.img,
            total_price: product.price * quantity,
            quantity: quantity,
          };
    
          updatedCart = [...prevCart, productToAdd];
        }
    
        // Uppdatera localStorage med den nya varukorgen
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
    //Läger till produkter i vaurokorgen för inloggade användare
    else if (session) {
      try {
        const response = await fetch(
          "http://localhost:3030/api/cart/addtocart",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id, quantity }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          await showCart();
          console.log(data.success);
        } else {
          console.error(data.error);
          alert(data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // alert("Ett nätverksfel inträffade. Kontrollera din internetanslutning och försök igen.");
      }
    }
  };

  //Lägger till produkter från LocalStorage i databsen vid inloggning
  const checkLocalStorage = async () => {
    if (cart.length > 0 && session) {
      try {
        const response = await fetch("http://localhost:3030/api/cart/bulk-add", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: cart }), // Skickar hela cart som en array
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Produkter tillagda i databasen.");
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
  
      localStorage.removeItem("cart");
    }
  };
  

  const updateCartQty = async (product_id, newQty) => {
    try {
      const response = await fetch("http://localhost:3030/api/cart/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id, quantity: newQty }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Något gick fel");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // alert("Ett nätverksfel inträffade. Kontrollera din internetanslutning och försök igen.");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        quantity,
        cartMessages,
        total,
        addToCart,
        setQuantity,
        showCart,
        setCartItems,
        setCartMessages,
        updateCartQty,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
