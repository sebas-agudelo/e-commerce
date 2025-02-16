import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const { categoryID, category } = useParams();

  useEffect(() => {
    fetchProductByCategory();
  }, [categoryID]);

  const fetchProductByCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/api/product/categori/${categoryID}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data); 
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
      alert("Något gick fel när produkterna hämtades.");
    }
  };

  return (
    <main className="Products-main">

      <h1>{category}</h1>

      <ShowProdcuts 
        products={products}
      />
      <Footer />
    </main>
  );
}
