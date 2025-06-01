import React, { useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import Footer from "../Footer";
import { ProductsApiContext } from "../../Context/ProductsContext";

const ProductSearch = () => {
  const [searchParams] = useSearchParams();

  const queryFromURL = searchParams.get("query") || "";
  const urlPage = parseInt(searchParams.get("page")) || 1;
  const urlCategory = searchParams.get("categoryID") || "";

  const { fetchProducts, price, currenPage, categoryID, setCategoryID } =
    useContext(ProductsApiContext);

  useEffect(() => {
    if (urlCategory) {
      setCategoryID(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    if (queryFromURL && currenPage === urlPage && categoryID === urlCategory) {
      fetchSearchProducts(queryFromURL);
    }
  }, [currenPage, queryFromURL, price, categoryID, urlPage, urlCategory]);

  const fetchSearchProducts = async (query) => {
    try {
      let url = `https://examensarbeten.vercel.app/search?query=${query}&page=${currenPage}`;

      if (price && categoryID) {
        url += `&price=${price}&categoryID=${categoryID}`;
      } else if (price) {
        url += `&price=${price}`;
      } else if (categoryID) {
        url += `&categoryID=${categoryID}`;
      }

      fetchProducts(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="Products-main">
      <ShowProdcuts />
      <Footer />
    </main>
  );
};

export default ProductSearch;
