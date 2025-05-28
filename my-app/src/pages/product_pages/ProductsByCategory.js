import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ProductsByCategory() {
  const { selectedCatId, category } = useParams();

  const { fetchProducts, currenPage, price, setPrice, setCategoryID } =
    useContext(ProductsApiContext);

    useEffect(() => {
      if (selectedCatId) {
        fetchProductByCategory();
      } else{
        setCategoryID("")
        setPrice("")
        
      }
    }, [selectedCatId, setCategoryID, price, currenPage]);
    


  const fetchProductByCategory = async () => {
    // let url = `http://localhost:3030/api/product/categori/${selectedCatId}?page=${currenPage}`;

    try {
      // let url = `https://examensarbeten.vercel.app/api/product/categori/${selectedCatId}?page=${currenPage}`;
    let url = `http://localhost:3030/api/product/categori/${selectedCatId}?page=${currenPage}`;


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
      <ShowProdcuts selectedCatId={selectedCatId} category={category} />
      <Footer />
    </main>
  );
}
