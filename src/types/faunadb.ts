/**
 * The response wrapper that comes back from FaunaDB
 */
export type QueryResponse<T> = {
  data: DBObject<T>[];
};

/**
 * An object that gets returned from FaunaDB
 */
export type DBObject<T> = {
  ref: Object;
  ts: number;
  data: T;
};

/**
 * The error object that comes back from FaunaDB
 */
export type DBError = {
  requestResult: {
    statusCode: string;
  };
  description?: string;
  message?: string;
};
