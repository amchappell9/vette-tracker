import React from "react";

const Select = ({ className, options, ...props }) => {
  return (
    <select
      className={`${className} text-lg border border-gray-300 border-solid outline-none focus:ring-2 focus:ring-red-500 rounded`}
      {...props}
    >
      {options.map((optionValue) => (
        <option key={optionValue} value={optionValue}>
          {optionValue}
        </option>
      ))}
    </select>
  );
};

export default Select;
