import { useCreateOrUpdateVette } from "../api/addVette";
import { VetteObject } from "@/src/types";
import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import AddVetteForm from "../AddVetteForm/AddVetteForm";
import Alert from "@/src/components/Alert/Alert";
import { formatValues } from "../addVetteHelpers";
import { AddVetteFormValues } from "../AddVetteForm/addVetteFormHelpers";
import { PencilAltIcon } from "@heroicons/react/outline";
import VetteDetail from "../../VetteDetail/VetteDetail/VetteDetail";

type AddVetteProps = {
  vetteToEdit?: VetteObject;
};

const AddVette = ({ vetteToEdit }: AddVetteProps) => {
  const isUpdate = typeof vetteToEdit !== "undefined";

  const { isSuccess, data, isError, error, isPending, mutate, reset } =
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

  if (isSuccess) {
    // Display the Vette details after creation/update
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
          onClick: () => {
            reset(); // Reset the mutation state to allow for another edit
          },
        }}
      >
        <VetteDetail
          vette={data}
          successMessage={vetteToEdit ? "updated" : "added"}
        />
      </AuthenticatedPage>
    );
  }

  return (
    <AuthenticatedPage
      title={isUpdate ? "Edit Vette" : "Add New Vette"}
      backLinkConfig={{
        backLinkText: "Back to All Vettes",
        backLinkHref: "/vettes",
      }}
    >
      {/* The error state could use some love. Currently all data is lost if there's an error */}
      {isError ? <ErrorAlert error={error} /> : null}
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
