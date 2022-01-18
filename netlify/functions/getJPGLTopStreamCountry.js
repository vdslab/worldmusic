const { selectRows } = require("./db");

exports.handler = async function (event) {
  const musicid = event.queryStringParameters.musicId || null;
  try {
    console.log(1);
    const result = await selectRows(
      `SELECT countryid, stream FROM Ranking WHERE Ranking.musicid = $1::text AND NOT Ranking.countryid = 'GL'`,
      [musicid]
    );
    const countrys = {};
    result.map((r) => {
      if (!countrys[r.countryid]) {
        countrys[r.countryid] = {
          countryid: r.countryid,
          count: 1,
        };
      } else if (countrys[r.countryid]) {
        countrys[r.countryid].count += 1;
      }
    });

    return { statusCode: 200, body: JSON.stringify(countrys) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
