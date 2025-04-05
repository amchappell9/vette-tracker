import Alert from "@/src/components/Alert/Alert";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import Spinner from "@/src/components/Spinner.tsx/Spinner";
import { getAllVettesQueryOptions } from "@/src/features/AllVettes/api/getAllVettes";
import { useVette } from "@/src/features/VetteDetail/api/getVette";
import VetteDetail from "@/src/features/VetteDetail/VetteDetail/VetteDetail";
import { getErrorMessage } from "@/src/utils/utils";
import { PencilAltIcon } from "@heroicons/react/outline";
import { usePrefetchQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function VetteById() {
  const {
    query: { vetteId },
  } = useRouter();
  const { isPending, isError, error, data: vette } = useVette({ vetteId });

  // Prefetch all vettes for instances where user loads this page directly
  usePrefetchQuery({ ...getAllVettesQueryOptions() });

  if (isPending) {
    return (
      <AuthenticatedPage title="Loading Vette...">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </AuthenticatedPage>
    );
  }

  if (isError) {
    return (
      <AuthenticatedPage title="Error">
        <div className="flex justify-center">
          <Alert alertType="danger">{getErrorMessage(error)}</Alert>
        </div>
      </AuthenticatedPage>
    );
  }

  return (
    <AuthenticatedPage
      title={`${vette.year} Corvette ${vette.submodel}`}
      backLinkConfig={{
        backLinkText: "Back to All Vettes",
        backLinkHref: "/vettes",
      }}
      pageAction={{
        icon: PencilAltIcon,
        text: "Edit Vette",
        href: `/add-vette?vetteToEdit=${vette.id}`,
      }}
    >
      <VetteDetail vette={vette} />
    </AuthenticatedPage>
  );
}
