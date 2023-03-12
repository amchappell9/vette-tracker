import { useRouter } from "next/router";
import { getErrorMessage } from "@/utils/utils";
import Alert from "@/components/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { useVette } from "../api/getVette";
import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";

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
        title="Vette Detail"
        backLinkConfig={{
          backLinkText: "Back to All Vettes",
          backLinkHref: "/vettes",
        }}
      >
        <VetteDetailCard vetteData={data} wasUpdated={false} />
      </AuthenticatedPage>
    );
  }

  return <></>;
};

export default VetteDetail;
