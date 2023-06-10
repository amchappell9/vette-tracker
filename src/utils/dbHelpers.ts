import faunadb from "faunadb";
import { QueryResponse } from "../types/faunadb";
import { VetteObject } from "../types";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

/**
 * Queries the database for all vettes belonging to a user.
 */
const getAllVettesById = async (userId: string) => {
  const q = faunadb.query;

  const queryResults = await client.query<QueryResponse<VetteObject>>(
    q.Map(
      q.Paginate(q.Match(q.Index("vettes_by_user"), userId)),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  const vettes = queryResults.data.map((value) => value.data);

  // Return newest vettes first
  const sortedVettes = vettes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sortedVettes;
};

/**
 * Queries for a single vette that matches the passed vette ID.
 */
const getVetteById = async (userId: string, vetteId: string) => {
  const q = faunadb.query;

  const { data } = await client.query<QueryResponse<VetteObject>>(
    q.Map(
      q.Paginate(q.Match(q.Index("vette_by_id"), vetteId)),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  if (data.length > 0 && data[0].data.userId === userId) {
    return data[0].data;
  }

  // No vette found (or no access)
  return null;
};

export { client, getAllVettesById, getVetteById };
