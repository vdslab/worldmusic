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

exports.handler = async function () {
  try {
    const dbpath = "./netlify/functions/database.db";
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(db, "SELECT * FROM Country");
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
  // const result = {
  //   id: 0,
  //   name: "hatasa",
  // };

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(result),
  // };
};
