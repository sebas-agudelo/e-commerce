import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [errorProducts, setErrorProducts] = useState("");

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/api/product/get/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setProductDetails(data.product);

      } else {
        setErrorProducts(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductByID = async (id) => {  
    try {
      const response = await fetch(
        `http://localhost:3030/api/product/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const delProduct = products.filter((item) => item.id !== id);

      if (delProduct) {
        setProducts(delProduct);
      }

      const data = await response.json();

      if (response.ok) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        errorProducts,
        setProducts,
        deleteProductByID,
        setErrorProducts,
        fetchProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
