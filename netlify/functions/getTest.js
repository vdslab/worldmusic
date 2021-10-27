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
  const musicid = event.queryStringParameters.musicId || null;
  try {
    const dbpath = "./netlify/functions/database2.db";
    const db = new sqlite3.Database(dbpath);
    console.log(1);
    const result = await selectRows(
      db,
      `SELECT * FROM Ranking WHERE Ranking.musicid = '${musicid}' AND Ranking.startday = '2020-12-25'`
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};

// データが作れたら、日にちをRanking.startday = (SELECT MAX(startday) FROM Ranking)に変更すること。
