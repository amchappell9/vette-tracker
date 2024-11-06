import { format } from "date-fns";
import { getErrorMessage, getDateObject } from "./utils";

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

describe("getDateObject", () => {
  test("returns a Date object for a valid date string", () => {
    const dateString = "12-25-2020";
    const date = getDateObject(dateString);
    expect(date).toBeInstanceOf(Date);
    expect(date.getFullYear()).toBe(2020);
    expect(date.getMonth()).toBe(11);
    expect(date.getDate()).toBe(25);

    // Test that it will be displayed properly
    const formattedDate = format(date, "MM/dd/yyyy");
    expect(formattedDate).toBe("12/25/2020");
  });

  test("throws an error for an invalid date string", () => {
    const dateString = "25-12-2020";
    expect(() => getDateObject(dateString)).toThrow(
      "Invalid date string. Expected format of MM-DD-YYYY. Received 25-12-2020"
    );
  });

  test("throws an error for a non-date string", () => {
    const dateString = "invalid-date";
    expect(() => getDateObject(dateString)).toThrow(
      "Invalid date string. Expected format of MM-DD-YYYY. Received invalid-date"
    );
  });
});
