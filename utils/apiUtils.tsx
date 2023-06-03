import { NextApiResponse } from "next";
import { DBError } from "@/types/faunadb";

const isDBError = (error: any): error is DBError => {
  const statusCodeExists =
    typeof error.requestResult.statusCode !== "undefined";
  const descriptionOrMessageExists =
    typeof error.description !== "undefined" ||
    typeof error.message !== "undefined";

  return statusCodeExists && descriptionOrMessageExists;
};

export const handleError = (error: unknown, res: NextApiResponse) => {
  if (isDBError(error)) {
    return res.status(Number(error.requestResult.statusCode)).json({
      message: error.message ? error.message : error.description,
    });
  }

  return res.status(500).json({ message: "Error adding vette" });
};
