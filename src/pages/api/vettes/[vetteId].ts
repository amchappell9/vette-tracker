import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { QueryResponse } from "@/src/types/faunadb";
import { VetteObject } from "@/src/types";
import { handleError } from "@/src/utils/apiUtils";
import { getAuth } from "@clerk/nextjs/server";
import {
  client,
  deleteVetteRecord,
  getVetteById,
  isDBError,
  updateVetteRecord,
} from "@/src/utils/dbHelpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  // Ensure user is authenticated
  if (userId === null) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Ensure vette id is valid
  if (!req.query.vetteId || Array.isArray(req.query.vetteId)) {
    return res.status(400).json({ message: "Invalid vette id" });
  }

  const vetteID = req.query.vetteId;

  if (req.method === "GET") {
    return fetchVetteById(req, res, userId, vetteID);
  } else if (req.method === "PUT") {
    return updateVette(req, res, userId, vetteID);
  } else if (req.method === "DELETE") {
    return deleteVette(req, res, userId, vetteID);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function fetchVetteById(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteId: string
) {
  const vetteObj = await getVetteById(userId, vetteId);

  if (!vetteObj) {
    return res.status(404).json({ message: "Vette not found" });
  }

  return res.status(200).json(vetteObj);
}

async function updateVette(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteID: string
) {
  // TODO validate vette values with zod
  const response = await updateVetteRecord(userId, vetteID, req.body);

  if (isDBError(response)) {
    return handleError(response, res);
  }

  if (response === null) {
    return res.status(404).json({ message: "Vette not found" });
  }

  return res.status(200).json(response);
}

async function deleteVette(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteId: string
) {
  const response = await deleteVetteRecord(userId, vetteId);

  if (isDBError(response)) {
    return handleError(response, res);
  }

  if (!response.successful) {
    return res.status(500).json({ message: "Error deleting vette" });
  }

  return res.status(200).json({ message: `Vette ${vetteId} deleted` });
}

export default handler;
