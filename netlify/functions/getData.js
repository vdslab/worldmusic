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
    const dbpath = "./netlify/functions/example.db";
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(db, "SELECT id, name FROM staffs");
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
};
