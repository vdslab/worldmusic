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
  const startMonth = event.queryStringParameters.startMonth || null;
  const endMonth = event.queryStringParameters.endMonth || null;
  const feature = event.queryStringParameters.feature || null;
  const country = event.queryStringParameters.country || null;

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const dbpath = "./netlify/functions/database.db";
    const db = new sqlite3.Database(dbpath);

    const result = await selectRows(
      db,
      `SELECT Music.Musicid , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid='${country}' AND Ranking.startday BETWEEN '${startMonth}-01' AND '${endMonth}-31'`
    );
    return { statusCode: 200, body: JSON.stringify(dbpath) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
};
