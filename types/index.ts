/**
 * Structure of the error that could be returned by the Netlify go-true API.
 *
 * Tried to mimic the error responses from the micro-api-client API. Unfortunately it doesn't have types built in...
 * https://github.com/netlify/micro-api-client#class-httperror-extends-error
 */
export interface ErrorResponseModel extends Error {
  stack: any;
  status: string;
  data?: any;
  json?: {
    error_description?: string;
    msg?: string;
  };
}
