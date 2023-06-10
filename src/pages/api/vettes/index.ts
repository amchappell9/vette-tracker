import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "@/src/utils/apiUtils";
import { getAuth } from "@clerk/nextjs/server";
import {
  getAllVettesById,
  insertVetteRecord,
  isDBError,
} from "@/src/utils/dbHelpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  // Ensure user is authenticated
  if (userId === null) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.method === "GET") {
    return getAllVettes(req, res, userId);
  } else if (req.method === "POST") {
    return addVette(req, res, userId);
  }
}

async function getAllVettes(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const vettes = await getAllVettesById(userId);

  return res.status(200).json({
    vettes: vettes,
  });
}

async function addVette(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  // TODO: Use Zod to validate req.body is of type VetteValues
  const response = await insertVetteRecord(userId, req.body);

  if (isDBError(response)) {
    return handleError(response, res);
  }

  return res.status(201).json(response);
}

export default handler;
