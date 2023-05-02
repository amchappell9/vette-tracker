import React from "react";
import { useAllVettes } from "@/features/AllVettes/api/getAllVettes";
import Alert from "../Alert/Alert";
import AddFirstVetteMessage from "@/features/AllVettes/AddFirstVetteMessage/AddFirstVetteMessage";
import AuthenticatedPage from "../layouts/AuthenticatedPage/AuthenticatedPage";
import PricesBySubmodel from "./PricesBySubmodel/PricesBySubmodel";

export default function Trends() {
  const { data, isLoading, error } = useAllVettes();

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

  if (data && data.vettes.length > 0) {
    return (
      <AuthenticatedPage title="Trends">
        <PricesBySubmodel vettes={data.vettes} />
      </AuthenticatedPage>
    );
  }

  return <></>;
}
