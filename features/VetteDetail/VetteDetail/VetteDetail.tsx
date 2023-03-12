import { useRouter } from "next/router";
import Link from "next/link";
import { getErrorMessage } from "@/utils/utils";
import Alert from "@/components/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { useVette } from "../api/getVette";
import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";
import { PencilAltIcon } from "@heroicons/react/outline";

const VetteDetail = () => {
  const router = useRouter();
  const { vetteId } = router.query;

  const { data, isLoading, error } = useVette({
    vetteId,
    enabled: typeof vetteId === "string",
  });

  if (isLoading) {
    return (
      <AuthenticatedPage
        title="Loading Vette..."
        backLinkConfig={{
          backLinkText: "Back to All Vettes",
          backLinkHref: "/vettes",
        }}
      >
        <div>Loading...</div>;
      </AuthenticatedPage>
    );
  }

  if (error) {
    const errorMessage = getErrorMessage(error);

    return (
      <AuthenticatedPage
        title="Vette Detail"
        backLinkConfig={{
          backLinkText: "Back to All Vettes",
          backLinkHref: "/vettes",
        }}
      >
        <div className="mt-4">
          <Alert alertType={"danger"} message={errorMessage} />
        </div>
      </AuthenticatedPage>
    );
  }

  if (data) {
    return (
      <AuthenticatedPage
        title={`${data.year} Corvette ${data.submodel}`}
        backLinkConfig={{
          backLinkText: "Back to All Vettes",
          backLinkHref: "/vettes",
        }}
        pageActionComponent={
          <Link
            href={`/add-vette?vetteToEdit=${data.id}`}
            className="flex items-center rounded bg-red-500 px-6 py-2 text-lg text-white drop-shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
          >
            <PencilAltIcon className="mr-1 inline h-5 w-5" />
            Edit Vette
          </Link>
        }
      >
        <VetteDetailCard vetteData={data} wasUpdated={false} />
      </AuthenticatedPage>
    );
  }

  return <></>;
};

export default VetteDetail;
