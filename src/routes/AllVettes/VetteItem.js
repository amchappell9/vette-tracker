import React from "react";
import { Link } from "react-router-dom";

const getBorderStylesByIndex = (totalLength, index) => {
  let styles = "";

  if (index === 0) {
    styles = "border rounded-t border-b-0";
  } else if (index > 0 && index !== totalLength - 1) {
    styles = "border-b-0";
  } else if (index === totalLength - 1) {
    styles = "border rounded-b";
  }

  return styles;
};

const VetteItem = ({ vette, index, listLength }) => {
  return (
    <li>
      <Link
        to={`/vettes/${vette.id}`}
        className={` ${getBorderStylesByIndex(
          listLength,
          index
        )} border border-gray-200 w-full grid grid-cols-12 p-4 hover:bg-gray-50`}
      >
        <div className="col-span-3">
          <p className="block font-bold text-lg leading-none text-gray-800">{`${vette.year} Corvette`}</p>
          <p className="block text-gray-600 text-md">{`Added ${vette.date}`}</p>
        </div>
        <div className="col-span-3">
          <p className="block text-gray-700 leading-tight">
            <span className="font-bold">
              {parseInt(vette.miles).toLocaleString()}{" "}
            </span>
            Miles
          </p>
          <p className="block text-gray-700 leading-tight font-bold">{`$${parseInt(
            vette.cost
          ).toLocaleString()}`}</p>
        </div>
        <div className="col-span-3">
          <p className="block text-gray-700 leading-tight">
            <span className="font-bold">{vette.submodel}</span> w/{" "}
            <span className="font-bold">{vette.trim}</span>
          </p>
          <p className="block text-gray-700 leading-tight">{`${vette.exteriorColor} w/ ${vette.interiorColor}`}</p>
        </div>
        <div className="col-span-2 flex items-center">
          {vette.packages.map((option) => (
            <p
              key={option}
              className="inline px-2 py-1 mr-2 bg-red-500 text-white text-sm rounded-xl"
            >
              {option.toUpperCase()}
            </p>
          ))}
        </div>
        <div className="flex items-center flex-row-reverse text-gray-500">
          {">"}
        </div>
      </Link>
    </li>
  );
};

export default VetteItem;
