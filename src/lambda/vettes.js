import faunadb from "faunadb";

exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    return getAllVettes();
  } else if (event.httpMethod === "POST") {
    return createNewVette(JSON.parse(event.body));
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
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

const createNewVette = async (vetteData) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  try {
    // Generate ID
    await client.query(q.NewId()).then((id) => (vetteData.id = id));
    // Add record
    const response = await client.query(
      q.Create(q.Collection("Vettes"), { data: vetteData })
    );

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(vetteData),
    };
  } catch (error) {
    console.error("In error:", error);

    return {
      statusCode: error.requestResult.statusCode,
      body: error.message,
    };
  }
};
