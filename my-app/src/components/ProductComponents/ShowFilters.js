import React, { useEffect, useState, useContext } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import ShowProdcuts from "./ShowProdcuts";
import { ProductContext } from "../../Context/ProductContext";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ShowFilters({ category, categoryId }) {
  const { price, setPrice, count, setCategoryID } =
    useContext(ProductsApiContext);
  const [isClicked, setIsClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const { categories } = useContext(ProductContext);

  const handleClick = () => {
    {
      isClicked ? setIsClicked(false) : setIsClicked(true);
    }
  };

  const removeFilters = () => {
    setPrice(0);
    setCategoryID("");
  };
  const handle = (e) => {
    setCategoryID(e.target.value);
  };

  useEffect(() => {
    if (categoryId) {
      setIsSelected(false);
    }
  }, [categoryId]);


  return (
    <div>
      <div
        className={isClicked ? "products-filter-container" : "filter-container"}
      >
        <div className="products-filters-wrapper">
          <div className="close-filter-menu">
            <h3>Filter</h3>
            <VscChromeClose onClick={handleClick} />
          </div>
          <div className="price-range">
            <h3>
              Pris: <span>{price}:-</span>
            </h3>
            <input
              type="range"
              min={0}
              max={2000}
              value={price}
              className="slider"
              id="myRange"
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
            />
          </div>

          <div className="categories-checkboxes">
            {isSelected ? (
              <>
                <h3>kategori</h3>
                <select name="category_id" onChange={handle}>
                  <option selected disabled>
                    Välj kategori
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <h3>
                Kategori - <span>{category}</span>
              </h3>
            )}
          </div>
        </div>

        <div className="filter-actions">
          <button className="filter-buttons" onClick={removeFilters}>
            Ta bort allt
          </button>
          <button className="filter-buttons" onClick={handleClick}>
            Filtrera <span>{count}</span>
          </button>
        </div>
      </div>

      <div>
        <button className="filter-btn" onClick={handleClick}>
          Filter
          <IoFilterSharp />
        </button>
      </div>
    </div>
  );
}
