import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import AddVetteForm from "./AddVetteForm";
import useAddVette from "../../hooks/useAddVette";
import useUpdateVette from "../../hooks/useUpdateVette";
import Alert, { ALERT_TYPES } from "../../components/Alert";

const AddVette = ({ setTitle, setBackLinkText, setBackLinkConfig }) => {
  const [vetteToEditInfo, setVetteToEditInfo] = useState(null);
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

  let location = useLocation();

  useEffect(() => {
    if (location.state && location.state.vetteToEdit) {
      setVetteToEditInfo(location.state.vetteToEdit);
      setTitle("Edit Vette");
      setBackLinkText(`Back to ${location.state.vetteToEdit.year} Corvette`);
      setBackLinkConfig(`/vettes/${location.state.vetteToEdit.id}`);
    } else {
      setTitle("Add Vette");
      setBackLinkText("Back to All Vettes");
      setBackLinkConfig("/vettes");
    }
  }, [location, setTitle, setBackLinkText, setBackLinkConfig]);

  const onSubmit = async (values) => {
    if (vetteToEditInfo) {
      updateVette(vetteToEditInfo.id, values);
    } else {
      addVette(values);
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
      <AddVetteForm onSubmit={onSubmit} vetteToEditInfo={vetteToEditInfo} />
    );
  } else if (isLoading || updateIsLoading) {
    return <div>Loading...</div>;
  } else if (hasError || updateHasError) {
    return (
      <Alert
        alertType={ALERT_TYPES.DANGER}
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
