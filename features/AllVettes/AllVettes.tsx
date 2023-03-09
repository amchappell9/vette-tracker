import { ReactElement, useState } from "react";
import Alert from "@/components/Alert";
import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import { useAllVettes } from "@/hooks/api/getAllVettes";
import AddFirstVetteMessage from "./AddFirstVetteMessage/AddFirstVetteMessage";
import ListOfVettes from "./ListOfVettes";

const PAGE_SIZE = 5;
export default function AllVettes() {
  const { data, isLoading, error } = useAllVettes();
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  // Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error
  if (error) {
    if (error instanceof Error) {
      return <Alert alertType={"danger"} message={error.message} />;
    } else {
      return <Alert alertType={"danger"} message={"An error has happened"} />;
    }
  }

  // Empty State
  if (data && data.vettes.length === 0) {
    return <AddFirstVetteMessage />;
  }

  // Has data
  if (data && data.vettes.length > 0) {
    const currentTableData = data.vettes.slice(firstPageIndex, lastPageIndex);

    return (
      <>
        <ListOfVettes vettesArray={currentTableData} />
        <PaginationControls
          currentPage={currentPage}
          totalCount={data.vettes.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </>
    );
  }

  return <></>;
}

AllVettes.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedPage title="All Vettes">{page}</AuthenticatedPage>;
};
