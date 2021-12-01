const { selectRows } = require("./db");

exports.handler = async function () {
  try {
    const Dectop = await selectRows(
      `SELECT Ranking.musicid FROM Ranking WHERE startday like '%-12-%' GROUP BY Ranking.musicid ORDER BY COUNT(Ranking.musicid) DESC LIMIT 1`,
    );

    return { statusCode: 200, body: JSON.stringify(Dectop) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
