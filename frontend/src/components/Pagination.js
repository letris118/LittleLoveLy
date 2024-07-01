import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
          onClick={() => handleClick(i)}>
          <a className="page-link" href="#!">
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item" onClick={() => handleClick(currentPage - 1)}>
          <a className="page-link" href="#!" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {renderPageNumbers()}
        <li className="page-item" onClick={() => handleClick(currentPage + 1)}>
          <a className="page-link" href="#!" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
