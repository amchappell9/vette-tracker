import { VetteValues } from "@/src/types";
import { AddVetteFormValues } from "./AddVetteForm/addVetteFormHelpers";

/**
 * Formats the values returned by the AddVetteForm into the format
 * expected by the VetteValues type.
 */
export const formatValues = (values: AddVetteFormValues): VetteValues => {
  return {
    ...values,
    year: parseInt(values.year),
    miles: parseInt(values.miles.replace(",", "")),
    cost: parseFloat(values.cost.replace(",", "").replace("$", "")),
  };
};
