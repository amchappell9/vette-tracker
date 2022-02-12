import React from "react";

const PackageItem = ({ title, description }) => {
  return (
    <div className="rounded bg-gray-50 p-4">
      <span className="block font-bold text-gray-800">{title}</span>
      <p>{description}</p>
    </div>
  );
};

export default PackageItem;
