import { VetteValues } from "@/src/types";

/** Edit the vette values so they play nice with the form */
export function formatVetteValues(vetteData: VetteValues) {
  return {
    ...vetteData,
    cost: formatCost(vetteData.cost),
  };
}

export function formatCost(cost: string) {
  // Cost comes in with no commas and no dollar sign, add it so it
  // passes validation
  return `$${cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
