import React from "react";

const VetteFilter = () => {
  return (
    <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 rounded-t">
      <div className="font-bold text-gray-700 mb-2">Filters</div>
      <div className="flex">
        <div className="flex-auto">
          <button>Year</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Date</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Price</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Trim</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Miles</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Exterior Color</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Interior Color</button>
          <div></div>
        </div>
        <div className="flex-auto">
          <button>Packages</button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default VetteFilter;
