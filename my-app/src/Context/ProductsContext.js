import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductsApiContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [pages, setPages] = useState(1); 
  const [count, setCount] = useState(0); 
  const [currenPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [livePrice, setLivePrice] = useState(0);
  const [categoryID, setCategoryID] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const nav = useNavigate()

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      
      if (response.ok) {
          setPages(data.totalPages || 1);
          setCount(data.count || 0);
          setCurrentPage(data.currenPage || 1)
          setProducts(data.products);
    }
    if(!response.ok){
      if(data.reason === "INVALID_CATEGORY"){
        nav("/notfound")
        return;
      }
      setMessage(data.error);
      setPages(data.totalPages || 0);
      setCount(data.count || 0);
      setCurrentPage(data.currenPage || 0);  
      setProducts(data.products || []);
      
      
    }
    } catch (error) {
      alert("Något gick fel. Försök igen");
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
        setMessage,
        message
      }}
    >
      {children}
    </ProductsApiContext.Provider>
  );
};
