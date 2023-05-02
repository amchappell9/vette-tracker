import React, { useState } from "react";
import { useAllVettes } from "@/features/AllVettes/api/getAllVettes";
import { Submodels } from "@/constants/submodels";
import Alert from "../Alert/Alert";
import AddFirstVetteMessage from "@/features/AllVettes/AddFirstVetteMessage/AddFirstVetteMessage";
import SubmodelSelector from "./SubmodelSelector/SubmodelSelector";
import PriceGraph from "./PriceGraph/PriceGraph";
import AuthenticatedPage from "../layouts/AuthenticatedPage/AuthenticatedPage";

export default function Trends() {
  const { data, isLoading, error } = useAllVettes();
  const [selectedSubmodel, setSelectedSubmodel] =
    useState<Submodels>("Stingray");

  if (isLoading) {
    return (
      <AuthenticatedPage title="Trends">
        <div>Loading...</div>
      </AuthenticatedPage>
    );
  }

  if (error) {
    let errorComponent;

    if (error instanceof Error) {
      errorComponent = <Alert alertType={"danger"} message={error.message} />;
    } else {
      errorComponent = (
        <Alert alertType={"danger"} message={"An error has happened"} />
      );
    }

    return (
      <AuthenticatedPage title="Trends">{errorComponent}</AuthenticatedPage>
    );
  }

  if (data && data.vettes.length === 0) {
    return (
      <AuthenticatedPage title="Trends">
        <AddFirstVetteMessage />
      </AuthenticatedPage>
    );
  }

  if (data && data.vettes.length !== 0) {
    return (
      <AuthenticatedPage title="Trends">
        <div className="flex flex-col md:flex-row">
          <div className="rounded-t bg-gray-50 md:min-w-[250px] md:basis-80 md:rounded-l">
            <SubmodelSelector
              selectedSubmodel={selectedSubmodel}
              onChange={setSelectedSubmodel}
            />
          </div>
          <div className="flex-1">
            <PriceGraph submodel={selectedSubmodel} vettes={data.vettes} />
          </div>
        </div>
      </AuthenticatedPage>
    );
  }

  return <></>;
}
