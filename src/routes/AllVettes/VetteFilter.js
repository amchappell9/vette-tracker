import React from "react";
import DropdownBtn from "../../components/DropdownBtn";

const VetteFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 rounded-t">
      <div className="font-bold text-gray-700 mb-2">Filters</div>
      <div className="flex">
        {filters.map((filter) => (
          <div className="flex-auto">
            <DropdownBtn filter={filter} onFilterChange={onFilterChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetteFilter;
