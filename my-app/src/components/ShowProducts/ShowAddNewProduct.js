import React, { useContext } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { SlClose } from "react-icons/sl";
import { connectionType } from "../../arrays";
import { chargingTime } from "../../arrays";
import { batteryLive } from "../../arrays";
import { garanti } from "../../arrays";
import { ProductContext } from "../../Context/ProductContext";
import { CreateAndUpdateProduct } from "../../hooks/CreateAndUpdateProduct";

export default function ShowAddNewProduct({
  handleSubmit,
}) {

  const {productData, categories, okmessage, Errormessage } = useContext(ProductContext);
  const {  open, close, handleChange, isDescClicked } = CreateAndUpdateProduct();
  return (
    <>
      <article className="message-container">
        <p className={okmessage ? "ok-message" : "no-ok-message"}>
          {okmessage ? (
            <>
              <LuCircleCheckBig />
              {okmessage}
            </>
          ) : (
            ""
          )}
        </p>
        <p className={Errormessage ? "error-message" : "no-error-message"}>
          {Errormessage ? (
            <>
              <SlClose />
              {Errormessage}
            </>
          ) : (
            ""
          )}
        </p>
      </article>

      <form className="new-product-form" onSubmit={handleSubmit}>
        <section className="nnnn">
          <article className="product-title-price">
            <div className="title-price-input-wrapper">
              <label>Produkt namn</label>
              <input
                type="text"
                placeholder="Produkt namn"
                name="title"
                onChange={handleChange}
              />
            </div>

            <div className="title-price-input-wrapper">
              <label>Produkt pris</label>
              <input
                type="number"
                placeholder="Produkt pris"
                name="price"
                onChange={handleChange}
              />
            </div>
          </article>

          <article className="product-categori">
            <label>Produkt Kategori</label>
            <select name="category_id" onChange={handleChange}>
              <option selected disabled>
                Välj kategori
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
          </article>

          <article className="product-description">
            <label>Produkt Beskrivning</label>
            <textarea
              className={isDescClicked ? "description" : "no-description"}
              name="description"
              onChange={handleChange}
            ></textarea>
            <p onClick={isDescClicked ? close : open} className="show-more">
              {isDescClicked ? "Visa mindre" : "Visa mer"}
            </p>
          </article>

          <article className="more-product-info">
            <div className="product-more-info-input-wrapper">
              <label>Produkt märke</label>
              <input
                type="text"
                placeholder="Produkt märke"
                name="brand"
                onChange={handleChange}
              />
            </div>

            <div className="product-more-info-input-wrapper">
              <label>Produktens anslutningtyp</label>

              <select name="connection_type" onChange={handleChange}>
                <option selected disabled>
                  Anslutningtyp
                </option>
                {connectionType.map((connection) => (
                  <option>{connection}</option>
                ))}
              </select>
            </div>

            <div className="product-more-info-input-wrapper">
              <label>Produktens laddningstid</label>
              <select name="charging_time" onChange={handleChange}>
                <option selected disabled>
                  Laddningstid
                </option>
                {chargingTime.map((charch) => (
                  <option>{charch}</option>
                ))}
              </select>
            </div>

            <div className="product-more-info-input-wrapper">
              <label>Produktens batteritid</label>
              <select name="battery_life" onChange={handleChange}>
                <option selected disabled>
                  Batteritid
                </option>
                {batteryLive.map((batteri) => (
                  <option>{batteri}</option>
                ))}
              </select>
            </div>

            <div className="product-more-info-input-wrapper">
              <label>Produktens garanti</label>
              <select name="garanti" onChange={handleChange}>
                <option selected disabled>
                  Garanti
                </option>
                {garanti.map((ganranti) => (
                  <option>{ganranti}</option>
                ))}
              </select>
            </div>
          </article>
        </section>

        <article className="new-product-img">
          <div className="preview-img-wrapper">
            <p className="preview-h3">Produkt bild</p>

            {productData.imgPreview ? (
              <>
                <div className="uploaded-img">
                  <img src={productData.imgPreview} alt="Förhandsvisning" />
                </div>
              </>
            ) : (
              <div className="img-prwview">
                <img src="/file.png" />
              </div>
            )}
          </div>
          <input type="file" name="img" onChange={handleChange} />

          <p className="new-product-img-header">
            OBS! Endast PNG, JPG, JPEG och WEBP
          </p>
        </article>

        <button type="submit">Lägg till</button>
      </form>
    </>
  );
}
