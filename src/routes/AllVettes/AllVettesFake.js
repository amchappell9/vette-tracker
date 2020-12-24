import React, { useState, useEffect } from "react";

import ListOfVettes from "./ListOfVettes";

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
    output = <ListOfVettes />;
  } else if (vettes.length === 0) {
    output = <div>Add your first vette (Make this cool)</div>;
  } else {
    output = <div>Loading...</div>;
  }

  return <>{output}</>;
};

export default AllVettesFake;
