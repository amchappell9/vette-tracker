import * as z from "zod";
import { VetteValues } from "@/src/types";
import submodels, { Submodel } from "@/src/constants/submodels";
import trims, { Trim } from "@/src/constants/trims";
import {
  constructZodLiteralUnionType,
  Prettify,
} from "@/src/utils/typeHelpers";
import packages from "@/src/constants/packages";

const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  YEAR: "Please enter a year",
  MILES: "Miles must be a number",
  URL: "Please enter a valid URL. Ex: https://www.google.com",
};

function buildSubmodelValidation() {
  return constructZodLiteralUnionType(
    submodels.map((submodel) => z.literal(submodel.title))
  );
}

function buildPackagesValidation() {
  return constructZodLiteralUnionType(
    packages.map((vettePackage) => z.literal(vettePackage.value))
  );
}

function buildTrimsValidation() {
  return constructZodLiteralUnionType(
    trims.map((trim) => z.literal(trim.title))
  );
}

export const addVetteFormValidationSchema = z.object({
  link: z.string().url({ message: VALIDATION_MESSAGES.URL }).optional(),
  year: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  submodel: buildSubmodelValidation(),
  trim: buildTrimsValidation(),
  packages: z.array(buildPackagesValidation()),
  transmissionType: z.string({
    required_error: VALIDATION_MESSAGES.REQUIRED,
  }),
  exteriorColor: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  interiorColor: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  miles: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .regex(/^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/, VALIDATION_MESSAGES.MILES),
  cost: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .regex(/^\$(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/, "DOES NOT MEET REGEX"),
});

export type AddVetteFormValues = z.infer<typeof addVetteFormValidationSchema>;

/** Edit the vette values so they play nice with the form */
export function formatVetteValues(vetteData: VetteValues): AddVetteFormValues {
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

function getSubmodelFromLink(link: string): Submodel | undefined {
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

function getTrimFromLink(link: string): Trim | undefined {
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
