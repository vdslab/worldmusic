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
    const dbpath = "./netlify/functions/database70.db"; //ここのファイル名変更忘れるの注意
    const db = new sqlite3.Database(dbpath);
    const Dectop = await selectRows(
      db,
      `SELECT Ranking.musicid FROM Ranking WHERE startday like '%-12-%' GROUP BY Ranking.musicid ORDER BY COUNT(Ranking.musicid) DESC LIMIT 1`
    );

    return { statusCode: 200, body: JSON.stringify(Dectop) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
