import { getVetteDateString } from "./vetteItemHelpers";

describe("getVetteDateString", () => {
  it("returns 'Added' when addedDate is the same as updatedDate", () => {
    const date = new Date(2023, 0, 15); // Jan is 0
    expect(getVetteDateString(date, date)).toBe("Added 01/15/2023");
  });

  it("returns 'Updated' when addedDate is before updatedDate", () => {
    const addedDate = new Date(2023, 0, 15);
    const updatedDate = new Date(2023, 0, 20);
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 01/20/2023"
    );
  });

  it("returns 'Added' when updatedDate is before addedDate", () => {
    const addedDate = new Date(2023, 0, 20);
    const updatedDate = new Date(2023, 0, 15);
    expect(getVetteDateString(addedDate, updatedDate)).toBe("Added 01/20/2023");
  });

  it("formats dates correctly for single-digit months and days", () => {
    const addedDate = new Date(2023, 1, 5); // Feb is 1
    const updatedDate = new Date(2023, 1, 10);
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 02/10/2023"
    );
  });

  it("handles leap years correctly", () => {
    const addedDate = new Date(2024, 1, 29); // Feb is 1
    const updatedDate = new Date(2024, 2, 1); // Mar is 2
    expect(getVetteDateString(addedDate, updatedDate)).toBe(
      "Updated 03/01/2024"
    );
  });
});
