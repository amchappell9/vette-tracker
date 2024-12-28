import { Packages } from "../constants/packages";
import { Submodel } from "../constants/submodels";
import { Trim } from "../constants/trims";

export interface VetteValues {
  year: string;
  miles: string;
  cost: string;
  transmissionType: string;
  exteriorColor: string;
  interiorColor: string;
  submodel: Submodel;
  trim: Trim;
  packages: Packages[];
  link?: string;
}

export interface VetteObject extends VetteValues {
  id: string;
  // Dates will be in "MM-DD-YYYY" format, which was a mistake
  date: string;
  userId: string;
}
