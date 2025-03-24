import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'rc-slider/assets/index.css';
import Footer from "./Footer";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`https://examensarbeten-r6b7.vercel.app/categori/get`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data.data);

      if (response.ok) {
        setCategories(data.data);
      }
    };
    
    getCategories();
  }, []);

  return (
    <main className="home-main">
      <article className="hero-video">
        <img src="pexels-lorenciusls-7417547.jpg" />
      </article>

      {/* <h2 className="fav-products">Favoriter</h2> */}

      <section style={{ padding: "0" }} className="Products-main">
        <article className="home-categories-container">
          {categories.map((category) => (
            <div className="home-categories" key={category.id}>
                <p>
                  <Link to={`/products/${category.id}/cat/${category.category}`}>
                    {category.category}
                  </Link>
                 
                  </p>
           
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
            Välkommen till vår butik, där vi erbjuder ett brett sortiment av
            hörlurar för alla smakriktningar och behov. Oavsett om du är en
            audiofil som söker kristallklart ljud, en träningsentusiast i behov
            av ett par svett- och vattentåliga hörlurar eller någon som bara
            vill koppla av med en bra podcast eller musik – vi har något för
            dig.
          </p>
          <button>
            <Link to={`/products`}>Produkter</Link>
          </button>
        </article>
      </section>
      <Footer />
    </main>
  );
}
