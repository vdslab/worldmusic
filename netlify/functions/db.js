const { Client } = require("pg");

exports.selectRows = async function (sql) {
  const client = new Client();
  await client.connect();
  const result = await client.query(sql);
  await client.end();
  return result.rows;
};
