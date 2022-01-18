const { selectRows } = require("./db");

exports.handler = async function (event) {
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const region = event.queryStringParameters.region || null;
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
  try {
    if (
      features.includes(feature) &&
      !isNaN(Number(startmonth.slice(0, 4))) &&
      startmonth[4] === "-" &&
      !isNaN(Number(startmonth.slice(5)))
    ) {
      const result = await selectRows(
        `SELECT 
      SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Country.countryid , ${startmonth} , Country.country
      FROM Ranking
      INNER JOIN Music ON Ranking.musicid = Music.musicid
      INNER JOIN Country ON Ranking.countryid = Country.countryid
      WHERE Ranking.startday BETWEEN $1::text AND $2::text
      AND Country.region = $3::text GROUP BY Country.countryid`,
        [s, e, region]
      );
      return { statusCode: 200, body: JSON.stringify(result) };
    } else {
      return { statusCode: 500, body: "data is not available" };
    }
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
