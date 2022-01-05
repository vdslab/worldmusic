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
      GROUP BY Ranking.countryid`
    );

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};

// const { selectRows } = require("./db");

// exports.handler = async function (event) {
//   const feature = event.queryStringParameters.feature || null;
//   // const startmonth = event.queryStringParameters.startmonth || null;
//   const startdays = [
//     "2017-01",
//     "2017-04",
//     "2017-07",
//     "2017-10",
//     "2018-01",
//     "2018-04",
//     "2018-07",
//     "2018-10",
//     "2019-01",
//     "2019-04",
//     "2019-07",
//     "2019-10",
//     "2020-01",
//     "2020-04",
//     "2020-07",
//     "2020-10",
//     "2021-01",
//     "2021-04",
//     "2021-07",
//   ];

//   let min = Infinity;
//   let max = -Infinity;

//   try {
//     const countriesAveWeight = {};

//     for (const s of startdays) {
//       const year = String(Number(s.split("-")[0]));
//       let endmonth = String(Number(s.split("-")[1]) + 2);
//       if (endmonth.length === 1) {
//         endmonth = "0" + endmonth;
//       }
//       const result = await selectRows(
//         `SELECT
//         SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Ranking.countryid
//         FROM Ranking
//         INNER JOIN Music ON Ranking.musicid = Music.musicid
//         INNER JOIN Country ON Ranking.countryid = Country.countryid
//         WHERE Ranking.startday BETWEEN '${s}-01' AND '${year}-${endmonth}-31'
//         AND NOT Ranking.countryid = 'Nothing'
//         GROUP BY Ranking.countryid`
//       );
//       result.map((d) => {
//         // if (!countriesAveWeight[d.countryid]) {
//         //   countriesAveWeight[d.countryid] = {};
//         // }
//         // countriesAveWeight[d.countryid][startdays[i]] = d.value;
//         if (d.value < min) {
//           min = d.value;
//         }
//         if (d.value > max) {
//           max = d.value;
//         }
//       });
//     }

//     return { statusCode: 200, body: JSON.stringify({ min: min, max: max }) };
//   } catch (e) {
//     return { statusCode: 500, body: e.message };
//   }
// };
