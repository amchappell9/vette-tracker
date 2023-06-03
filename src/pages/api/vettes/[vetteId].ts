import { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";
import { DBObject, QueryResponse } from "@/src/types/faunadb";
import { VetteObject } from "@/src/types";
import { handleError } from "@/src/utils/apiUtils";
import { format } from "date-fns";
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

  // Ensure vette id is valid
  if (!req.query.vetteId || Array.isArray(req.query.vetteId)) {
    return res.status(400).json({ message: "Invalid vette id" });
  }

  const vetteID = req.query.vetteId;

  if (req.method === "GET") {
    return getVetteById(req, res, userId, vetteID);
  } else if (req.method === "PUT") {
    return updateVette(req, res, userId, vetteID);
  } else if (req.method === "DELETE") {
    return deleteVette(req, res, userId, vetteID);
  }

  return res.status(405).json({ message: "Method not allowed" });
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
        return res.status(200).json(response.data[0].data);
      }

      // No vette found (or no access)
      return res.status(404).json({ msg: "Vette not found" });
    });
}

async function updateVette(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteID: string
) {
  const q = faunadb.query;

  const vetteObj: VetteObject = {
    id: vetteID,
    date: format(new Date(), "MM-dd-yyyy"),
    userId: userId,
    ...req.body,
  };

  try {
    // Get the vette
    const response = await client.query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vette_by_id"), vetteID)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    // Ensure vette exists and belongs to user
    if (response.data.length > 0 && response.data[0].data.userId === userId) {
      // Update the vette
      const updatedVette = await client.query<DBObject<VetteObject>>(
        q.Update(
          q.Select("ref", q.Get(q.Match(q.Index("vette_by_id"), vetteID))),
          {
            data: vetteObj,
          }
        )
      );

      return res.status(200).json(updatedVette.data);
    }

    return res.status(404).json({ msg: "Vette not found" });
  } catch (error) {
    console.log(error);

    return handleError(error, res);
  }
}

async function deleteVette(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  vetteId: string
) {
  const q = faunadb.query;
  let userIdMatches = false;

  // Validate user has access to vette
  try {
    await client
      .query<QueryResponse<VetteObject>>(
        q.Map(
          q.Paginate(q.Match(q.Index("vette_by_id"), vetteId)),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(
        (response) => (userIdMatches = response.data[0].data.userId === userId)
      );

    if (userIdMatches) {
      client.query(
        q.Delete(
          q.Select("ref", q.Get(q.Match(q.Index("vette_by_id"), vetteId)))
        )
      );

      return res.status(200).json({ msg: `Vette ${vetteId} deleted` });
    } else {
      return res.status(403).json({ message: "User not authorized" });
    }
  } catch (error) {
    console.log(error);

    return handleError(error, res);
  }
}

export default handler;
