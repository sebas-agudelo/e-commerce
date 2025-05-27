import React, { useContext, useEffect, useState } from "react";
import ShowFilters from "./ShowFilters";
import { Link } from "react-router-dom";
import ShowPagination from "./ShowPagination";
import { ProductsApiContext } from "../../Context/ProductsContext";
import { ProductContext } from "../../Context/ProductContext";
import { useSearchParams } from "react-router-dom";
import ShowSelectedFilters from "./ShowSelectedFilters";


export default function ShowProdcuts({ category, selectedCatId }) {
  const [currentPath, setCurrentPath] = useState();
  const { products, count } = useContext(ProductsApiContext);

  useEffect(() => {
    if (window.location.pathname === "/products") {
      setCurrentPath("ALLA PRODUKTER");
    }
    if (
      window.location.pathname === `/products/${selectedCatId}/cat/${category}`
    ) {
      setCurrentPath(category);
    }
    if (window.location.pathname === "/search") {
      setCurrentPath("Sökresultat");
    }
  }, [currentPath]);

  return (
    <section className="products-container">
      <ShowSelectedFilters />
      <div className="products-toolbar">
        <h1>
          {currentPath}: <span>{count}</span>
        </h1>

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
