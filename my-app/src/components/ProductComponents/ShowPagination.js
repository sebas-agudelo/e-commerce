import React, { useContext, useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsApiContext } from "../../Context/ProductsContext";

export default function ShowPagination() {

  const { currenPage, categoryID, setCurrentPage, pages, products } =
    useContext(ProductsApiContext);

    useEffect(() => {},[categoryID])

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = async () => {
    if (currenPage < pages) {
      setCurrentPage(currenPage + 1);
    }
  };

  const prevPage = () => {
    if (currenPage > 1) {
      setCurrentPage(currenPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination-container">
      <p>
        Sida: {currenPage} - Produkter: {products.length}
      </p>
      <div className="pagination-btn-wrapper">
        {currenPage > 1 && (
          <button
            className="pgn-action-btn-prev"
            onClick={prevPage}
            disabled={currenPage === 1}
          >
            <GrPrevious />
          </button>
        )}

        {pageNumbers.map((page) => (
          <button
            className={`pgn-index-btn ${currenPage === page ? "current-page" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {currenPage === pages ? (
          ""
        ) : (
          <button className="pgn-action-btn-next" onClick={nextPage}>
            <GrNext />
          </button>
        )}
      </div>
    </div>
  );
}
