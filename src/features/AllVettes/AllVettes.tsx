import { useState } from "react";
import Alert from "@/src/components/Alert";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage";
import PaginationControls from "@/src/components/PaginationControls/PaginationControls";
import { useAllVettes } from "@/src/features/AllVettes/api/getAllVettes";
import AddFirstVetteMessage from "./AddFirstVetteMessage/AddFirstVetteMessage";
import ListOfVettes from "./ListOfVettes";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";

const PAGE_SIZE = 5;

export default function AllVettes() {
  const { data, isLoading, error } = useAllVettes();
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  let pageContent;

  // Loading
  if (isLoading) {
    pageContent = <div>Loading...</div>;
  }

  // Error
  if (error) {
    if (error instanceof Error) {
      pageContent = <Alert alertType={"danger"} message={error.message} />;
    } else {
      pageContent = (
        <Alert alertType={"danger"} message={"An error has happened"} />
      );
    }
  }

  // Empty State
  if (data && data.vettes.length === 0) {
    pageContent = <AddFirstVetteMessage />;
  }

  // Has data
  if (data && data.vettes.length > 0) {
    const currentTableData = data.vettes.slice(firstPageIndex, lastPageIndex);

    pageContent = (
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

  return (
    <AuthenticatedPage
      title="All Vettes"
      pageAction={{
        text: "Add Vette",
        href: "/add-vette",
        icon: PlusIcon,
      }}
    >
      {pageContent}
    </AuthenticatedPage>
  );
}
