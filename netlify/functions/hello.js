const { hello } = require("./api");

exports.handler = async function (event) {
  return {
    statusCode: 200,
    body: event.body,
  };
};
