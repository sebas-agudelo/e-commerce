import React, { useContext, useEffect, useState } from "react";
import ShowFilters from "./ShowFilters";
import { Link } from "react-router-dom";
import ShowPagination from "./ShowPagination";
import { ProductsApiContext } from "../../Context/ProductsContext";
import ShowSelectedFilters from "./ShowSelectedFilters";
import ShowSearchPath from "./ShowSearchPath";

export default function ShowProdcuts({ category, selectedCatId }) {
  const { products, setProducts, count } = useContext(ProductsApiContext);

  return (
    <section className="products-container">
      <div className="products-toolbar">
        <ShowSearchPath selectedCatId={selectedCatId} category={category} />

        <ShowSelectedFilters />

        <ShowFilters selectedCatId={selectedCatId} category={category} />
      </div>

      {products.map((product) => (
        <article key={product.id} className="product-wrapper">
          <Link to={`/product/${product.id}`}>
            <div className="product-img-wrapper">
              <div className="product-img">
                <img src={product.img} alt={product.title} />
              </div>
            </div>

            <div className="product-details">
              <p id="title">{product.title}</p>
              <p id="price">{product.price}.00 kr.</p>
            </div>
          </Link>
          <article className="admin-actions-btn"></article>
        </article>
      ))}

      <ShowPagination />
    </section>
  );
}
