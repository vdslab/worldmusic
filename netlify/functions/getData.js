const sqlite3 = require("sqlite3");

function selectRows(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
}

exports.handler = async function (event) {
  const year = event.queryStringParameters.year || null;
  const period = event.queryStringParameters.period || null;
  const feature = event.queryStringParameters.feature || null;

  const data = { year: year, period: period, feature: feature };
  try {
    const dbpath = "./netlify/functions/database.db";
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(db, "SELECT * FROM Country");
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
};
