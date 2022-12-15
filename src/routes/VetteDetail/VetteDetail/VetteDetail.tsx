import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import Alert from "../../../components/Alert/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { VetteObject } from "../../../types/types";
import { useVette } from "../api/getVette";
import { getErrorMessage } from "../../../utils/utils";

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
  vetteId: string;
}

interface LocationModel {
  isConfirmationView: boolean;
  isUpdate: boolean;
}

const VetteDetail = ({ setHeaderInfo }: VetteDetailProps) => {
  const { vetteId } = useParams<ParamModel>();
  let location = useLocation<LocationModel>();

  const { data, isLoading, error } = useVette({ vetteId });

  // Update header info based on state
  useEffect(() => {
    if (data) {
      if (location?.state?.isConfirmationView) {
        setHeaderInfo(getHeaderInfoByState("confirmation-view", data));
      } else {
        setHeaderInfo(getHeaderInfoByState("vette-info", data));
      }
    } else if (isLoading) {
      setHeaderInfo(getHeaderInfoByState("loading"));
    } else if (error) {
      setHeaderInfo(getHeaderInfoByState("error"));
    }
  }, [data, isLoading, error, setHeaderInfo, location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = getErrorMessage(error);

    return (
      <div className="mt-4">
        <Alert alertType={"danger"} message={errorMessage} />
      </div>
    );
  }

  if (data) {
    return (
      <VetteDetailCard
        vetteData={data}
        wasUpdated={location?.state?.isUpdate}
      />
    );
  }

  return null;
};

export default VetteDetail;
