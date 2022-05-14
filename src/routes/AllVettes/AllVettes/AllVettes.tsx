import { useState, useMemo, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";

import ListOfVettes from "../ListOfVettes";
import Alert from "../../../components/Alert/Alert";
import useGetAllVettes from "../../../hooks/useGetAllVettes";
import AddFirstVetteMessage from "../AddFirstVetteMessage/AddFirstVetteMessage";
import PaginationControls from "../../../components/PaginationControls";

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

const PAGE_SIZE = 5;

type AllVettesProps = {
  setHeaderInfo: (headerInfo: {
    title: string;
    linkText: string;
    linkConfig: string;
    linkIcon: React.ReactNode;
    backLinkText?: string;
    backLinkConfig?: string;
  }) => void;
};

const AllVettes = ({ setHeaderInfo }: AllVettesProps) => {
  // const [filterValues, setFilterValues] = useState({});
  const { isLoading, hasError, errorMessage, vettes } = useGetAllVettes();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return vettes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, vettes]);

  useEffect(() => {
    setHeaderInfo({
      title: "All Vettes",
      linkText: "Add Vette",
      linkConfig: "/add-vette",
      linkIcon: <PlusIcon className="mr-1 inline h-5 w-5 align-text-bottom" />,
    });

    // Only want this to run once on render
    // eslint-disable-next-line
  }, []);

  // const getFilteredVettes = (vettes) => {
  //   // Filter vettes based on filters
  //   return vettes;
  // };

  let output;

  if (isLoading) {
    output = <div>Loading...</div>;
  } else if (hasError) {
    output = <Alert alertType={"danger"} message={errorMessage} />;
  } else if (vettes.length === 0) {
    output = <AddFirstVetteMessage />;
  } else if (vettes.length > 0) {
    output = (
      <>
        {/* <VetteFilter filters={filters} onFilterChange={onFilterChange} /> */}
        {/* <ListOfVettes vettesArray={getFilteredVettes(vettes)} /> */}
        <ListOfVettes vettesArray={currentTableData} />
        <PaginationControls
          currentPage={currentPage}
          totalCount={vettes.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </>
    );
  }

  return <>{output}</>;
};

export default AllVettes;
