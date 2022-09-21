import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import AddVetteForm from "../AddVetteForm";
import Alert from "../../../components/Alert/Alert";
import { VetteObject, VetteValues } from "../../../types/types";
import { useCreateOrUpdateVette } from "../api/addVette";

const formatValues = (values: VetteValues) => {
  let formattedValues = values;

  // Strip commas from miles
  formattedValues.miles = formattedValues.miles.replace(",", "");

  // Strip dollar sign and commas from cost
  formattedValues.cost = formattedValues.cost.replace(",", "").replace("$", "");

  return formattedValues;
};

type AddVetteProps = {
  setHeaderInfo: (headerInfo: {
    title: string;
    backLinkText: string;
    backLinkConfig: string;
  }) => void;
};

interface LocationState {
  vetteToEdit?: VetteObject;
}

const AddVette = ({ setHeaderInfo }: AddVetteProps) => {
  const [vetteToEditInfo, setVetteToEditInfo] = useState<VetteObject | null>(
    null
  );

  const { isSuccess, data, isError, error, isLoading, mutate } =
    useCreateOrUpdateVette();

  const location = useLocation<LocationState>();

  useEffect(() => {
    if (location.state != null && location.state.vetteToEdit) {
      const { vetteToEdit } = location.state;

      setVetteToEditInfo(vetteToEdit);
      setHeaderInfo({
        title: "Edit Vette",
        backLinkText: `Back to ${vetteToEdit.year} Corvette`,
        backLinkConfig: `/vettes/${vetteToEdit.id}`,
      });
    } else {
      setHeaderInfo({
        title: "Add New Vette",
        backLinkText: "Back to All Vettes",
        backLinkConfig: "/vettes",
      });
    }
  }, [location, setHeaderInfo]);

  const onSubmit = async (values: VetteValues) => {
    const formattedValues = formatValues(values);

    mutate({
      vette: formattedValues,
      id: vetteToEditInfo?.id,
    });
  };

  if (!isLoading && !isError && !isSuccess) {
    return (
      <AddVetteForm handleSubmit={onSubmit} vetteToEditInfo={vetteToEditInfo} />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    let errorMessage = "An error has happened";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return <Alert alertType={"danger"} message={errorMessage} />;
  }

  if (isSuccess) {
    // Get ID from response
    const vetteId = data.id;
    const isUpdate = vetteToEditInfo !== null;

    return (
      <Redirect
        to={{
          pathname: `/vettes/${vetteId}`,
          state: { isConfirmationView: true, isUpdate: isUpdate },
        }}
      />
    );
  }
};

export default AddVette;
