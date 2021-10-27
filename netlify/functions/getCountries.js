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
  const musicid = event.queryStringParameters.musicid || null;

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const dbpath = "./netlify/functions/database2.db";
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(
      db,
      `SELECT * FROM Ranking WHERE Ranking.startday = '2020-12-25' Ranking.musicid ='${musicid}'`
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
