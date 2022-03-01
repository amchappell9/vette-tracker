import React from "react";
import { Link } from "react-router-dom";

const getBorderStylesByIndex = (totalLength, index) => {
  let styles = "";

  if (index === 0 && totalLength !== 1) {
    styles = "border rounded-t border-b-0";
  } else if (index > 0 && index !== totalLength - 1) {
    styles = "border-b-0";
  } else if (index === totalLength - 1 && totalLength !== 1) {
    styles = "border rounded-b";
  } else if (index === 0 && totalLength === 1) {
    styles = "border rounded";
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
        )} block w-full  border border-gray-200 p-4 transition-colors hover:bg-gray-50`}
      >
        {/* Mobile List Styles */}
        <div className="flex justify-between sm:hidden">
          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-bold leading-none text-gray-800">{`${vette.year} Corvette ${vette.submodel}`}</p>
            <p className="text-md leading-none text-gray-600">
              <span className="after:mx-1 after:content-['|']">{`$${parseInt(
                vette.cost
              ).toLocaleString()}`}</span>

              <span>{parseInt(vette.miles).toLocaleString()} Miles</span>
            </p>
          </div>
          <div className="">{">"}</div>
        </div>
        {/* Desktop List Styles */}
        <div className="hidden justify-between sm:flex">
          <div className="flex flex-1 flex-col gap-1 ">
            <p className="text-lg font-bold leading-none text-gray-800">
              {`${vette.year} Corvette`}
              <span className="md:hidden">{` ${vette.submodel}`}</span>
            </p>
            <p className="text-md leading-none text-gray-600">{`Added ${vette.date}`}</p>
          </div>
          <div className="flex flex-1 flex-col gap-y-1 sm:flex-none sm:basis-1/4">
            <p className="font-bold leading-none text-gray-700">{`$${parseInt(
              vette.cost
            ).toLocaleString()}`}</p>
            <p className="block leading-none text-gray-700">
              <strong>{parseInt(vette.miles).toLocaleString()}</strong> Miles
            </p>
          </div>
          <div className="hidden flex-1 flex-col gap-y-1 md:flex">
            <p className="leading-none">
              <span className="font-bold">{vette.submodel}</span> with{" "}
              <span className="font-bold">{vette.trim}</span>
            </p>
            <p className="truncate leading-none">{`${vette.exteriorColor} on ${vette.interiorColor} Interior`}</p>
          </div>
          <div className="hidden basis-40 lg:block">
            {vette.packages.map((option) => (
              <span
                key={option}
                className="mr-2 inline rounded-xl bg-red-500 px-2 py-1 text-sm text-white"
              >
                {option.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VetteItem;
