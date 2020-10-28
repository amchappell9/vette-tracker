import faunadb from "faunadb";

exports.handler = async function (event, context) {
  const id = getIDFromPathname(event.path);

  switch (event.httpMethod) {
    case "GET":
      return id ? getVetteByID(id) : getAllVettes();

    case "POST":
      return createNewVette(JSON.parse(event.body));

    case "PUT":
      return updateVette(id, JSON.parse(event.body));

    case "DELETE":
      const body = JSON.parse(event.body);
      return deleteVette(body.id);

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
  }
};

const getIDFromPathname = (path) => {
  const pathArray = path.split("/");

  return pathArray.indexOf("vettes") === pathArray.length - 2
    ? pathArray[pathArray.length - 1]
    : null;
};

const getAllVettes = () => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_vettes"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      const vettes = [];

      response.data.map((value) => {
        return vettes.push(value.data);
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ vettes: vettes }),
      };
    });
};

const getVetteByID = (id) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("vettes_by_id"), id)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((response) => {
      if (response.data.length > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify(response.data[0].data),
        };
      } else {
        // Should be a 404 but there's an issue causing netlify functions not to work
        return {
          statusCode: 200,
          body: JSON.stringify({ msg: "Vette not found" }),
        };
      }
    })
    .catch((error) => {
      console.error(error);

      return {
        statusCode: error.requestResult.statusCode,
        body: error.description,
      };
    });
};

const createNewVette = async (vetteData) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  try {
    // Generate ID
    await client.query(q.NewId()).then((id) => (vetteData.id = id));

    // Add Date
    vetteData.date = getFormattedDate(new Date());

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

const updateVette = (id, vetteData) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  // Add id and update date
  vetteData.id = id;
  vetteData.date = getFormattedDate(new Date());

  return client
    .query(
      q.Update(q.Select("ref", q.Get(q.Match(q.Index("vettes_by_id"), id))), {
        data: vetteData,
      })
    )
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(vetteData),
      };
    })
    .catch((error) => {
      console.error(error);

      return {
        statusCode: error.requestResult.statusCode,
        body: error.message,
      };
    });
};

const deleteVette = (id) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  return client
    .query(
      q.Delete(q.Select("ref", q.Get(q.Match(q.Index("vettes_by_id"), id))))
    )
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: `Vette ${id} deleted` }),
      };
    })
    .catch((error) => {
      console.log(error);

      return {
        statusCode: error.requestResult.statusCode,
        body: error.description,
      };
    });
};

const getFormattedDate = (date) => {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0 " + day;
  }

  return `${month}-${day}-${year}`;
};
