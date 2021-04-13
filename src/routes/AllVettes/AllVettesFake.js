import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";

import ListOfVettes from "./ListOfVettes";
// import PaginationControls from "./PaginationControls";
// import VetteFilter from "./VetteFilter";
// import FILTER_TYPES from "../../constants/filterTypes";

const fakeVettes = [
  {
    year: "2014",
    miles: "123456",
    cost: "51000",
    exteriorColor: "Artic White",
    interiorColor: "Red",
    submodel: "Base",
    trim: "1LT",
    packages: ["npp", "mrc", "pdr"],
    link: "www.google.com",
    id: "283581563266925056",
    date: "11-29-2020",
    userId: "50b181bb-8394-46d7-b825-b6ad53ae3a0e",
  },
  {
    year: "2015",
    miles: "31000",
    cost: "43000",
    exteriorColor: "Artic White",
    interiorColor: "Red",
    submodel: "Base",
    trim: "2LT",
    packages: ["npp", "mrc", "pdr"],
    link: "www.google.com",
    id: "283581563266925057",
    date: "11-31-2020",
    userId: "50b181bb-8394-46d7-b825-b6ad53ae3a0e",
  },
  {
    year: "2018",
    miles: "12000",
    cost: "47000",
    exteriorColor: "Artic White",
    interiorColor: "Red",
    submodel: "Base",
    trim: "3LT",
    packages: ["npp", "mrc", "pdr"],
    link: "www.google.com",
    id: "283581563266925058",
    date: "12-13-2020",
    userId: "50b181bb-8394-46d7-b825-b6ad53ae3a0e",
  },
  {
    year: "2017",
    miles: "23421",
    cost: "45000",
    exteriorColor: "Artic White",
    interiorColor: "Red",
    submodel: "Base",
    trim: "2LT",
    packages: ["npp", "mrc", "pdr"],
    link: "www.google.com",
    id: "283581563266925059",
    date: "11-29-2020",
    userId: "50b181bb-8394-46d7-b825-b6ad53ae3a0e",
  },
  {
    year: "2015",
    miles: "42000",
    cost: "37000",
    exteriorColor: "Artic White",
    interiorColor: "Red",
    submodel: "Base",
    trim: "2LT",
    packages: ["npp", "mrc", "pdr"],
    link: "www.google.com",
    id: "283581563266925060",
    date: "11-29-2020",
    userId: "50b181bb-8394-46d7-b825-b6ad53ae3a0e",
  },
];

// const filters = [
//   {
//     name: "Year",
//     type: FILTER_TYPES.SELECT,
//     values: ["2019", "2018", "2017", "2016", "2015", "2014"],
//   },
//   {
//     name: "Date",
//     type: FILTER_TYPES.DATE,
//   },
//   {
//     name: "Price",
//     type: FILTER_TYPES.SLIDER,
//   },
//   {
//     name: "Model",
//     type: FILTER_TYPES.SELECT,
//     values: ["ZR1", "Z06", "Grand Sport", "Z51", "Base"],
//   },
//   {
//     name: "Trim",
//     type: FILTER_TYPES.SELECT,
//     values: ["3LT", "2LT", "1LT"],
//   },
//   {
//     name: "Miles",
//     type: FILTER_TYPES.SLIDER,
//   },
//   {
//     name: "Exterior Color",
//     type: FILTER_TYPES.SELECT,
//     values: ["Artic White", "Torch Red"],
//   },
//   {
//     name: "Interior Color",
//     type: FILTER_TYPES.SELECT,
//     values: ["Black", "Red"],
//   },
//   {
//     name: "Packages",
//     type: FILTER_TYPES.SELECT,
//     values: ["NPP", "MRC", "PDR"],
//   },
// ];

const AllVettesFake = () => {
  const [vettes, setVettes] = useState([]);
  // const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    setTimeout(() => setVettes(fakeVettes), 750);
  }, []);

  let output;

  // const onFilterChange = (filter, selectedValue) => {
  //   // setFilterValues();
  // };

  const getFilteredVettes = (vettes) => {
    // Filter vettes based on filters
    return vettes;
  };

  if (vettes.length > 0) {
    output = (
      <>
        {/* <VetteFilter filters={filters} onFilterChange={onFilterChange} /> */}
        <ListOfVettes vettesArray={getFilteredVettes(fakeVettes)} />
        {/* <PaginationControls /> */}
      </>
    );
  } else if (vettes.length === 0) {
    output = <div>Add your first vette (Make this cool)</div>;
  } else {
    output = <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-main-height flex justify-center">
        <div className="max-w-4xl w-full -mt-32 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">View Vettes</h1>
            <div className="text-right">
              <Link
                to="/add-vette"
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                <PlusIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
                Add Vette
              </Link>
            </div>
          </div>
          <div className="rounded bg-white w-full shadow-lg mt-4">{output}</div>
        </div>
      </div>
    </>
  );
};

export default AllVettesFake;
