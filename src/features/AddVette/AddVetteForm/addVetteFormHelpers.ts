import { VetteValues } from "@/src/types";
import submodels from "@/src/constants/submodels";
import trims from "@/src/constants/trims";

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

export function getValuesFromLink(link: string): Partial<VetteValues> {
  return {
    year: getYearFromLink(link),
    submodel: getSubmodelFromLink(link),
    trim: getTrimFromLink(link),
    transmissionType: getTransmissionTypeFromLink(link),
  };
}

function getYearFromLink(link: string): string | undefined {
  // Check if the link contains 2014 through 2019
  const yearMatch = link.match(/201[4-9]/);
  return yearMatch ? yearMatch[0] : undefined;
}

function getSubmodelFromLink(link: string): string | undefined {
  for (const submodel of submodels) {
    if (link.toUpperCase().includes(submodel.title.toUpperCase())) {
      return submodel.title;
    }
  }

  // Variations
  if (link.toUpperCase().includes("ZO6")) {
    return "Z06";
  }

  if (link.toUpperCase().includes("GS")) {
    return "Grand Sport";
  }

  return undefined;
}

function getTrimFromLink(link: string): string | undefined {
  // Check if the link contains 1LT through 3LZ
  for (const trim of trims) {
    if (link.toUpperCase().includes(trim.title.toUpperCase())) {
      return trim.title;
    }
  }
}

function getTransmissionTypeFromLink(link: string): string | undefined {
  const manualAcroyms = ["MAN", "M7"];
  const automaticAcroyms = ["AUTO", "A8"];

  for (const acronym of manualAcroyms) {
    if (link.toUpperCase().includes(acronym)) {
      return "Manual";
    }
  }

  for (const acronym of automaticAcroyms) {
    if (link.toUpperCase().includes(acronym)) {
      return "Automatic";
    }
  }
}
