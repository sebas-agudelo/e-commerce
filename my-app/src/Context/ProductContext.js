import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const location = useLocation();
  const [okmessage, setOkMessage] = useState("");
  const [Errormessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category_id: "",
    category_name: "",
    description: "",
    brand: "",
    connection_type: "",
    charging_time: "",
    battery_life: "",
    garanti: "",
    img: null,
  });

  useEffect(() => {
    // getCategories();
    setErrorMessage("");
    setOkMessage("");
  }, [location]);

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(
        `https://examensarbeten.vercel.app/api/product/get/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProductData(data.product);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    const response = await fetch(`https://examensarbeten.vercel.app/api/categori/get`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      setCategories(data.data);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        Errormessage,
        okmessage,
        categories,
        setProductData,
        setErrorMessage,
        setOkMessage,
        getCategories,
        fetchProductById,
        setCategories
      
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
