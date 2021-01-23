import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import FILTER_TYPES from "../constants/filterTypes";

const DropdownBtn = ({ filter, onFilterChange }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
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
        className="inline-flex justify-center rounded-lg px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-red-300"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedValue === null ? filter.name : selectedValue}
        <FontAwesomeIcon
          icon={faCaretDown}
          className="ml-1 h-5 w-5 text-gray-500"
        />
      </button>

      {/* Select Menu */}
      {filter.type === FILTER_TYPES.SELECT && (
        <div
          className={`origin-top-left absolute left-0 mt-1 rounded-md shadow-lg bg-white ${
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
                className="block text-sm py-2 pl-4 pr-10 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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