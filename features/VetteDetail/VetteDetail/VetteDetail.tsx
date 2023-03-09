import { getErrorMessage } from "@/utils/utils";
import Alert from "@/components/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { useVette } from "../api/getVette";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";

const VetteDetail = () => {
  const router = useRouter();
  const { vetteId } = router.query;

  const { data, isLoading, error } = useVette({
    vetteId,
    enabled: typeof vetteId === "string",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = getErrorMessage(error);

    return (
      <div className="mt-4">
        <Alert alertType={"danger"} message={errorMessage} />
      </div>
    );
  }

  if (data) {
    return <VetteDetailCard vetteData={data} wasUpdated={false} />;
  }

  return null;
};

VetteDetail.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedPage title="Vette Detail">{page}</AuthenticatedPage>;
};

export default VetteDetail;
