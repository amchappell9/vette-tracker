import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import useGetVette from "../../../hooks/useGetVette";
import Alert from "../../../components/Alert/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { VetteObject } from "../../../types/types";

type UIState = "confirmation-view" | "vette-info" | "loading" | "error";

const getHeaderInfoByState = (state: UIState, vetteData?: VetteObject) => {
  switch (state) {
    case "confirmation-view":
      return {
        title: `${vetteData?.year} Corvette ${vetteData?.submodel}`,
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
        title: `${vetteData?.year} Corvette ${vetteData?.submodel}`,
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

type VetteDetailProps = {
  setHeaderInfo: (headerInfo: {
    title: string;
    backLinkText: string;
    backLinkConfig: string;
  }) => void;
};

interface ParamModel {
  vetteId?: string;
}

interface LocationModel {
  isConfirmationView: boolean;
  isUpdate: boolean;
}

const VetteDetail = ({ setHeaderInfo }: VetteDetailProps) => {
  let { vetteId } = useParams<ParamModel>();
  let location = useLocation<LocationModel>();

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
      setHeaderInfo(getHeaderInfoByState("loading"));
    } else if (hasError) {
      setHeaderInfo(getHeaderInfoByState("error"));
    }
  }, [vetteData, location, success, isLoading, hasError, setHeaderInfo]);

  let output;

  if (isLoading) {
    output = <div>Loading...</div>;
  } else if (hasError) {
    output = (
      <div className="mt-4">
        <Alert alertType={"danger"} message={errorMessage} />
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
