import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-[#1F2937]">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {totalItems}
        </span>{" "}
        trips
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-500 transition-all duration-200"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`${page}-${index}`}
              className="w-9 h-9 flex items-center justify-center text-sm text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "w-9 h-9 rounded-lg text-sm font-semibold bg-indigo-600 border border-indigo-600 text-white"
                  : "w-9 h-9 rounded-lg text-sm bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-200"
              }
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-500 transition-all duration-200"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

