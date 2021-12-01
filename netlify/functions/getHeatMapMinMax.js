const { selectRows } = require("./db");

exports.handler = async function (event) {
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const year = String(Number(startmonth.split("-")[0]));
  let endmonth = String(Number(startmonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }
  try {
    const result = await selectRows(
      `SELECT 
      SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Ranking.countryid
      FROM Ranking
      INNER JOIN Music ON Ranking.musicid = Music.musicid
      INNER JOIN Country ON Ranking.countryid = Country.countryid
      WHERE Ranking.startday BETWEEN '${startmonth}-01' AND '${year}-${endmonth}-31'
      AND NOT Ranking.countryid = 'Nothing'
      GROUP BY Ranking.countryid`,
    );

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
