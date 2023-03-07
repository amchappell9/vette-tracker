const packages = [
  {
    title: "Magnetic Ride Control",
    value: "MRC",
    description:
      "An innovative suspension fluid contains metal particles that align and become rigid in an instant, giving you the confidence and control to push harder while staying planted. Handling characteristics and ride quality adjusts to match the selected drive mode. ",
  },
  {
    title: "NPP Exhaust",
    value: "NPP",
    description:
      "Adjust the volume of your exhaust with the turn of a dial. Quiet while leaving early in the morning, loud at the track!",
  },
  {
    title: "Performance Data Recorder",
    value: "PDR",
    description:
      "Record high-definition video with telemetry overlays of your driving experiences on and off the track, while also providing an analysis of the run.",
  },
];

export type PackageType = typeof packages[number];

export type Packages = typeof packages[number]["value"];

export default packages;
