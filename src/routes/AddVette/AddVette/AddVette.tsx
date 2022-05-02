import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import AddVetteForm from "../AddVetteForm";
import useAddVette from "../../../hooks/useAddVette";
import useUpdateVette from "../../../hooks/useUpdateVette";
import Alert from "../../../components/Alert/Alert";
import { VetteObject } from "../../../types/VetteObject";

const formatValues = (values: VetteObject) => {
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
  vetteToEdit: VetteObject;
}

const AddVette = ({ setHeaderInfo }: AddVetteProps) => {
  const [vetteToEditInfo, setVetteToEditInfo] = useState<VetteObject | null>(
    null
  );
  const [
    { isLoading, hasError, errorMessage, success, submissionResponse },
    addVette,
  ] = useAddVette();
  const [
    {
      isLoading: updateIsLoading,
      hasError: updateHasError,
      errorMessage: updateErrorMessage,
      success: updateSuccessful,
      response: updateResponse,
    },
    updateVette,
  ] = useUpdateVette();

  const location = useLocation<LocationState>();
  const { vetteToEdit } = location.state;

  useEffect(() => {
    if (vetteToEdit) {
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
  }, [vetteToEdit, setHeaderInfo]);

  const onSubmit = async (values: VetteObject) => {
    const formattedValues = formatValues(values);

    if (vetteToEditInfo) {
      updateVette(vetteToEditInfo.id, formattedValues);
    } else {
      addVette(formattedValues);
    }
  };

  // Combining the two hook responses below is a little clunky, probably should be refactored into a single hook or something
  if (
    !isLoading &&
    !updateIsLoading &&
    !hasError &&
    !updateHasError &&
    !success &&
    !updateSuccessful
  ) {
    return (
      <AddVetteForm handleSubmit={onSubmit} vetteToEditInfo={vetteToEditInfo} />
    );
  } else if (isLoading || updateIsLoading) {
    return <div>Loading...</div>;
  } else if (hasError || updateHasError) {
    return (
      <Alert
        alertType={"danger"}
        message={errorMessage !== "" ? errorMessage : updateErrorMessage}
      />
    );
  } else if (success || updateSuccessful) {
    const vetteId = success ? submissionResponse.id : updateResponse.id;
    const isUpdate = updateSuccessful;

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
