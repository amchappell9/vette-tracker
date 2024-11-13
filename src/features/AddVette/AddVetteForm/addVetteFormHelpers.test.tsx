import {
  formatCost,
  formatVetteValues,
  getValuesFromLink,
} from "./addVetteFormHelpers";
import { VetteValues } from "@/src/types";

describe("addVetteFormHelpers", () => {
  describe("formatCost", () => {
    it("should add dollar sign and commas to cost string", () => {
      expect(formatCost("1000")).toBe("$1,000");
      expect(formatCost("10000")).toBe("$10,000");
      expect(formatCost("100000")).toBe("$100,000");
      expect(formatCost("1000000")).toBe("$1,000,000");
    });

    it("should handle costs with no commas needed", () => {
      expect(formatCost("100")).toBe("$100");
      expect(formatCost("99")).toBe("$99");
    });
  });

  describe("formatVetteValues", () => {
    it("should format the cost while preserving other values", () => {
      const mockVetteValues: VetteValues = {
        cost: "50000",
        // @ts-expect-error
        someOtherField: "test",
      };

      const expected = {
        cost: "$50,000",
        someOtherField: "test",
      };

      expect(formatVetteValues(mockVetteValues)).toEqual(expected);
    });
  });

  describe("getValuesFromLink", () => {
    it("should extract year, submodel, trim, and transmission type from link", () => {
      const link = "https://example.com/2018-Z06-3LZ-M7";
      const expected = {
        year: "2018",
        submodel: "Z06",
        trim: "3LZ",
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
