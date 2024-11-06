const FILTER_TYPES = {
  SELECT: "Select",
  DATE: "Date",
  SLIDER: "Slider",
} as const;

export type FilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];

export default FILTER_TYPES;
