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

export const getDateObject = (dateString: string) => {
  if (!isValidDateString(dateString)) {
    throw new Error(
      `Invalid date string. Expected format of MM-DD-YYYY. Received ${dateString}`
    );
  }

  const month = parseInt(dateString.split("-")[0]);
  const day = parseInt(dateString.split("-")[1]);
  const year = parseInt(dateString.split("-")[2]);

  return new Date(year, month, day);
};
