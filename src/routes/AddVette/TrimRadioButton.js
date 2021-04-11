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
      className={`${className} rounded shadow border-gray-100 hover:shadow-lg transition-shadow cursor-pointer overflow-y-hidden ${
        isActive ? "ring-2 ring-offset-2 ring-red-500 ring-opacity-80" : ""
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
        <span className="text-gray-900 text-lg font-bold">{title}</span>
      </div>
      <div className="px-4 py-2 bg-gray-50 h-full">
        <ul>
          {features.map((feature) => (
            <li key={`${title}-${feature}`} className="mb-1">
              - {feature}
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default TrimRadioButton;
