import { Chart, LinearScale, PointElement, TimeScale } from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { VetteObject } from "../../../types/types";
import { Submodels } from "../../../constants/submodels";

Chart.register(LinearScale, PointElement, TimeScale);

type PriceGraphProps = {
  vettes: VetteObject[];
  submodel: Submodels;
};

const getChartData = (vettes: VetteObject[]): { x: Date; y: number }[] => {
  return vettes.map((vette) => {
    return {
      x: new Date(vette.date),
      y: Number(vette.cost),
    };
  });
};

const filterVettesBySubmodel = (vettes: VetteObject[], submodel: Submodels) => {
  return vettes.filter((vette) => vette.submodel === submodel);
};

const PriceGraph = ({ vettes, submodel }: PriceGraphProps) => {
  const data = {
    datasets: [
      {
        label: "Vettes",
        data: getChartData(filterVettesBySubmodel(vettes, submodel)),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div className="px-16 py-8">
      <h2 className="mb-4 text-center text-xl font-bold text-gray-600">
        {submodel} Prices Over Time
      </h2>
      <Scatter
        data={data}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PriceGraph;
