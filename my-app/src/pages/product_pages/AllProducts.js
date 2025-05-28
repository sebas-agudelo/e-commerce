import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { ProductsApiContext } from "../../Context/ProductsContext";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const {
    fetchProducts,
    price,
    currenPage,
    setCurrentPage,
    categoryID,
    setCategoryID,
  } = useContext(ProductsApiContext);

  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("categoryID") || "";
  const urlPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    setCategoryID(urlCategory);

    if (categoryID && currenPage !== urlPage) {
      setCurrentPage(1);
    }
  }, [urlCategory, urlPage]);

  useEffect(() => {
    if (categoryID !== urlCategory) return;
    fetchAllProducts();
  }, [currenPage, price, categoryID, urlCategory, urlPage]);

  const fetchAllProducts = async () => {
    // let url = `https://examensarbeten.vercel.app/api/products/show?page=${currenPage}`;
    // let url = `http://localhost:3030/api/products/show?page=${currenPage}`;

    try {
      let url = `https://examensarbeten.vercel.app/api/products/show?page=${currenPage}`;

      if (price && categoryID) {
        url += `&price=${price}&categoryID=${categoryID}`;
      } else if (price) {
        url += `&price=${price}`;
      } else if (categoryID) {
        url += `&categoryID=${categoryID}`;
      }

      fetchProducts(url);
    } catch (error) {
      alert("Ett oväntat fel har inträffat");
    }
  };

  return (
    <main className="Products-main">
      <ShowProdcuts />
      <Footer />
    </main>
  );
}
