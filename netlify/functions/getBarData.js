const { selectRows } = require("./db");

exports.handler = async function (event) {
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const regionId = event.queryStringParameters.regionId || null;
  const year = String(Number(startmonth.split("-")[0]));
  let endmonth = String(Number(startmonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }

  console.log(regionId);
  try {
    const result = await selectRows(
      //   `SELECT * FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid JOIN Country ON Ranking.countryid = Country.countryid WHERE Ranking.startday BETWEEN '${startmonth}-01' AND '${year}-${endmonth}-31' GROUP BY Ranking.countryid`
      `SELECT SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream) AS value , Ranking.countryid  FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid JOIN Country ON Ranking.countryid = Country.countryid WHERE Ranking.startday BETWEEN '${startmonth}-01' AND '${year}-${endmonth}-31' AND Country.region = '${regionId}' GROUP BY Ranking.countryid`,
    );

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
