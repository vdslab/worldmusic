const { selectRows } = require("./db");

exports.handler = async function (event) {
  const musicid = event.queryStringParameters.musicId || null;
  try {
    console.log(1);
    const result = await selectRows(
      `SELECT countryid, stream FROM Ranking WHERE Ranking.musicid = '${musicid}' AND Ranking.startday = '2020-12-25' AND NOT Ranking.countryid = 'GL'`,
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};

// Ranking.startday = (SELECT MAX(startday) FROM Ranking)だと最新の日付
