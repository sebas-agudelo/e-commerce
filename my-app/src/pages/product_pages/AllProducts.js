import React, { useContext, useEffect, useRef } from "react";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function Products() {
  const { fetchProducts, price, currenPage, setCurrentPage, categoryID } =
    useContext(ProductsApiContext);

  const prevPrice = useRef(price);
  const prevCategoryID = useRef(categoryID);

  useEffect(() => {
    if (price !== prevPrice.current || categoryID !== prevCategoryID.current) {
      setCurrentPage(1);
    }

    prevPrice.current = price;
    prevCategoryID.current = categoryID;
  }, [price, categoryID, setCurrentPage]);

  useEffect(() => {
    fetchAllProducts();
    console.log(currenPage);
  }, [currenPage, price, categoryID]);

  const fetchAllProducts = async () => {
    try {
      let url = `http://localhost:3030/api/products/show?page=${currenPage}`;

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
