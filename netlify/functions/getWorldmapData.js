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
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const year = String(Number(startmonth.split("-")[0]));
  let endmonth = String(Number(startmonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }

  console.log(startmonth, endmonth);
  try {
    const dbpath = "./netlify/functions/musicvisdatabase.db"; //ここのファイル名変更忘れるの注意
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(
      db,
      `SELECT SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream) , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.startday BETWEEN '${startmonth}-01' AND '${year}-${endmonth}-31' GROUP BY Ranking.countryid`
    );

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
