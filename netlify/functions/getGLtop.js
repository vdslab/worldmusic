const { selectRows } = require("./db");

exports.handler = async function () {
  try {
    const GLtop1 = await selectRows(
      `SELECT Ranking.musicid FROM Ranking GROUP BY Ranking.musicid ORDER BY COUNT(Ranking.musicid) DESC LIMIT 1`,
    );

    return { statusCode: 200, body: JSON.stringify(GLtop1) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
