import usePagination from "@/src/hooks/usePagination";
import PaginationButton, { BUTTON_STATES } from "../PaginationButton";

type PaginationControlsProps = {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const PaginationControls = ({
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  onPageChange,
}: PaginationControlsProps) => {
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

  let lastPage =
    typeof paginationRange !== "undefined"
      ? paginationRange[paginationRange.length - 1]
      : null;

  const lowerRange = (currentPage - 1) * pageSize + 1;
  const upperRange =
    currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white pt-3">
      {/* Mobile Buttons */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === lastPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
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
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <PaginationButton
              onChange={onPrevious}
              state={BUTTON_STATES.PREV}
              disabled={currentPage === 1}
            />

            {/* Numbered Buttons */}
            {paginationRange &&
              paginationRange.map((pageNumber) => {
                if (typeof pageNumber === "string") {
                  // pageNumber === DOTS
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
