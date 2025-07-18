import { format } from "date-fns";

/**
 * Formats and returns a string representing when a Vette was added or updated.
 *
 * @param addedDate - The date when the Vette was added to the system
 * @param updatedDate - The date when the Vette was last updated
 * @returns A formatted string indicating whether the Vette was added or updated and the corresponding date and time
 *
 * @example
 * // Returns "Added 01/15/2023 at 2:30 PM" if addedDate is the same as or after updatedDate
 * getVetteDateString(new Date("2023-01-15T14:30:00"), new Date("2023-01-10T10:00:00"))
 *
 * @example
 * // Returns "Updated 02/20/2023 at 9:15 AM" if updatedDate is after addedDate
 * getVetteDateString(new Date("2023-01-15T14:30:00"), new Date("2023-02-20T09:15:00"))
 */
export function getVetteDateString(addedDate: Date, updatedDate: Date) {
  const formattedAddedDate = format(addedDate, "MM/dd/yyyy 'at' h:mm a");
  const formattedUpdatedDate = format(updatedDate, "MM/dd/yyyy 'at' h:mm a");

  if (addedDate.getTime() <= updatedDate.getTime()) {
    return `Added ${formattedAddedDate}`;
  } else {
    return `Updated ${formattedUpdatedDate}`;
  }
}
