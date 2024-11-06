// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) {
    return maybeError;
  }

  if (typeof maybeError === "string") {
    return new Error(maybeError);
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // Fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};

const isValidDateString = (dateString: string) => {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(dateString);
};

const datePartsAreValid = (
  month: number,
  day: number,
  year: number
): boolean => {
  const isValidMonth = month >= 0 && month <= 11;
  const isValidDay = day >= 1 && day <= 31;
  const isValidYear = year >= 0 && year <= 9999;

  return isValidMonth && isValidDay && isValidYear;
};

export const getDateObject = (dateString: string) => {
  if (!isValidDateString(dateString)) {
    throw new Error(
      `Invalid date string. Expected format of MM-DD-YYYY. Received ${dateString}`
    );
  }

  const month = parseInt(dateString.split("-")[0]) - 1;
  const day = parseInt(dateString.split("-")[1]);
  const year = parseInt(dateString.split("-")[2]);

  if (!datePartsAreValid(month, day, year)) {
    throw new Error(
      `Invalid date string. Expected format of MM-DD-YYYY. Received ${dateString}`
    );
  }

  return new Date(year, month, day);
};
