import { useState } from "react";
import PaginationControls from "@/src/components/PaginationControls/PaginationControls";
import { VetteObject } from "@/src/types";
import AddFirstVetteMessage from "./AddFirstVetteMessage/AddFirstVetteMessage";
import ListOfVettes from "./ListOfVettes/ListOfVettes";

const PAGE_SIZE = 5;

type AllVettes = {
  vettes: VetteObject[];
};

function AllVettes({ vettes }: AllVettes) {
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  // Empty State
  if (vettes.length === 0) {
    return <AddFirstVetteMessage />;
  }

  const currentTableData = vettes.slice(firstPageIndex, lastPageIndex);

  return (
    <>
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

export default AllVettes;
