import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function Products() {
  const { products, count, fetchProducts, price, currenPage, categoryID } =
    useContext(ProductsApiContext);

  useEffect(() => {
    const fetch = async () => {
      await fetchAllProducts();
    };

    fetch();
  }, [price, categoryID, currenPage]);

  const fetchAllProducts = async () => {
    // `https://examensarbeten.vercel.app/api/products/show`
    // `http://localhost:3030/api/products/show`
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
