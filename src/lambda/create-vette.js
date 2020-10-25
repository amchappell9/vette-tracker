import faunadb from "faunadb";

exports.handler = (event, context, callback) => {
  // const data = JSON.parse(event.body);

  // const todoItem = {
  //   data: data,
  // };

  // return client
  //   .query(q.Create(q.Collection("Vettes"), todoItem))
  //   .then((response) => {
  //     console.log("success", response);

  //     return callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(response),
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("error", error);

  //     return callback(null, {
  //       statusCode: 400,
  //       body: JSON.stringify(error),
  //     });
  //   });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Hello!" }),
  });
};
