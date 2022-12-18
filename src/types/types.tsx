export type Year = "2014" | "2015" | "2016" | "2017" | "2018" | "2019";

export type TransmissionTypes = "Manual" | "Automatic";

export type Packages = "MRC" | "NPP" | "PDR";

// Need to improve this type, but right now it breaks the form
export interface VetteValues {
  year: Year;
  miles: string;
  cost: string;
  transmissionType: TransmissionTypes;
  exteriorColor: string;
  interiorColor: string;
  submodel: string;
  trim: string;
  packages: Packages[];
  link: string;
}

export interface VetteObject extends VetteValues {
  id: string;
  date: string;
  userId: string;
}
