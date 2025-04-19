import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ProductsByCategory() {
  const { categoryId, category } = useParams();
  const [pages, setPages] = useState();
  const [count, setCount] = useState([]);

  const { fetchProducts, currenPage, price, categoryID } =
    useContext(ProductsApiContext);

  useEffect(() => {
    fetchProductByCategory();
  }, [categoryId, price, currenPage]);

  const fetchProductByCategory = async () => {
    try {
      // `https://examensarbeten.vercel.app/api/product/categori/${categoryId}`
      // `http://localhost:3030/api/product/categori/${categoryId}`

      let url = `https://examensarbeten.vercel.app/api/product/categori/${categoryId}?page=${currenPage}`;

      if (price && categoryID) {
        url += `&price=${price}&categoryID=${categoryID}`;
      } else if (price) {
        url += `&price=${price}`;
      } else if (categoryID) {
        url += `&categoryID=${categoryID}`;
      }

      fetchProducts(url);
    } catch (error) {
      alert("Ett oväntat fel har inträffat")
    }
  };

  return (
    <main className="Products-main">
      <ShowProdcuts categoryId={categoryId} category={category} />
      <Footer />
    </main>
  );
}
