import React, { useContext, useEffect, useState } from "react";
import ShowFilters from "./ShowFilters";
import { Link } from "react-router-dom";
import ShowPagination from "./ShowPagination";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ShowProdcuts({ category, categoryId }) {
  const [currentPath, setCurrentPath] = useState();
  const { products, count } = useContext(ProductsApiContext);

  useEffect(() => {
    if (window.location.pathname === "/products") {
      setCurrentPath("Produkter");
    }
    if (
      window.location.pathname === `/products/${categoryId}/cat/${category}`
    ) {
      setCurrentPath(category);
    }
    if (window.location.pathname === "/search") {
      setCurrentPath("Sökord");
    }
  }, []);

  return (
    <section className="products-container">
      <div className="products-toolbar">
        <h1>
          {currentPath}: <span>{count}</span>
        </h1>

        <ShowFilters categoryId={categoryId} category={category}/>
      </div>

      {products.map((product) => (
        <>
          <article key={product.id} className="product-wrapper">
            <Link to={`/product/${product.id}`}>
              <div className="product-img-wrapper">
                <div className="product-img">
                  <img src={product.img} alt={product.title} />
                </div>
              </div>

              <div className="product-details">
                <p id="title">{product.title}</p>
                <p id="price">{product.price}.-</p>
              </div>
            </Link>
            <article className="admin-actions-btn"></article>
          </article>
        </>
      ))}

      <ShowPagination />
    </section>
  );
}
