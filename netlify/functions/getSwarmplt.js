const { selectRows } = require("./db");

exports.handler = async function (event) {
  const startMonth = event.queryStringParameters.startMonth || null;
  const feature = event.queryStringParameters.feature || null;
  const country = event.queryStringParameters.country || null;
  const year = String(Number(startMonth.split("-")[0]));
  let endmonth = String(Number(startMonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }
  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const result = await selectRows(
      `SELECT Music.Musicid , Music.name , Music.${feature} , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid='${country}' AND Ranking.startday BETWEEN '${startMonth}-01' AND '${year}-${endmonth}-31'`,
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
