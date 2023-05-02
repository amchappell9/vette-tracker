import React, { useState } from "react";
import { Submodels } from "@/constants/submodels";
import SubmodelSelector from "../SubmodelSelector/SubmodelSelector";
import PriceGraph from "../PriceGraph/PriceGraph";
import { VetteObject } from "@/types";

type PricesBySubmodelProps = {
  vettes: VetteObject[];
};

export default function PricesBySubmodel({ vettes }: PricesBySubmodelProps) {
  const [selectedSubmodel, setSelectedSubmodel] =
    useState<Submodels>("Stingray");

  return (
    <div className="flex flex-col md:flex-row">
      <div className="rounded-t bg-gray-50 md:min-w-[250px] md:basis-80 md:rounded-l">
        <SubmodelSelector
          selectedSubmodel={selectedSubmodel}
          onChange={setSelectedSubmodel}
        />
      </div>
      <div className="flex-1">
        <PriceGraph submodel={selectedSubmodel} vettes={vettes} />
      </div>
    </div>
  );
}
