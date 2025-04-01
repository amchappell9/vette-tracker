import { format } from "date-fns";

/**
 * Formats and returns a string representing when a Vette was added or updated.
 *
 * @param addedDate - The date when the Vette was added to the system
 * @param updatedDate - The date when the Vette was last updated
 * @returns A formatted string indicating whether the Vette was added or updated and the corresponding date
 *
 * @example
 * // Returns "Added 01/15/2023" if addedDate is the same as or after updatedDate
 * getVetteDateString(new Date("2023-01-15"), new Date("2023-01-10"))
 *
 * @example
 * // Returns "Updated 02/20/2023" if updatedDate is after addedDate
 * getVetteDateString(new Date("2023-01-15"), new Date("2023-02-20"))
 */
export function getVetteDateString(addedDate: Date, updatedDate: Date) {
  const formattedAddedDate = format(addedDate, "MM/dd/yyyy");
  const formattedUpdatedDate = format(updatedDate, "MM/dd/yyyy");

  if (addedDate.getTime() <= updatedDate.getTime()) {
    return `Added ${formattedAddedDate}`;
  } else {
    return `Updated ${formattedUpdatedDate}`;
  }
}
