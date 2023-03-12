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

  let pageContent;

  if (isLoading) {
    pageContent = <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = getErrorMessage(error);

    pageContent = (
      <div className="mt-4">
        <Alert alertType={"danger"} message={errorMessage} />
      </div>
    );
  }

  // Need to always return AuthenticatedPage, and set the title dynamically
  if (data) {
    pageContent = <VetteDetailCard vetteData={data} wasUpdated={false} />;
  }

  return (
    <AuthenticatedPage
      title="Vette Detail"
      backLinkConfig={{
        backLinkText: "Back to All Vettes",
        backLinkHref: "/vettes",
      }}
    >
      {pageContent}
    </AuthenticatedPage>
  );
};

// VetteDetail.getLayout = function getLayout(page: ReactElement) {
//   return <AuthenticatedPage title="Vette Detail">{page}</AuthenticatedPage>;
// };

export default VetteDetail;
