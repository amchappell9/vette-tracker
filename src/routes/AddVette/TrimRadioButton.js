import React, { useState, useEffect } from "react";

const TrimRadioButton = ({
  name,
  className,
  title,
  features,
  onChange,
  onBlur,
  selectedValue,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(selectedValue === title);
  }, [selectedValue, title]);

  return (
    <label
      className={`${className} flex cursor-pointer flex-col overflow-y-hidden rounded border-gray-100 shadow transition-shadow hover:shadow-lg ${
        isActive ? "ring-2 ring-red-500 ring-opacity-80 ring-offset-2" : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={title}
        className="hidden"
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="px-4 py-3">
        <span className="text-lg font-bold text-gray-900">{title}</span>
      </div>
      <div className="flex-1 bg-gray-50 px-4 py-2">
        <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-1">
          {features.map((feature) => (
            <li key={`${title}-${feature}`} className="mb-1 flex">
              <div>-</div>
              <div className="ml-2 flex-1">{feature}</div>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default TrimRadioButton;
