import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetSelectedProducts = async () => {
      const response = await fetch(
        "http://localhost:3030/api/selected/products",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setSelectedProducts(data.products);
    };
    fetSelectedProducts();
  }, []);

  return (
    <main className="home-main">
      <article className="hero-video">
        <img  src="pexels-lorenciusls-7417547.jpg"/>
        {/* <video autoPlay loop muted>
          <source src="/4982734-hd_1920_1080_25fps.mp4" />
        </video> */}
      </article>
      {/* <article className="buy-btn">
        <Link to={"/products"}>Utforska</Link>
      </article> */}

      <h2 className="fav-products">Favoriter</h2>

    <section style={{padding: "0"}} className="Products-main">
        <article className="products-container">
          {selectedProducts.map((product) => (
            <div key={product.id} className="product-wrapper">
              <Link to={`/product/${product.id}`}>
                <div className="product-img-wrapper">
                <div className="product-img">
                  <img src={product.img} />
                  </div>
                </div>

                <div className="product-details">
                  <p id="title">{product.title}</p>
                  <p id="price">{product.price}.-</p>
                </div>
              </Link>
            </div>
          ))}
        </article>
        </section>

        <section className="more-section">
          <article className="caption-img">
            <img src="/pexels-tnarg-2932804.jpg" />
          </article>
          <article className="about-sound">
            <h1 className="SOUND1">SOUND1</h1>
            <p>
            Välkommen till vår butik, där vi erbjuder ett brett sortiment av hörlurar för alla smakriktningar och behov. Oavsett om du är en audiofil som söker kristallklart ljud, en träningsentusiast i behov av ett par svett- och vattentåliga hörlurar eller någon som bara vill koppla av med en bra podcast eller musik – vi har något för dig.
            </p>
            <button><Link to={`/products`}>Produkter</Link></button>
          </article>
        </section>
        <Footer />
    </main>
  );
}
