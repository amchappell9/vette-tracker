import { useState } from "react";
import Alert from "@/src/components/Alert";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage";
import PaginationControls from "@/src/components/PaginationControls/PaginationControls";
import { useAllVettes } from "@/src/features/AllVettes/api/getAllVettes";
import AddFirstVetteMessage from "./AddFirstVetteMessage/AddFirstVetteMessage";
import ListOfVettes from "./ListOfVettes";
import { PlusIcon } from "@heroicons/react/outline";

const PAGE_SIZE = 5;

function AllVettes() {
  const { isLoading, isError, error, data } = useAllVettes();
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;

  // Loading
  if (isLoading) {
    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
    );
  }

  // Error
  if (isError) {
    if (error instanceof Error) {
      return (
        <Wrapper>
          <Alert alertType={"danger"}>{error.message}</Alert>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Alert alertType={"danger"}>An error has happened</Alert>
        </Wrapper>
      );
    }
  }

  // Empty State
  if (data.vettes.length === 0) {
    return (
      <Wrapper>
        <AddFirstVetteMessage />
      </Wrapper>
    );
  }

  const currentTableData = data.vettes.slice(firstPageIndex, lastPageIndex);

  return (
    <Wrapper>
      <ListOfVettes vettesArray={currentTableData} />
      <PaginationControls
        currentPage={currentPage}
        totalCount={data.vettes.length}
        pageSize={PAGE_SIZE}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Wrapper>
  );
}

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <AuthenticatedPage
      title="All Vettes"
      pageAction={{
        text: "Add Vette",
        href: "/add-vette",
        icon: PlusIcon,
      }}
    >
      {children}
    </AuthenticatedPage>
  );
};

export default AllVettes;
