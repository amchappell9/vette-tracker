import React from "react";
import PaginationButton, { BUTTON_STATES } from "./PaginationButton";
import usePagination, { DOTS } from "../hooks/usePagination";

const PaginationControls = ({
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const lowerRange = (currentPage - 1) * pageSize + 1;
  const upperRange =
    currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-8">
      {/* Mobile Buttons */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={onPrevious}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{lowerRange}</span> to{" "}
            <span className="font-medium">{upperRange}</span> of{" "}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div></div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <PaginationButton
              onChange={onPrevious}
              state={BUTTON_STATES.PREV}
              disabled={currentPage === 1}
            />

            {/* Numbered Buttons */}
            {paginationRange.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return (
                  <PaginationButton
                    key={pageNumber}
                    state={BUTTON_STATES.DOTS}
                  />
                );
              }

              return (
                <PaginationButton
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  number={pageNumber}
                  onChange={() => onPageChange(pageNumber)}
                />
              );
            })}

            {/* Next Button */}
            <PaginationButton
              onChange={onNext}
              state={BUTTON_STATES.NEXT}
              disabled={currentPage === lastPage}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
