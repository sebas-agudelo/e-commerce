import React, { useEffect, useState } from "react";
import ShowFilters from "./ShowFilters";
import { Link } from "react-router-dom";

export default function ShowProdcuts({
  products,
  setProducts,
  price,
  setPrice,
  categoryID,
  categoryId,
  setCategoryID,
  category
}) {
  return (
    <section className="products-container">
      <div className="products-toolbar">
        <h2>Produkter: {products.length}</h2>

        <ShowFilters 
        price={price} 
        setPrice={setPrice}
        products={products}
        categoryID={categoryID}
        setCategoryID={setCategoryID}
        categoryId={categoryId}
        category={category}
        />

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
    </section>
  );
}
