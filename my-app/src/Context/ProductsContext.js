import { createContext, useState } from "react";

// Skapa contexten
export const ProductsApiContext = createContext();

// ProductsProvider är inte asynkron
export const ProductsProvider = ({ children }) => {
  const [pages, setPages] = useState(1); 
  const [count, setCount] = useState(0); 
  const [currenPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [livePrice, setLivePrice] = useState(0);
  const [categoryID, setCategoryID] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
          setPages(data.totalPages || 1);
          setCount(data.count || 0);
          setProducts(data.products || []);
    }
    if(!response.ok){
      alert(data.error)
    }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <ProductsApiContext.Provider
      value={{
        fetchProducts,
        setPages,
        pages,
        setCount,
        count,
        setCurrentPage,
        currenPage, 
        setPrice,
        price,
        livePrice,
        setLivePrice,
        setCategoryID,
        categoryID,
        setProducts,
        products,
      }}
    >
      {children}
    </ProductsApiContext.Provider>
  );
};
