import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import useGetVette from "../../hooks/useGetVette";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import VetteDetailCard from "./VetteDetailCard";

const getHeaderInfoByState = (state, vetteData) => {
  switch (state) {
    case "confirmation-view":
      return {
        title: `${vetteData.year} Corvette ${vetteData.submodel}`,
        linkText: "Add Another Vette",
        linkConfig: "/add-vette",
        linkIcon: (
          <PlusIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
        ),
        backLinkText: "Back to All Vettes",
        backLinkConfig: "/vettes",
      };

    case "vette-info":
      return {
        title: `${vetteData.year} Corvette ${vetteData.submodel}`,
        linkText: "Edit Vette",
        linkConfig: {
          pathname: "/add-vette",
          state: { vetteToEdit: vetteData },
        },
        linkIcon: (
          <PencilIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
        ),
        backLinkText: "Back to All Vettes",
        backLinkConfig: "/vettes",
      };

    case "loading":
      return {
        title: "Loading Vette...",
        backLinkText: "Back to All Vettes",
        backLinkConfig: "/vettes",
      };

    case "error":
      return {
        title: "Vette Info",
        backLinkText: "Back to All Vettes",
        backLinkConfig: "/vettes",
      };

    default:
      throw new Error("Invalid state type");
  }
};

const VetteDetail = ({ setHeaderInfo }) => {
  let { vetteId } = useParams();
  let location = useLocation();

  const [
    { isLoading, hasError, errorMessage, success, vetteData },
    setVetteId,
  ] = useGetVette(vetteId);

  useEffect(() => {
    setVetteId(vetteId);
  }, [setVetteId, vetteId]);

  useEffect(() => {
    if (success && vetteData) {
      if (location?.state?.isConfirmationView) {
        setHeaderInfo(getHeaderInfoByState("confirmation-view", vetteData));
      } else {
        setHeaderInfo(getHeaderInfoByState("vette-info", vetteData));
      }
    } else if (isLoading) {
      setHeaderInfo(getHeaderInfoByState("loading", vetteData));
    } else if (hasError) {
      setHeaderInfo(getHeaderInfoByState("error", vetteData));
    }
  }, [vetteData, location, success, isLoading, hasError, setHeaderInfo]);

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

  return <>{output}</>;
};

export default VetteDetail;
