import faunadb from "faunadb";
import { DBError, DBObject, QueryResponse } from "../types/faunadb";
import { VetteObject, VetteValues } from "../types";
import { format } from "date-fns";

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

const insertVetteRecord = async (userId: string, vette: VetteValues) => {
  const q = faunadb.query;

  try {
    // Generate ID
    const id = await client.query(q.NewId());

    // Add ID, created date, and user id to complete the VetteObject
    const vetteObj: VetteObject = {
      id: id.toString(),
      date: format(new Date(), "MM-dd-yyyy"),
      userId: userId,
      ...vette,
    };

    // Add record
    const response = await client.query<DBObject<VetteObject>>(
      q.Create(q.Collection("Vettes"), { data: vetteObj })
    );

    return response.data;
  } catch (error) {
    if (isDBError(error)) {
      return error;
    }

    throw new Error("Invalid db response");
  }
};

const updateVetteRecord = async (
  userId: string,
  vetteId: string,
  vetteValues: VetteValues
) => {
  const q = faunadb.query;

  const vetteObj: VetteObject = {
    id: vetteId,
    date: format(new Date(), "MM-dd-yyyy"),
    userId: userId,
    ...vetteValues,
  };

  try {
    // Get the vette
    const response = await client.query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vette_by_id"), vetteId)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    // Ensure vette exists and belongs to user
    if (response.data.length > 0 && response.data[0].data.userId === userId) {
      // Update the vette
      const updatedVette = await client.query<DBObject<VetteObject>>(
        q.Update(
          q.Select("ref", q.Get(q.Match(q.Index("vette_by_id"), vetteId))),
          {
            data: vetteObj,
          }
        )
      );

      return updatedVette.data;
    } else {
      return null;
    }
  } catch (error) {
    if (isDBError(error)) {
      return error;
    }

    throw new Error("Invalid db response");
  }
};

// Function that typechecks an error object to see if it is of type DBError
const isDBError = (error: any): error is DBError => {
  return error?.requestResult?.statusCode !== undefined;
};

export {
  client,
  getAllVettesById,
  getVetteById,
  insertVetteRecord,
  updateVetteRecord,
  isDBError,
};
