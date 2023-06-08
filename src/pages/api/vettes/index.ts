import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { VetteObject } from "@/src/types";
import { format } from "date-fns";
import { DBObject, QueryResponse } from "@/src/types/faunadb";
import { handleError } from "@/src/utils/apiUtils";
import { getAuth } from "@clerk/nextjs/server";
import { client, getAllVettesById } from "@/src/utils/dbHelpers";

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
  // TODO: Use Zod to validate values

  // Add to database
  const q = faunadb.query;

  try {
    // Generate ID
    const id = await client.query(q.NewId());

    // Add ID, created date, and user id to complete the VetteObject
    const vetteObj: VetteObject = {
      id: id.toString(),
      date: format(new Date(), "MM-dd-yyyy"),
      userId: userId,
      ...req.body,
    };

    // Add record
    const response = await client.query<DBObject<VetteObject>>(
      q.Create(q.Collection("Vettes"), { data: vetteObj })
    );

    // Return new vette
    return res.status(201).json(response.data);
  } catch (error) {
    console.log(error);

    return handleError(error, res);
  }
}

export default handler;
