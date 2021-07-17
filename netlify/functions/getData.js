const sqlite3 = require("sqlite3");

function selectRows(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
}

exports.handler = async function (event) {
  const startMonth = event.queryStringParameters.startMonth || null;
  const endMonth = event.queryStringParameters.endMonth || null;
  // const feature = event.queryStringParameters.feature || null;
  const country = event.queryStringParameters.country || null;
  // console.log(startMonth, endMonth, feature, country);

  // const startMonth = event.queryStringParameters.startMonth;
  // const endMonth = event.queryStringParameters.endMonth;
  const feature = "acousticness";
  // const country = "AU";
  // console.log(startMonth, endMonth, feature, country);

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const dbpath = "./netlify/functions/database.db";
    const db = new sqlite3.Database(dbpath);
    // const path =
    //   "SELECT Music.Musicid' , 'Music." +
    //   feature +
    //   "' , 'Ranking.startday' , 'Ranking.countryid' , 'Ranking.stream' FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid=" +
    //   country +
    //   " AND Ranking.startday BETWEEN " +
    //   startMonth +
    //   "-01' AND '" +
    //   endMonth +
    //   "-31'";
    const path = "SELECT " + feature + ",name FROM Music";
    const params = new URLSearchParams(event.queryStringParameters);

    const result = await selectRows(
      db,
      path
      // `SELECT 'Music.Musicid' , 'Music.${feature}' , 'Ranking.startday' , 'Ranking.countryid' , 'Ranking.stream' FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid='${country}' AND Ranking.startday BETWEEN '${startMonth}-01' AND '${endMonth}-31'`
      // `SELECT Music.Musicid , Music.acousticness , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid='AU' AND Ranking.startday BETWEEN '2017-01-01' AND '2017-03-31'`
      // `SELECT "${feature}" ,name FROM Music`
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: URLSearchParams(event) };
  }
};

// const sqlite3 = require("sqlite3");

// function selectRows(db, sql) {
//   return new Promise((resolve, reject) => {
//     db.all(sql, (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//       db.close();
//     });
//   });
// }

// exports.handler = async function () {
//   try {
//     const dbpath = "./netlify/functions/example.db";
//     const db = new sqlite3.Database(dbpath);
//     const result = await selectRows(db, "SELECT id, name FROM staffs");
//     return { statusCode: 200, body: JSON.stringify(result) };
//   } catch (e) {
//     return { statusCode: 500, body: "error" };
//   }
// };
