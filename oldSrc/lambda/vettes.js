import faunadb from "faunadb";
import { format } from "date-fns";

exports.handler = async function (event, context) {
  const id = getIDFromPathname(event.path);
  const { identity, user } = context.clientContext;
  console.log({ identity, user });

  if (!userIsValid(user)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Please authenticate and try again" }),
    };
  }

  switch (event.httpMethod) {
    case "GET":
      return id ? getVetteByID(id, user) : getAllVettes(user);

    case "POST":
      return createNewVette(JSON.parse(event.body), user);

    case "PUT":
      return updateVette(id, JSON.parse(event.body), user);

    case "DELETE":
      const body = JSON.parse(event.body);
      return deleteVette(body.id, user);

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
  }
};

const userIsValid = (user) => {
  return typeof user !== "undefined";
};

const getIDFromPathname = (path) => {
  const pathArray = path.split("/");

  return pathArray.indexOf("vettes") === pathArray.length - 2
    ? pathArray[pathArray.length - 1]
    : null;
};

const getAllVettes = (userInfo) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("vettes_by_user"), userInfo.sub)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      const vettes = response.data.map((value) => value.data);

      // Return newest vettes first
      const sortedVettes = vettes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          vettes: sortedVettes,
        }),
      };
    });
};

const getVetteByID = (id, userInfo) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

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

const createNewVette = async (vetteData, userInfo) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  try {
    // Generate ID
    await client.query(q.NewId()).then((id) => (vetteData.id = id));

    // Add Date
    vetteData.date = format(new Date(), "MM-dd-yyyy");

    // Add user ID
    vetteData.userId = userInfo.sub;

    // Add record
    const response = await client.query(
      q.Create(q.Collection("Vettes"), { data: vetteData })
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

const updateVette = async (id, vetteData, userInfo) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });
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

const deleteVette = async (id, userInfo) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });
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