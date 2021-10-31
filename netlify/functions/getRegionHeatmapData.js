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
  try {
    const dbpath = "./netlify/functions/musicvisdatabase.db";
    const db = new sqlite3.Database(dbpath);
    const result = await selectRows(
      db,
      `SELECT 
      SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Country.region
      FROM Ranking
      INNER JOIN Music ON Ranking.musicid = Music.musicid
      INNER JOIN Country ON Ranking.countryid = Country.countryid
      WHERE Ranking.startday BETWEEN "${startmonth}" AND "${year}-${endmonth}-31"
      AND NOT Country.region = "Nothing"
      GROUP BY Country.region`
    );

    const start = String((startmonth.slice(0,7)));
    const end = String(year+"-"+endmonth);
    const status = { dbData: result, start: start, end: end}
    
    return { statusCode: 200, body: JSON.stringify(status) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};

// CASE
// WHEN Ranking.startday BETWEEN '2017-01-01' AND '2017-03-31' THEN '2017-01'
// WHEN Ranking.startday BETWEEN '2017-04-01' AND '2017-06-31' THEN '2017-04'
// WHEN Ranking.startday BETWEEN '2017-07-01' AND '2017-09-31' THEN '2017-07'
// WHEN Ranking.startday BETWEEN '2017-10-01' AND '2017-12-31' THEN '2017-10'
// WHEN Ranking.startday BETWEEN '2018-01-01' AND '2018-03-31' THEN '2018-01'
// WHEN Ranking.startday BETWEEN '2018-04-01' AND '2018-06-31' THEN '2018-04'
// WHEN Ranking.startday BETWEEN '2018-07-01' AND '2018-09-31' THEN '2018-07'
// WHEN Ranking.startday BETWEEN '2018-10-01' AND '2018-12-31' THEN '2018-10'
// WHEN Ranking.startday BETWEEN '2019-01-01' AND '2019-03-31' THEN '2019-01'
// WHEN Ranking.startday BETWEEN '2019-04-01' AND '2019-06-31' THEN '2019-04'
// WHEN Ranking.startday BETWEEN '2019-07-01' AND '2019-09-31' THEN '2019-07'
// WHEN Ranking.startday BETWEEN '2019-10-01' AND '2019-12-31' THEN '2019-10'
// WHEN Ranking.startday BETWEEN '2020-01-01' AND '2020-03-31' THEN '2020-01'
// WHEN Ranking.startday BETWEEN '2020-04-01' AND '2020-06-31' THEN '2020-04'
// WHEN Ranking.startday BETWEEN '2020-07-01' AND '2020-09-31' THEN '2020-07'
// WHEN Ranking.startday BETWEEN '2020-10-01' AND '2020-12-31' THEN '2020-10'
// END Period,

// `SELECT 
// SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Country.region
// FROM Ranking
// INNER JOIN Music ON Ranking.musicid = Music.musicid
// INNER JOIN Country ON Ranking.countryid = Country.countryid
// WHERE Ranking.startday BETWEEN "${starday}" AND "2017-03-31"
// GROUP BY Country.region`