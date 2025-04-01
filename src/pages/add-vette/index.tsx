import Alert from "@/src/components/Alert/Alert";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import Spinner from "@/src/components/Spinner.tsx/Spinner";
import AddVette from "@/src/features/AddVette/AddVette/AddVette";
import { useVette } from "@/src/features/VetteDetail/api/getVette";
import { getErrorMessage } from "@/src/utils/utils";
import { useRouter } from "next/router";

export default function AddOrUpdateVette() {
  const router = useRouter();
  const vetteToEditId = router.query.vetteToEdit;
  const { isLoading, isError, error, data } = useVette({
    vetteId: vetteToEditId,
  });

  if (isLoading) {
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
      <AuthenticatedPage title="Add Vette">
        <Alert alertType={"danger"}>{getErrorMessage(error)}</Alert>
      </AuthenticatedPage>
    );
  }

  return <AddVette vetteToEdit={data} />;
}
