import { VetteObject } from "@/types";
import VetteItem from "../VetteItem";

type ListOfVettesProps = {
  vettesArray: VetteObject[];
};

const ListOfVettes = ({ vettesArray }: ListOfVettesProps) => {
  return (
    <ul>
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
