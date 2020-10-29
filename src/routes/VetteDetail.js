import React from "react";
import { useParams } from "react-router-dom";

const VetteDetail = () => {
  let { id } = useParams();

  return <div>Vette ID {id}</div>;
};

export default VetteDetail;
