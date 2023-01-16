import { useEffect, useState } from "react";
import { HeaderInfoObject } from "../../components/layouts/AuthenticatedPage/AuthenticatedPage";
import { Submodels } from "../../constants/submodels";
import AddFirstVetteMessage from "../AllVettes/AddFirstVetteMessage/AddFirstVetteMessage";
import { useAllVettes } from "../AllVettes/api/getAllVettes";
import PriceGraph from "./PriceGraph/PriceGraph";
import SubmodelSelector from "./SubmodelSelector/SubmodelSelector";

type TrendsProps = {
  setHeaderInfo: (headerInfo: HeaderInfoObject) => void;
};

const Trends = ({ setHeaderInfo }: TrendsProps) => {
  const { data, isLoading, error } = useAllVettes();
  const [selectedSubmodel, setSelectedSubmodel] =
    useState<Submodels>("Stingray");

  useEffect(() => {
    setHeaderInfo({ title: "Trends" });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error instanceof Error) {
      // TODO: Make an alert
      return <div>{error.message}</div>;
    }
  }

  if (data && data.vettes.length === 0) {
    return <AddFirstVetteMessage />;
  }

  if (data && data.vettes.length !== 0) {
    return (
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
    );
  }

  return <></>;
};

export default Trends;
