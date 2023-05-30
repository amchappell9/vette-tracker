import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { VetteObject } from "@/types";
import { format } from "date-fns";
import { DBObject, QueryResponse } from "@/types/faunadb";
import { handleError } from "@/utils/apiUtils";
import { getAuth } from "@clerk/nextjs/server";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

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

function getAllVettes(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const q = faunadb.query;

  return client
    .query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vettes_by_user"), userId)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      const vettes = response.data.map((value) => value.data);

      // Return newest vettes first
      const sortedVettes = vettes.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      return res.status(200).json({
        vettes: sortedVettes,
      });
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
