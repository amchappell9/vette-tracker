import AuthenticatedPage from "@/components/layouts/AuthenticatedPage";
import { ReactElement } from "react";

export default function Vettes() {
  return <h1>Vettes</h1>;
}

Vettes.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedPage title="All Vettes">{page}</AuthenticatedPage>;
};
