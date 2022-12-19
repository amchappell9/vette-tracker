// import { ExteriorColors } from "../constants/exteriorColors";
// import { InteriorColor } from "../constants/interiorColors";
// import { Packages } from "../constants/packages";
// import { Submodels } from "../constants/submodels";
// import { Trims } from "../constants/trims";

export type Year = "2014" | "2015" | "2016" | "2017" | "2018" | "2019";

export type TransmissionTypes = "Manual" | "Automatic";

// Need to improve this type but I need to learn more typescript first
// export interface VetteValues {
//   year: Year;
//   miles: string;
//   cost: string;
//   transmissionType: TransmissionTypes;
//   exteriorColor: ExteriorColors;
//   interiorColor: InteriorColor;
//   submodel: Submodels;
//   trim: Trims;
//   packages: Packages[];
//   link: string;
// }

export interface VetteValues {
  year: string;
  miles: string;
  cost: string;
  transmissionType: string;
  exteriorColor: string;
  interiorColor: string;
  submodel: string;
  trim: string;
  packages: string[];
  link: string;
}

export interface VetteObject extends VetteValues {
  id: string;
  date: string;
  userId: string;
}
