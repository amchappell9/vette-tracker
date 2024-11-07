import { useRouter } from "next/router";
import { useCreateOrUpdateVette } from "../api/addVette";
import { VetteValues } from "@/src/types";
import { useVette } from "@/src/features/VetteDetail/api/getVette";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import AddVetteForm from "../AddVetteForm/AddVetteForm";
import Alert from "@/src/components/Alert/Alert";

const AddVette = () => {
  const router = useRouter();
  const vetteToEditId = router.query.vetteToEdit;
  const vetteToEditInfo = useVette({
    vetteId: vetteToEditId,
  });

  const { isSuccess, data, isError, error, isPending, mutate } =
    useCreateOrUpdateVette();

  const onSubmit = async (values: VetteValues) => {
    const formattedValues = formatValues(values);

    mutate({
      vette: formattedValues,
      id: vetteToEditInfo.data?.id,
    });
  };

  // Mutation States
  if (isPending) {
    return (
      <AuthenticatedPage title="Adding Vette...">
        <div>Loading...</div>
      </AuthenticatedPage>
    );
  }

  if (isError) {
    return (
      <AuthenticatedPage title="Add Vette">
        <ErrorAlert error={error} />
      </AuthenticatedPage>
    );
  }

  if (isSuccess) {
    // Get ID from response
    const vetteId = data.id;
    const isUpdate = typeof vetteToEditInfo.data !== "undefined";

    router.push(
      `/vettes/${vetteId}?isConfirmationView=true&isUpdate=${isUpdate}`
    );

    return <></>;
  }

  // Updating Vette states
  if (vetteToEditId) {
    if (vetteToEditInfo.isLoading) {
      return (
        <AuthenticatedPage title="Loading Vette...">
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
            editVetteValues={vetteToEditInfo.data}
          />
        </AuthenticatedPage>
      );
    }
  }

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
};

export default AddVette;

function ErrorAlert({ error }: { error: unknown }) {
  let errorMessage = "An error has happened";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return <Alert alertType={"danger"}>{errorMessage}</Alert>;
}

const formatValues = (values: VetteValues) => {
  let formattedValues = values;

  // Strip commas from miles
  formattedValues.miles = formattedValues.miles.replace(",", "");

  // Strip dollar sign and commas from cost
  formattedValues.cost = formattedValues.cost.replace(",", "").replace("$", "");

  return formattedValues;
};
