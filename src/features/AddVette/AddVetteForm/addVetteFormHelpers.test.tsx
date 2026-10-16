import {
  addVetteFormValidationSchema,
  formatCost,
  formatVetteValues,
  getValuesFromLink,
} from "./addVetteFormHelpers";
import { VetteValues } from "@/src/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { validateYupSchema, yupToFormErrors } from "formik";
import submodels from "@/src/constants/submodels";
import trims from "@/src/constants/trims";
import packages from "@/src/constants/packages";

describe("addVetteFormHelpers", () => {
  describe("form validation", () => {
    const validValues = {
      link: "https://example.com/2018-Z06",
      year: "2018",
      submodel: "Z06",
      trim: "3LT",
      packages: ["MRC", "NPP", "PDR"],
      transmissionType: "Manual",
      exteriorColor: "Arctic White",
      interiorColor: "Jet Black",
      miles: "72,000",
      cost: "$45,000",
    };

    it("accepts every existing submodel, trim, and package", () => {
      for (const submodel of submodels) {
        for (const trim of trims) {
          expect(
            addVetteFormValidationSchema.safeParse({
              ...validValues,
              submodel: submodel.title,
              trim: trim.title,
              packages: packages.map((item) => item.value),
            }).success,
          ).toBe(true);
        }
      }
    });

    it.each(["0", "72000", "72,000", "72000.5", "72,000.50"])(
      "preserves numeric formatting support for %s",
      (amount) => {
        expect(
          addVetteFormValidationSchema.safeParse({
            ...validValues,
            miles: amount,
            cost: `$${amount}`,
          }).success,
        ).toBe(true);
      },
    );

    it("allows an omitted link and no packages", () => {
      expect(
        addVetteFormValidationSchema.safeParse({
          ...validValues,
          link: undefined,
          packages: [],
        }).success,
      ).toBe(true);
    });

    it.each([
      ["link", "not-a-url"],
      ["submodel", "unknown"],
      ["trim", "unknown"],
      ["packages", ["unknown"]],
      ["miles", "12,34"],
      ["miles", "-1"],
      ["cost", "45000"],
      ["cost", "$12,34"],
    ])("rejects invalid %s values", (field, value) => {
      const result = addVetteFormValidationSchema.safeParse({
        ...validValues,
        [field]: value,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe(field);
      }
    });

    it("preserves required-field errors through Formik's empty-string normalization", async () => {
      const schema = toFormikValidationSchema(addVetteFormValidationSchema);
      const fields = [
        "year",
        "transmissionType",
        "exteriorColor",
        "interiorColor",
        "miles",
        "cost",
      ];
      const values = {
        ...validValues,
        link: "",
        ...Object.fromEntries(fields.map((field) => [field, ""])),
      };
      const error = await validateYupSchema(values, schema).catch(
        (error) => error,
      );
      expect(yupToFormErrors(error)).toEqual(
        Object.fromEntries(
          fields.map((field) => [field, "This field is required"]),
        ),
      );
    });

    it("maps URL and mileage errors to the existing Formik field messages", async () => {
      const schema = toFormikValidationSchema(addVetteFormValidationSchema);
      const error = await validateYupSchema(
        { ...validValues, link: "invalid", miles: "invalid" },
        schema,
      ).catch((error) => error);
      expect(yupToFormErrors(error)).toEqual({
        link: "Please enter a valid URL. Ex: https://www.google.com",
        miles: "Miles must be a number",
      });
    });

    it("validates successful submissions through the Formik adapter", async () => {
      await expect(
        validateYupSchema(
          validValues,
          toFormikValidationSchema(addVetteFormValidationSchema),
        ),
      ).resolves.toBeUndefined();
    });
  });

  describe("formatCost", () => {
    it("should add dollar sign and commas to cost string", () => {
      expect(formatCost(1000)).toBe("$1,000");
      expect(formatCost(10000)).toBe("$10,000");
      expect(formatCost(100000)).toBe("$100,000");
      expect(formatCost(1000000)).toBe("$1,000,000");
    });

    it("should handle costs with no commas needed", () => {
      expect(formatCost(100)).toBe("$100");
      expect(formatCost(99)).toBe("$99");
    });
  });

  describe("formatVetteValues", () => {
    it("should format the cost while preserving other values", () => {
      const mockVetteValues: VetteValues = {
        cost: 50000,
        year: 2020,
        submodel: "Stingray",
        trim: "3LT",
        transmissionType: "Automatic",
        miles: 15000,
        exteriorColor: "Red",
        interiorColor: "Black",
        packages: ["MRC", "NPP"],
        // @ts-expect-error
        someOtherField: "test", // Additional field to test preservation
      };

      const expected = {
        cost: "$50,000",
        year: "2020",
        submodel: "Stingray",
        trim: "3LT",
        transmissionType: "Automatic",
        miles: "15000",
        exteriorColor: "Red",
        interiorColor: "Black",
        packages: ["MRC", "NPP"],
        someOtherField: "test",
      };

      expect(formatVetteValues(mockVetteValues)).toEqual(expected);
    });
  });

  describe("getValuesFromLink", () => {
    it("should extract year, submodel, trim, and transmission type from link", () => {
      const link = "https://example.com/2018-Z06-3LT-M7";
      const expected = {
        year: "2018",
        submodel: "Z06",
        trim: "3LT",
        transmissionType: "Manual",
      };
      expect(getValuesFromLink(link)).toEqual(expected);
    });

    it("should return undefined for missing values in the link", () => {
      const link = "https://example.com/2018";
      const expected = {
        year: "2018",
        submodel: undefined,
        trim: undefined,
        transmissionType: undefined,
      };
      expect(getValuesFromLink(link)).toEqual(expected);
    });

    it("should handle variations in submodel names", () => {
      const link = "https://example.com/2018-GS-1LT-A8";
      const expected = {
        year: "2018",
        submodel: "Grand Sport",
        trim: "1LT",
        transmissionType: "Automatic",
      };
      expect(getValuesFromLink(link)).toEqual(expected);
    });
  });
});
