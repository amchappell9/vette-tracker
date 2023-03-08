export interface VetteValues {
  year: string;
  miles: string;
  cost: string;
  transmissionType: string;
  exteriorColor: string;
  interiorColor: string;
  submodel: string;
  trim: string;
  packages: string[];
  link: string;
}

export interface VetteObject extends VetteValues {
  id: string;
  date: string;
  userId: string;
}

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
