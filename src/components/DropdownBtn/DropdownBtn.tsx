import { useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import FILTER_TYPES from "../../constants/filterTypes";
import { useDetectOutsideClick } from "@/src/hooks/useDetectOutsideClick";

type DropdownBtnProps = {
  filter: {
    name: string;
    type: string;
    values: string[];
  };
  onFilterChange: () => void;
};

// This could be refactored into a Menu component from Headless UI, then you wouldn't need
// useDetectOutsideClick
const DropdownBtn = ({ filter, onFilterChange }: DropdownBtnProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setIsActive(false);

    if (onFilterChange !== undefined) {
      onFilterChange();
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="focus:ring-offset-100 inline-flex justify-center rounded-lg px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedValue === null ? filter.name : selectedValue}
        <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-500" />
      </button>

      {/* Select Menu */}
      {filter.type === FILTER_TYPES.SELECT && (
        <div
          className={`absolute left-0 mt-1 origin-top-left rounded-md bg-white shadow-lg ${
            isActive ? "" : "hidden"
          }`}
          ref={dropdownRef}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {filter.values.map((value) => (
              <button
                key={value}
                className="block py-2 pl-4 pr-10 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date Menu */}
      {filter.type === FILTER_TYPES.DATE && <></>}

      {/* Slider Menu */}
      {filter.type === FILTER_TYPES.SLIDER && <></>}
    </div>
  );
};

export default DropdownBtn;
