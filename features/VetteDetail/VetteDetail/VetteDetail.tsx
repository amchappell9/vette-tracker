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
  const { vetteId, isConfirmationView, isUpdate } = router.query;
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
        <div>Loading...</div>
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
        pageAction={{
          icon: PencilAltIcon,
          text: "Edit Vette",
          href: `/add-vette?vetteToEdit=${data.id}`,
        }}
      >
        <>
          {isConfirmationView && !isUpdate && (
            <Alert
              alertType={"success"}
              message="Your Vette has been added!"
              className="mb-8"
            />
          )}

          {isConfirmationView && isUpdate && (
            <Alert
              alertType={"success"}
              message="Your Vette has been updated!"
              className="mb-8"
            />
          )}

          <VetteDetailCard vetteData={data} wasUpdated={false} />
        </>
      </AuthenticatedPage>
    );
  }

  return <></>;
};

export default VetteDetail;
