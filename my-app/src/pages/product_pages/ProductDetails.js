import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { CartContext } from "../../Context/CartContext";
import { PiShoppingCartThin } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";

export default function ProductDetails() {
  const [isClicked, setIsClicked] = useState(false);
  const { fetchProductById, productDetails } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  const readMoreOpen = () => {
    setIsClicked(true);
    console.log("Is clicked");
  };

  const readMoreClose = () => {
    setIsClicked(false);
    console.log("Is clicked");
  };

  return (
    <main className="product-details" style={{ paddingTop: "65px" }}>
      <section>
        <div className="image-wrapper">
          <img src={productDetails?.img} alt={productDetails?.title} />
        </div>

        <article className="title-and-actions">
          <p id="title">{productDetails?.title}</p>
          <p id="price">{productDetails?.price}.-</p>
          <button
            className="add-cart-btn"
            onClick={() => addToCart(productDetails, productDetails.id)}
          >
            <PiShoppingCartThin />
            Lägg i varukorgen
          </button>

          <div className="additional-info">
            <p>
              <IoMdCheckmark /> Säker betalning
            </p>
            <p>
              <IoMdCheckmark />
              30-dagars öppet köp
            </p>
            <p>
              <IoMdCheckmark />
              Garanti: {productDetails?.garanti}år
            </p>
          </div>
        </article>

        <article className="description">
          <div className="dddd">
            <span>Produktbeskrivning</span>
            {isClicked ? (
              <span onClick={readMoreClose}>
                <VscChromeClose />
              </span>
            ) : (
              ""
            )}
          </div>

          <p className={isClicked ? "isClicked" : ""}>
            {productDetails?.description}
          </p>

          {isClicked ? "" : <button onClick={readMoreOpen}>Läs mer</button>}
        </article>

        <article className="specifications">
          <span>Specifikationer</span>
          <p>Märke: {productDetails?.brand}</p>
          <p>Betteritid: {productDetails?.battery_life}h</p>
          <p>Anslutning: {productDetails?.connection_type}</p>
        </article>
      </section>
    </main>
  );
}
