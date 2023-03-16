import { useRouter } from "next/router";
import { useCreateOrUpdateVette } from "../api/addVette";
import { VetteValues } from "@/types";
import AddVetteForm from "../AddVetteForm";
import Alert from "@/components/Alert";
import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";
import { useVette } from "@/features/VetteDetail/api/getVette";

const formatValues = (values: VetteValues) => {
  let formattedValues = values;

  // Strip commas from miles
  formattedValues.miles = formattedValues.miles.replace(",", "");

  // Strip dollar sign and commas from cost
  formattedValues.cost = formattedValues.cost.replace(",", "").replace("$", "");

  return formattedValues;
};

const AddVette = () => {
  const router = useRouter();
  const vetteToEditId = router.query.vetteToEdit;
  const vetteToEditInfo = useVette({
    vetteId: vetteToEditId,
    enabled: typeof vetteToEditId === "string",
  });

  const { isSuccess, data, isError, error, isLoading, mutate } =
    useCreateOrUpdateVette();

  const onSubmit = async (values: VetteValues) => {
    const formattedValues = formatValues(values);

    mutate({
      vette: formattedValues,
      id: vetteToEditInfo.data?.id,
    });
  };

  // This whole thing needs a redo
  if (!isLoading && !isError && !isSuccess) {
    // Check if a vette is being edited, and if data is available
    if (vetteToEditId) {
      // Wait for vetteToEditInfo to load
      if (vetteToEditInfo.data) {
        return (
          <AuthenticatedPage
            title="Edit Vette"
            backLinkConfig={{
              backLinkText: "Back to All Vettes",
              backLinkHref: "/vettes",
            }}
          >
            <AddVetteForm
              handleSubmit={onSubmit}
              vetteToEditInfo={vetteToEditInfo.data}
            />
          </AuthenticatedPage>
        );
      }

      if (vetteToEditInfo.isLoading) {
        return (
          <AuthenticatedPage title="Adding Vette...">
            <div>Loading...</div>
          </AuthenticatedPage>
        );
      }

      if (vetteToEditInfo.error) {
        return (
          <AuthenticatedPage title="Add Vette">
            <ErrorAlert error={vetteToEditInfo.error} />
          </AuthenticatedPage>
        );
      }
    } else {
      // Create a new Vette
      return (
        <AuthenticatedPage
          title="Add New Vette"
          backLinkConfig={{
            backLinkText: "Back to All Vettes",
            backLinkHref: "/vettes",
          }}
        >
          <AddVetteForm handleSubmit={onSubmit} />
        </AuthenticatedPage>
      );
    }
  }

  if (isLoading) {
    return (
      <AuthenticatedPage title="Adding Vette...">
        <div>Loading...</div>
      </AuthenticatedPage>
    );
  }

  if (isError) {
    return (
      <AuthenticatedPage title="Add Vette">
        <ErrorAlert error={vetteToEditInfo.error} />
      </AuthenticatedPage>
    );
  }

  if (isSuccess) {
    // Get ID from response
    const vetteId = data.id;
    const isUpdate = vetteToEditInfo !== null;

    router.push(
      `/vettes/${vetteId}?isConfirmationView=true&isUpdate=${isUpdate}`
    );
  }

  return <></>;
};

export default AddVette;

function ErrorAlert({ error }: { error: unknown }) {
  let errorMessage = "An error has happened";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return <Alert alertType={"danger"} message={errorMessage} />;
}
