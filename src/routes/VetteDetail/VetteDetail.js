import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PlusIcon, PencilIcon } from "@heroicons/react/outline";
import useGetVette from "../../hooks/useGetVette";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import VetteDetailCard from "./VetteDetailCard";

const VetteDetail = ({ setTitle, setlinkText, setLinkConfig, setLinkIcon }) => {
  let { vetteId } = useParams();
  let location = useLocation();

  // const [isConfirmationView, setIsConfirmationView] = useState(
  //   location.state && location.state.isConfirmationView ? true : false
  // );
  const [
    { isLoading, hasError, errorMessage, success, vetteData },
    setVetteId,
  ] = useGetVette(vetteId);

  // Set title and button properties in AuthenticatedPage once VetteData has been retreived
  useEffect(() => {
    if (success) {
      setTitle(`${vetteData.year} Corvette ${vetteData.submodel}`);
      setlinkText("Edit Vette");
      setLinkConfig({
        pathname: "/add-vette",
        state: { vetteToEdit: vetteData },
      });
      setLinkIcon(
        <PencilIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
      );
    }
  }, [vetteData, success, setTitle, setlinkText, setLinkConfig, setLinkIcon]);

  useEffect(() => {
    setVetteId(vetteId);
  }, [setVetteId, vetteId]);

  // See if confirmation view needs to be shown
  useEffect(() => {
    // setIsConfirmationView(
    //   location.state && location.state.isConfirmationView ? true : false
    // );

    // Will need to revisit this. Need to see if this works, if so I can get rid of confirmation view.
    // Might not work though, since the other useEffect might overwrite it
    if (location.state && location.state.isConfirmationView) {
      setlinkText("Add Another Vette");
      setLinkConfig("/add-vette");
      setLinkIcon(
        <PlusIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
      );
    }
  }, [location, setlinkText, setLinkConfig, setLinkIcon]);

  let output;

  if (isLoading) {
    output = <div>Loading...</div>;
  } else if (hasError) {
    output = (
      <div className="mt-4">
        <Alert alertType={ALERT_TYPES.DANGER} message={errorMessage} />
      </div>
    );
  } else if (success) {
    output = (
      <VetteDetailCard
        vetteData={vetteData}
        wasUpdated={location?.state?.isUpdate}
      />
    );
  }

  // Need to add back button and confirmation view

  return <>{output}</>;
};

export default VetteDetail;
