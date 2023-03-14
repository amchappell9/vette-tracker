import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { QueryResponse } from "@/types/faunadb";
import { VetteObject } from "@/types";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  // Ensure user is authenticated
  if (!session || !session.user || !session.user.sub) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Ensure vette id is valid
  if (!req.query.vetteId || Array.isArray(req.query.vetteId)) {
    return res.status(400).json({ message: "Invalid vette id" });
  }

  const userID = session.user.sub as string;
  const vetteID = req.query.vetteId;

  if (req.method === "GET") {
    return getVetteById(req, res, userID, vetteID);
  } else if (req.method === "DELETE") {
    res.status(200).json({ message: "Deleted" });
  }
}

function getVetteById(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteId: string
) {
  const q = faunadb.query;

  return client
    .query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vette_by_id"), vetteId)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      if (response.data.length > 0 && response.data[0].data.userId === userId) {
        res.status(200).json(response.data[0].data);
      }

      // No vette found (or no access)
      res.status(404).json({ msg: "Vette not found" });
    });
}

export default withApiAuthRequired(handler);
