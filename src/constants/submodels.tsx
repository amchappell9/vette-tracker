const submodels = [
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

// If you make it as const, the AddVetteForm.tsx will complain about the
// submodels.filter() method. The years property becomes a type of
// years: readonly ["2014", "2015", "2016", "2017", "2018", "2019"] | readonly ["2017", "2018", "2019"] | readonly ["2015", "2016", "2017", "2018", "2019"] | readonly ["2019"]
// I still don't know how to get a union type for titles and engines, or years. I could make
// a type for property then stich it together, but I should just be able to derive it from that array.

export type SubmodelType = (typeof submodels)[number];

export type Submodels = SubmodelType["title"];

export type Engines = SubmodelType["engine"];

export default submodels;
