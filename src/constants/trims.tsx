const trims = [
  {
    title: "1LT",
    features: [
      "8-inch MyLink Display",
      "Bose 9 Speaker Sound System",
      "Driver Information Centre",
      "Power tilt/telescope steering wheel",
    ],
  },
  {
    title: "2LT",
    features: [
      "Heated & Ventilated Seats",
      "Power seats",
      "Heads-up display",
      "Curb view front camera",
      "Bose Sound System",
      "Heated, power outside mirrors",
      "Frameless inside mirror",
    ],
  },
  {
    title: "3LT",
    features: [
      "Upgraded MyLink Display",
      "Performance Data Recorder",
      "Perforated Nappa Leather Seats",
      "Leather-wrapped interior",
    ],
  },
] as const;

export type TrimsType = (typeof trims)[number];

export type Trim = (typeof trims)[number]["title"];

export type TrimFeatures = (typeof trims)[number]["features"][number];

export default trims;
