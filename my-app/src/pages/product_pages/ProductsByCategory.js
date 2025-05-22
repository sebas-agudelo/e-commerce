import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ProductsByCategory() {
  const { currentCarId, category } = useParams();

  const { fetchProducts, currenPage, price, setPrice, setCategoryID } =
    useContext(ProductsApiContext);

    useEffect(() => {
      if (currentCarId) {
        fetchProductByCategory();
      } else{
        setCategoryID("")
        setPrice("")
        
      }
    }, [currentCarId, price, currenPage]);
    


  const fetchProductByCategory = async () => {
    try {
    
      let url = `http://localhost:3030/api/product/categori/${currentCarId}?page=${currenPage}`;

      if (price) {
        url += `&price=${price}`;
      } 

      fetchProducts(url);
    } catch (error) {
      alert("Ett oväntat fel har inträffat")
    }
  };

  return (
    <main className="Products-main">
      <ShowProdcuts currentCarId={currentCarId} category={category} />
      <Footer />
    </main>
  );
}
