import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import faunadb from "faunadb";
import { format } from "date-fns";
import { User } from "gotrue-js";
import { VetteObject, VetteValues } from "../types/types";

/**
 * The GoTrue User type doesn't have the sub property,
 * but it does exist on the property and the documentation references it.
 * This type extends that user object to include the sub property.
 */
type UserWithSub = User & { sub: string };

/**
 * The response wrapper that comes back from FaunaDB
 */
type QueryResponse<T> = {
  data: DBObject<T>[];
};

/**
 * An object that gets returned from FaunaDB
 */
type DBObject<T> = {
  ref: Object;
  ts: number;
  data: T;
};

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY as string,
});

const handler: Handler = async function (
  event: HandlerEvent,
  context: HandlerContext
) {
  const id = getIDFromPathname(event.path);
  // const { identity, user } = context.clientContext;
  // const identity = context.clientContext?.identity;
  const user = context.clientContext?.user as UserWithSub;

  console.log(user);

  if (!userIsValid(user)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Please authenticate and try again" }),
    };
  }

  if (event.httpMethod === "GET") {
    return id ? getVetteByID(id, user) : getAllVettes(user);
  }

  if (event.httpMethod === "POST" && event.body) {
    return createNewVette(JSON.parse(event.body), user);
  } else if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide a body" }),
    };
  }

  if (event.httpMethod === "PUT" && event.body && id) {
    return updateVette(id, JSON.parse(event.body), user);
  } else if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide a body" }),
    };
  } else if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide an ID" }),
    };
  }

  if (event.httpMethod === "DELETE" && event.body) {
    const body = JSON.parse(event.body);
    return deleteVette(body.id, user);
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed" }),
  };
};

export { handler };

const userIsValid = (user: User) => {
  return typeof user !== "undefined";
};

const getIDFromPathname = (path: string) => {
  const pathArray = path.split("/");

  return pathArray.indexOf("vettes") === pathArray.length - 2
    ? pathArray[pathArray.length - 1]
    : null;
};

const getAllVettes = (userInfo: UserWithSub) => {
  const q = faunadb.query;

  return client
    .query<QueryResponse<VetteObject>>(
      q.Map(
        q.Paginate(q.Match(q.Index("vettes_by_user"), userInfo.sub)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      const vettes = response.data.map((value) => value.data);

      // Return newest vettes first
      const sortedVettes = vettes.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          vettes: sortedVettes,
        }),
      };
    });
};

const getVetteByID = (id: string, userInfo: UserWithSub) => {
  const q = faunadb.query;

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("vette_by_id"), id)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      if (
        response.data.length > 0 &&
        response.data[0].data.userId === userInfo.sub
      ) {
        return {
          statusCode: 200,
          body: JSON.stringify(response.data[0].data),
        };
      }

      // No vette found (or no access)
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: "Vette not found" }),
      };
    })
    .catch((error) => {
      console.error(error);

      return {
        statusCode: error.requestResult.statusCode,
        body: error.description,
      };
    });
};

type PreSubmitVetteObject = Omit<VetteObject, "id">;

const createNewVette = async (
  vetteData: VetteValues,
  userInfo: UserWithSub
) => {
  const q = faunadb.query;

  try {
    // Generate ID
    await client.query(q.NewId()).then((id) => (vetteData.id = id));

    const vetteObj: PreSubmitVetteObject = {
      // Add Date
      date: format(new Date(), "MM-dd-yyyy"),

      // Add user ID
      userId: userInfo.id,

      ...vetteData,
    };

    // Add Date
    // vetteData.date = format(new Date(), "MM-dd-yyyy");

    // Add user ID
    // vetteData.userId = userInfo.sub;

    // Add record
    const response = await client.query(
      q.Create(q.Collection("Vettes"), { data: vetteObj })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("In error:", error);

    return {
      statusCode: error.requestResult.statusCode,
      body: error.message,
    };
  }
};

const updateVette = async (
  id: string,
  vetteData: VetteValues,
  userInfo: UserWithSub
) => {
  const q = faunadb.query;
  let userIDMatches = false;

  // Add id and update date
  vetteData.id = id;
  vetteData.date = format(new Date(), "MM-dd-yyyy");

  try {
    await client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("vette_by_id"), id)),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(
        (response) =>
          (userIDMatches = response.data[0].data.userId === userInfo.sub)
      );

    if (userIDMatches) {
      await client.query(
        q.Update(q.Select("ref", q.Get(q.Match(q.Index("vette_by_id"), id))), {
          data: vetteData,
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify(vetteData),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "User not authorized" }),
      };
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: error.requestResult.statusCode,
      body: error.message,
    };
  }
};

const deleteVette = async (id: string, userInfo: UserWithSub) => {
  const q = faunadb.query;
  let userIDMatches = false;

  // Validate user has access to vette
  try {
    await client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("vette_by_id"), id)),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then(
        (response) =>
          (userIDMatches = response.data[0].data.userId === userInfo.sub)
      );

    if (userIDMatches) {
      client.query(
        q.Delete(q.Select("ref", q.Get(q.Match(q.Index("vette_by_id"), id))))
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ msg: `Vette ${id} deleted` }),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "User not authorized" }),
      };
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: error.requestResult.statusCode,
      body: error.description,
    };
  }
};
