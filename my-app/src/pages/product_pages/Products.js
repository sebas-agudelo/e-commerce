import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { ProductContext } from "../../Context/ProductContext";
import { CartContext } from "../../Context/CartContext";
import ProductFilters from "../../components/ProductFilters";

export default function Products() {
  const { products, setProducts, setErrorProducts, errorProducts } =
    useContext(ProductContext);

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const fetchAllProducts = async () => {
    try {
      const response = await fetch("https://examensarbeten-ji9m.vercel.app/api/getproducts", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setErrorProducts(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <main className="Products-main">
      <ProductFilters />
      <section className="products-container">
        <h2>{errorProducts}</h2>

        {products.map((product) => (
            <Link to={`/product/${product.id}`}>
          <article key={product.id} className="product-wrapper">
            <div className="product-img-wrapper">
              <div className="product-img">
                <img
                  src={product.img}
                  alt={product.title}
                />
              </div>
            </div>

            <div className="product-details">
              <p id="title">{product.title}</p>
              <p id="price">{product.price}.-</p>

              {/* <button onClick={() => deleteProductByID(product.id)}>Ta bort produkt</button> */}
            </div>
          </article>
            </Link>
        ))}
      </section>
    </main>
  );
}
