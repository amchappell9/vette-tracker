type TitleModel = "Stingray" | "Z51" | "Grand Sport" | "Z06" | "ZR1";
type EngineModel = "LT1" | "LT4" | "LT5";

export interface SubmodelType {
  title: TitleModel;
  engine: EngineModel;
  hp: string;
  torque: string;
  features: string[];
  years: string[];
}

const submodels: SubmodelType[] = [
  {
    title: "Stingray",
    engine: "LT1",
    hp: "455",
    torque: "460",
    features: [
      "Removable Roof Panel",
      "HID Headlamps",
      "Dual Zone Climate",
      "5 Drive Modes",
      "Dual Exhaust",
    ],
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  {
    title: "Z51",
    engine: "LT1",
    hp: "455",
    torque: "460",
    features: [
      "Dry Sump Oil System",
      "Larger Brakes",
      "Close Ratio Gearing",
      "Electronic LSD",
      "Trans + Diff Cooler",
      "19” / 20” Wheels",
    ],
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  {
    title: "Grand Sport",
    engine: "LT1",
    hp: "455",
    torque: "460",
    features: [
      "Wide body",
      "Brembo Brakes",
      "Magnetic Ride Control",
      "Electronic LSD",
      "Dry Sump Oil System",
      "Trans + Diff Cooler",
    ],
    years: ["2017", "2018", "2019"],
  },
  {
    title: "Z06",
    engine: "LT4",
    hp: "650",
    torque: "650",
    features: [
      "Wide body",
      "Brembo Brakes",
      "Magnetic Ride Control",
      "Electronic LSD",
      "Dry Sump Oil System",
      "Trans + Diff Cooler",
    ],
    years: ["2015", "2016", "2017", "2018", "2019"],
  },
  {
    title: "ZR1",
    engine: "LT5",
    hp: "755",
    torque: "715",
    features: ["Z06 Features", "Improved Cooling", "Ceramic Brakes"],
    years: ["2019"],
  },
];

export default submodels;