import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { VetteObject } from "@/types";
import { format } from "date-fns";
import { DBError, DBObject, QueryResponse } from "@/types/faunadb";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  // Ensure user is authenticated
  if (!session || !session.user || !session.user.sub) {
    return res.status(401).json({ message: "Not authorized" });
  }

  console.log("User: ", session.user.sub);

  const userID = session.user.sub as string;

  if (req.method === "GET") {
    return getAllVettes(req, res, userID);
  } else if (req.method === "POST") {
    return addVette(req, res, userID);
  }
}

function getAllVettes(
  req: NextApiRequest,
  res: NextApiResponse,
  userID: string
) {
  const q = faunadb.query;

  return client
    .query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vettes_by_user"), userID)),
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
  userID: string
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
      userId: userID,
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

function updateVette() {}

const isDBError = (error: any): error is DBError => {
  const statusCodeExists =
    typeof error.requestResult.statusCode !== "undefined";
  const descriptionOrMessageExists =
    typeof error.description !== "undefined" ||
    typeof error.message !== "undefined";

  return statusCodeExists && descriptionOrMessageExists;
};

const handleError = (error: unknown, res: NextApiResponse) => {
  if (isDBError(error)) {
    return res.status(Number(error.requestResult.statusCode)).json({
      message: error.message ? error.message : error.description,
    });
  }

  return res.status(500).json({ message: "Error adding vette" });
};

export default withApiAuthRequired(handler);