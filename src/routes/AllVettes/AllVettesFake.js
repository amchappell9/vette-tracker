import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ListOfVettes from "./ListOfVettes";
import PaginationControls from "./PaginationControls";
import VetteFilter from "./VetteFilter";

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

const AllVettesFake = () => {
  const [vettes, setVettes] = useState([]);

  useEffect(() => {
    setTimeout(() => setVettes(fakeVettes), 750);
  }, []);

  let output;

  if (vettes.length > 0) {
    output = (
      <>
        <VetteFilter />
        <ListOfVettes vettesArray={fakeVettes} />
        <PaginationControls />
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
          {/* <div className="grid grid-cols-3">
            <div className="col-span-2">
              <h1 className="text-white text-3xl font-bold">View Vettes</h1>
            </div>
            <div className="col-span-1 text-right">
              <Link
                to="/add-vette"
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Add Vette
              </Link>
            </div>
          </div> */}
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">View Vettes</h1>
            <div className="text-right">
              <Link
                to="/add-vette"
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
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
