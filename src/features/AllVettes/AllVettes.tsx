import { useState } from "react";
import PaginationControls from "@/src/components/PaginationControls/PaginationControls";
import AddFirstVetteMessage from "./AddFirstVetteMessage/AddFirstVetteMessage";
import ListOfVettes from "./ListOfVettes/ListOfVettes";
import { useAllVettes } from "./api/getAllVettes";
import Spinner from "@/src/components/Spinner.tsx/Spinner";
import Alert from "@/src/components/Alert/Alert";
import { getErrorMessage } from "@/src/utils/utils";

const PAGE_SIZE = 5;

function AllVettes() {
  const { isPending, isError, error, data: vettes } = useAllVettes();

  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <Alert alertType="danger">{getErrorMessage(error)}</Alert>;
  }

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
