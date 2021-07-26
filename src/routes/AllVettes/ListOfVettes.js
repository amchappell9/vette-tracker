import React from "react";
import VetteItem from "./VetteItem";

const ListOfVettes = ({ vettesArray }) => {
  return (
    <ul className="p-8">
      {vettesArray.map((vette, index) => (
        <VetteItem
          key={vette.id}
          vette={vette}
          index={index}
          listLength={vettesArray.length}
        />
      ))}
    </ul>
  );
};

export default ListOfVettes;
