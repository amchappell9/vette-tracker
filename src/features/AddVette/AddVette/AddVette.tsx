import { useRouter } from "next/router";
import { useCreateOrUpdateVette } from "../api/addVette";
import { VetteObject } from "@/src/types";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import AddVetteForm from "../AddVetteForm/AddVetteForm";
import Alert from "@/src/components/Alert/Alert";
import { formatValues } from "../addVetteHelpers";
import { AddVetteFormValues } from "../AddVetteForm/addVetteFormHelpers";

type AddVetteProps = {
  vetteToEdit?: VetteObject;
};

const AddVette = ({ vetteToEdit }: AddVetteProps) => {
  const router = useRouter();
  const isUpdate = typeof vetteToEdit !== "undefined";

  const { isSuccess, data, isError, error, isPending, mutate } =
    useCreateOrUpdateVette();

  const onSubmit = async (values: AddVetteFormValues) => {
    const formattedValues = formatValues(values);

    mutate({
      vette: formattedValues,
      id: vetteToEdit?.id,
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
    // Get ID from mutation response
    const vetteId = data.id;

    router.push(
      `/vettes/${vetteId}?isConfirmationView=true&isUpdate=${isUpdate}`
    );

    return <></>;
  }

  return (
    <AuthenticatedPage
      title={isUpdate ? "Edit Vette" : "Add New Vette"}
      backLinkConfig={{
        backLinkText: "Back to All Vettes",
        backLinkHref: "/vettes",
      }}
    >
      <AddVetteForm handleSubmit={onSubmit} editVetteValues={vetteToEdit} />
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
