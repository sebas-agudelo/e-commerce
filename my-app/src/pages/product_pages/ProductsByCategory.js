import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";

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
      <section className="products-container">
        <h1 style={{width: "100%"}}>{category}</h1>
        {/* <ProductsMessages /> */}
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
      <Footer />
    </main>
  );
}
