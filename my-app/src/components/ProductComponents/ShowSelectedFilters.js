import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsApiContext } from "../../Context/ProductsContext";
import { ProductContext } from "../../Context/ProductContext";

import { IoCloseOutline } from "react-icons/io5";

export default function ShowSelectedFilters() {
  const {
    categoryID,
    setCategoryID,
    livePrice,
    setLivePrice,
    price,
    setPrice,
  } = useContext(ProductsApiContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  const { categories } = useContext(ProductContext);

  console.log(typeof price);

  const currentFilterCategory = categories.find((c) => c.id === categoryID);

  const removeSelectedFilter = (selectedFilter) => {
    if (selectedFilter === "categoryID" && categoryID) {
      setCategoryID("");
      newParams.delete("categoryID");
      newParams.delete("page");
    }

    if (selectedFilter === "price" && price) {
      setPrice(0);
      setLivePrice(0);
      newParams.delete("page");
    }

    setSearchParams(newParams);
  };

  return (
    <div>
      {(price || categoryID) && (
        <div>
          <h2>Aktiva filter</h2>

          <div>
            {categoryID && (
              <div onClick={() => removeSelectedFilter("categoryID")}>
                {currentFilterCategory && (
                  <h3>{currentFilterCategory.category}</h3>
                )}
                <IoCloseOutline />
              </div>
            )}

            {price > 0 && (
              <div onClick={() => removeSelectedFilter("price")}>
                <h3>{livePrice}</h3>
                <IoCloseOutline />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
