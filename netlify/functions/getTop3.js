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
    const dbpath = "./netlify/functions/testdatabase.db"; //ここのファイル名変更忘れるの注意
    const db = new sqlite3.Database(dbpath);
    console.log(1);

    const result = await selectRows(
      db,
      `SELECT * FROM Ranking WHERE Ranking.countryid = 'GL' AND Ranking.position <= 3 AND Ranking.startday = (SELECT MAX(startday) FROM Ranking)`
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
