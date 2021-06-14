import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, PencilIcon } from "@heroicons/react/outline";
import useGetVette from "../../hooks/useGetVette";
import Alert, { ALERT_TYPES } from "../../components/Alert";
import VetteDetailCard from "./VetteDetailCard";

const VetteDetail = () => {
  let { vetteId } = useParams();
  let location = useLocation();

  const [isConfirmationView, setIsConfirmationView] = useState(
    location.state && location.state.isConfirmationView ? true : false
  );
  const [
    { isLoading, hasError, errorMessage, success, vetteData },
    setVetteId,
  ] = useGetVette(vetteId);

  useEffect(() => {
    setVetteId(vetteId);
  }, [setVetteId, vetteId]);

  // See if confirmation view needs to be shown
  useEffect(() => {
    setIsConfirmationView(
      location.state && location.state.isConfirmationView ? true : false
    );
  }, [location]);

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

  return (
    <div className="min-main-height flex justify-center">
      <div className="max-w-4xl w-full -mt-44 mb-8">
        <div className="text-gray-300 hover:underline mb-8">
          <Link to="/vettes">
            <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5" />
            Back to All Vettes
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">
            {success
              ? `${vetteData.year} Corvette ${vetteData.submodel}`
              : "Vette Information"}
          </h1>
          <div className="text-right">
            {isConfirmationView ? (
              <Link
                to="/add-vette"
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                <PlusIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
                Add Another Vette
              </Link>
            ) : (
              <>
                {success && (
                  <Link
                    to={{
                      pathname: "/add-vette",
                      state: { vetteToEdit: vetteData },
                    }}
                    className="px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
                  >
                    <PencilIcon className="inline w-5 h-5 mr-1 align-text-bottom" />
                    Edit Vette
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        {output}
      </div>
    </div>
  );
};

export default VetteDetail;
