import React from "react";

const PackageCheckbox = ({
  className,
  name,
  title,
  value,
  description,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`${className} flex p-4 packageCheckbox`}>
      <div className="pr-4">
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      <div>
        <span className="block text-gray-800 text-lg font-bold">{title}</span>
        <span className="block text-gray-600">{description}</span>
      </div>
    </div>
  );
};

export default PackageCheckbox;
