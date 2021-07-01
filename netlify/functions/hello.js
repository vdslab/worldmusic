const { hello } = require("./api");

exports.handler = async function () {
  //   console.log("hello");
  //   console.log(JSON.stringify(hello));
  return {
    statusCode: 200,
    body: "hello",
  };
};
