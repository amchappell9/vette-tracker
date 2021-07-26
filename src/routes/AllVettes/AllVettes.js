import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";

import ListOfVettes from "./ListOfVettes";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import useGetAllVettes from "../../hooks/useGetAllVettes";
import AddFirstVetteMessage from "./AddFirstVetteMessage";
// import PaginationControls from "./PaginationControls";
// import VetteFilter from "./VetteFilter";
// import FILTER_TYPES from "../../constants/filterTypes";

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

const AllVettes = () => {
  // const [filterValues, setFilterValues] = useState({});
  const { isLoading, hasError, errorMessage, vettes } = useGetAllVettes();

  const getFilteredVettes = (vettes) => {
    // Filter vettes based on filters
    return vettes;
  };

  let output;

  if (isLoading) {
    output = <div>Loading...</div>;
  } else if (hasError) {
    output = <Alert alertType={ALERT_TYPES.DANGER} message={errorMessage} />;
  } else if (vettes.length === 0) {
    output = <AddFirstVetteMessage />;
  } else if (vettes.length > 0) {
    output = (
      <>
        {/* <VetteFilter filters={filters} onFilterChange={onFilterChange} /> */}
        <ListOfVettes vettesArray={getFilteredVettes(vettes)} />
        {/* <PaginationControls /> */}
      </>
    );
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

export default AllVettes;
