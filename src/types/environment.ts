declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FAUNADB_SECRET_KEY: string;
    }
  }
}

export {};
