import React from "react";
import { useAllVettes } from "@/src/features/AllVettes/api/getAllVettes";
import Alert from "../Alert/Alert";
import AddFirstVetteMessage from "@/src/features/AllVettes/AddFirstVetteMessage/AddFirstVetteMessage";
import AuthenticatedPage from "../layouts/AuthenticatedPage/AuthenticatedPage";
import PricesBySubmodel from "./PricesBySubmodel/PricesBySubmodel";

export default function Trends() {
  const { data: vettes, isLoading, error } = useAllVettes();

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
      errorComponent = <Alert alertType={"danger"}>{error.message}</Alert>;
    } else {
      errorComponent = (
        <Alert alertType={"danger"}>An error has happened</Alert>
      );
    }

    return (
      <AuthenticatedPage title="Trends">{errorComponent}</AuthenticatedPage>
    );
  }

  if (vettes && vettes.length === 0) {
    return (
      <AuthenticatedPage title="Trends">
        <AddFirstVetteMessage />
      </AuthenticatedPage>
    );
  }

  if (vettes && vettes.length > 0) {
    return (
      <AuthenticatedPage title="Trends" cardPadding="none">
        <PricesBySubmodel vettes={vettes} />
      </AuthenticatedPage>
    );
  }

  return <></>;
}
