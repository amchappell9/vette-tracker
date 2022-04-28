import React from "react";
import DropdownBtn from "../../components/DropdownBtn";

const VetteFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="rounded-t border-b border-gray-200 bg-gray-50 px-8 py-4">
      <div className="mb-2 font-bold text-gray-700">Filters</div>
      <div className="-ml-2 flex">
        {filters.map((filter) => (
          <div key={filter.name} className="flex-auto">
            <DropdownBtn filter={filter} onFilterChange={onFilterChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetteFilter;
