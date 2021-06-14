import { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import AddVetteForm from "./AddVetteForm";
import useAddVette from "../../hooks/useAddVette";
import useUpdateVette from "../../hooks/useUpdateVette";
import Alert, { ALERT_TYPES } from "../../components/Alert";

const AddVette = () => {
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
    }
  }, [location]);

  const onSubmit = async (values) => {
    if (vetteToEditInfo) {
      updateVette(vetteToEditInfo.id, values);
    } else {
      addVette(values);
    }
  };

  let output;

  // Combining the two hook responses below is a little clunky, probably should be refactored into a single hook or something
  if (
    !isLoading &&
    !updateIsLoading &&
    !hasError &&
    !updateHasError &&
    !success &&
    !updateSuccessful
  ) {
    output = (
      <AddVetteForm onSubmit={onSubmit} vetteToEditInfo={vetteToEditInfo} />
    );
  } else if (isLoading || updateIsLoading) {
    output = <div>Loading...</div>;
  } else if (hasError || updateHasError) {
    output = (
      <Alert
        alertType={ALERT_TYPES.DANGER}
        message={errorMessage !== "" ? errorMessage : updateErrorMessage}
      />
    );
  } else if (success || updateSuccessful) {
    const vetteId = success ? submissionResponse.id : updateResponse.id;
    const isUpdate = updateSuccessful;

    output = (
      <Redirect
        to={{
          pathname: `/vettes/${vetteId}`,
          state: { isConfirmationView: true, isUpdate: isUpdate },
        }}
      />
    );
  }

  return (
    <div className="min-main-height flex justify-center">
      <div className="max-w-4xl w-full -mt-44 mb-8">
        <div className="text-gray-300 hover:underline mb-8">
          {vetteToEditInfo ? (
            <Link to={`/vettes/${vetteToEditInfo.id}`}>
              <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5" />
              {`Back to ${vetteToEditInfo.year} Corvette`}
            </Link>
          ) : (
            <Link to="/vettes">
              <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5" />
              Back to All Vettes
            </Link>
          )}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">Add Vettes</h1>
        </div>
        <div className="rounded bg-white w-full shadow-lg mt-4">{output}</div>
      </div>
    </div>
  );
};

export default AddVette;
