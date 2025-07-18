import { getVetteDateString } from "./vetteItemHelpers";

describe("getVetteDateString", () => {
  it("returns 'Added' when addedDate is the same as updatedDate", () => {
    const date = new Date(2023, 0, 15, 14, 30); // Jan is 0, 2:30 PM
    expect(getVetteDateString(date, date)).toBe("Added 01/15/2023 at 2:30 PM");
  });

  it("returns 'Updated' when addedDate is before updatedDate", () => {
    const addedDate = new Date(2023, 0, 15, 14, 30); // 2:30 PM
    const updatedDate = new Date(2023, 0, 20, 9, 15); // 9:15 AM
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 01/20/2023 at 9:15 AM"
    );
  });

  it("returns 'Added' when updatedDate is before addedDate", () => {
    const addedDate = new Date(2023, 0, 20, 16, 45); // 4:45 PM
    const updatedDate = new Date(2023, 0, 15, 8, 0); // 8:00 AM
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Added 01/20/2023 at 4:45 PM"
    );
  });

  it("formats dates correctly for single-digit months and days", () => {
    const addedDate = new Date(2023, 1, 5, 7, 5); // Feb is 1, 7:05 AM
    const updatedDate = new Date(2023, 1, 10, 13, 30); // 1:30 PM
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 02/10/2023 at 1:30 PM"
    );
  });

  it("handles leap years correctly", () => {
    const addedDate = new Date(2024, 1, 29, 12, 0); // Feb is 1, 12:00 PM
    const updatedDate = new Date(2024, 2, 1, 23, 59); // Mar is 2, 11:59 PM
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 03/01/2024 at 11:59 PM"
    );
  });

  it("formats midnight and noon correctly", () => {
    const addedDate = new Date(2023, 0, 15, 0, 0); // 12:00 AM
    const updatedDate = new Date(2023, 0, 16, 12, 0); // 12:00 PM
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 01/16/2023 at 12:00 PM"
    );
  });
});
