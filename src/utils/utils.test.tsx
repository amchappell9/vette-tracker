import { getErrorMessage } from "./utils";

describe("getErrorMessage", () => {
  test("returns the message from an error object", () => {
    const error = new Error("Test error message");
    expect(getErrorMessage(error)).toBe("Test error message");
  });

  test("returns the stringified message from a non-error object", () => {
    const error = { message: "Test error message" };
    expect(getErrorMessage(error)).toBe("Test error message");
  });

  test("returns the stringified message from a non-object", () => {
    const error = "Test error message";
    expect(getErrorMessage(error)).toBe("Test error message");
  });

  // Yeah might need to change this behavior
  test("returns a fallback message for circular references", () => {
    const circularReference: any = {};
    circularReference.self = circularReference;
    expect(getErrorMessage(circularReference)).toBe("[object Object]");
  });
});
