import React, { useContext, useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { ProductsApiContext } from "../../Context/ProductsContext";
import { useSearchParams } from "react-router-dom";

export default function ShowPagination() {
  const { currenPage, categoryID, setCurrentPage, pages, products } =
    useContext(ProductsApiContext);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // if (categoryID) {
    //   setSearchParams("");
    // }

    const urlPage = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(urlPage);
  }, [searchParams, setCurrentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = async () => {
    if (currenPage < pages) {
      updatePageParam(currenPage + 1);
    }
  };

  const prevPage = () => {
    if (currenPage > 1) {
      updatePageParam(currenPage - 1);
    }
  };

  const handlePageChange = (page) => {
    updatePageParam(page);
  };

  const updatePageParam = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);

    setSearchParams(newParams);
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
            className={`pgn-index-btn ${
              currenPage === page ? "current-page" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {pages > 1 && currenPage < pages && (
          <button className="pgn-action-btn-next" onClick={nextPage}>
            <GrNext />
          </button>
        )}
      </div>
    </div>
  );
}
