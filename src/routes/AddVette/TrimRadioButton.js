import React from "react";

const TrimRadioButton = ({ name, className, title, features }) => {
  return (
    <label
      className={`${className} rounded shadow border-gray-100 hover:shadow-lg transition-shadow cursor-pointer overflow-y-hidden`}
    >
      <input type="radio" name={name} className="hidden" />
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
