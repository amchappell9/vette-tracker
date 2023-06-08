import faunadb from "faunadb";
import { QueryResponse } from "../types/faunadb";
import { VetteObject } from "../types";

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

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

export { client, getAllVettesById };
