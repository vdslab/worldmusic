const { selectRows } = require("./db");

exports.handler = async function (event) {
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const year = String(Number(startmonth.split("-")[0]));
  let endmonth = String(Number(startmonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }

  const s = String(startmonth + "-01");
  const e = String(year + "-" + endmonth + "-31");
  const features = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "valence",
    "tempo",
    "time_signature",
  ];

  console.log(startmonth, endmonth);
  try {
    if (features.includes(feature)) {
      const result = await selectRows(
        `SELECT SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream) , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.startday BETWEEN $1::text AND $2::text GROUP BY Ranking.countryid`,
        [s, e]
      );

      return { statusCode: 200, body: JSON.stringify(result) };
    }
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
