const { selectRows } = require("./db");

exports.handler = async function (event) {
  const musicid = event.queryStringParameters.musicid || null;

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const result = await selectRows(
      `SELECT * FROM Ranking WHERE Ranking.startday = '2020-12-25' Ranking.musicid =$1::text`,
      [musicid]
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
