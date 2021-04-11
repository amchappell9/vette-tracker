import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SubModelRadioButton = ({
  name,
  className,
  title,
  engine,
  hp,
  torque,
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
      className={`${className} rounded border border-gray-100 shadow hover:shadow-lg transition-shadow cursor-pointer ${
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
      <div className="bg-gray-50 h px-4 py-2">
        <span className="block text-gray-900 text-lg">{engine} Engine</span>
        <span className="block text-gray-600">
          {hp} HP | {torque} LBS/FT
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {features.map((feature) => (
            <div key={`${title}-${feature}`} className="col-span-1">
              <span className="text-gray-900">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 h-5 w-5 text-gray-400 align-text-bottom"
                />
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </label>
  );
};

export default SubModelRadioButton;
