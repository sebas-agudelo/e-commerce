import React from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function ShowPagination({
  currenPage,
  setCurrentPage,
  pages,
  setPages,
  products,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

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
        Produkter: {products.length} - sida: {currenPage}
      </p>

      <div className="pagination-btn-wrapper">
        <button className="pgn-action-btn" onClick={prevPage} disabled={currenPage === 1}>
          <GrPrevious />
        </button>
        {pageNumbers.map((page) => (
          <button className="pgn-index-btn" onClick={() => handlePageChange(page)}>{page}</button>
        ))}

        <button className="pgn-action-btn" onClick={nextPage} disabled={currenPage === pages}>
          <GrNext />
        </button>
      </div>
    </div>
  );
}
