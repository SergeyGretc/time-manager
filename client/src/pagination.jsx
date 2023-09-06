import React from "react";
import _ from "lodash";
const Pagination = ({ pageSize, count, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  // pageSize это количество записей на странице
  //count это всего записей
  // onPageChange это функция переключения страниц пагинации
  // pageCount это вычесленное количество страниц

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item" + (currentPage === page ? " active" : "")}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
