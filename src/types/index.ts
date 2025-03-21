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

/**
 * The value of a vette object that is returned from the API.
 */
export interface VetteObject extends VetteValues {
  id: string;
  createdDate: string;
  updatedDate: string;
  userId: string;
}
