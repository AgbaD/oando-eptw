import Icon from "../icon";
import "./index.scss";

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: any) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="pagination">
      <button
        className="pagination__sub-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="white-caret-left" />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination__button ${
            currentPage === page ? "pagination__button--active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination__sub-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="caret-right" />
      </button>
    </div>
  );
}
