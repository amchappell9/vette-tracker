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
  // Dates will be in "MM-DD-YYYY" format, which was a mistake
  date: string;
  userId: string;
}
