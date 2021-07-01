const { hello } = require("./api");

exports.handler = async function () {
  //   console.log("hello");
  //   console.log(JSON.stringify(hello));
  return {
    statusCode: 200,
<<<<<<< HEAD
    body: "hello",
=======
    body: JSON.stringify(hello),
>>>>>>> f4a210d0b0b73b2cf34895cbc5b5a3173f57ce09
  };
};
