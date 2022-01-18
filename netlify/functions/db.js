const { Client } = require("pg");

exports.selectRows = async function (sql, values) {
  // console.log(sql, values);
  // const client = new Client();
  // await client.connect();
  // const result = await client.query("SELECT $1 FROM Music", ["acousticness"]);
  // await client.end();
  // return result.rows;
  const client = new Client();
  await client.connect();
  const res = await client.query(sql, values);
  // console.log(res.rows); // Hello world!
  await client.end();
  return res.rows;
};
