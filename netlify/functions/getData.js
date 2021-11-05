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
  const feature = event.queryStringParameters.feature || null;
  const startmonth = event.queryStringParameters.startmonth || null;
  const region = event.queryStringParameters.region || null;
  const year = String(Number(startmonth.split("-")[0]));
  let endmonth = String(Number(startmonth.split("-")[1]) + 2);
  if (endmonth.length === 1) {
    endmonth = "0" + endmonth;
  }

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const dbpath = "./netlify/functions/musicvisdatabase.db";
    const db = new sqlite3.Database(dbpath);
    // let max
    // let min
    // const [Max, setMax] = useState(-Infinity);
    // const [Min, setMin] = useState(Infinity);
    let max = -Infinity;
    let min = Infinity;

    // const result = await selectRows(
    //   db,
    //   `SELECT Music.Musicid , Music.name , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid
    //   WHERE Ranking.countryid = "AU"
    //   OR Ranking.countryid = "CA"
    //   OR Ranking.countryid = "DE"
    //   OR Ranking.countryid = "FR"
    //   OR Ranking.countryid = "JP"
    //   OR Ranking.countryid = "NL"
    //   OR Ranking.countryid = "GB"
    //   OR Ranking.countryid = "US"
    //   AND Ranking.startday BETWEEN '2017-01-01' AND '2020-12-31'`
    // );
    const result = await selectRows(
      db,
      // `SELECT
      // SUM(Music.${feature} * Ranking.stream) / SUM(Ranking.stream) AS value , Country.countryid
      // FROM Ranking
      // INNER JOIN Music ON Ranking.musicid = Music.musicid
      // INNER JOIN Country ON Ranking.countryid = Country.countryid
      // WHERE Ranking.startday BETWEEN "${startmonth}" AND "${year}-${endmonth}-31"
      // AND Country.region = "${region}" GROUP BY`
      `SELECT 
      Ranking.stream,Ranking.countryid
      FROM Ranking
      INNER JOIN Music ON Ranking.musicid = Music.musicid
      INNER JOIN Country ON Ranking.countryid = Country.countryid
      WHERE Ranking.startday BETWEEN "${startmonth}" AND "${year}-${endmonth}-31"
      AND NOT Country.region = "Nothing" GROUP BY (SELECT Country.countryid FROM Country WHERE Country.region = "${region}")`
    );

    // function makeData(data) {
    //   let weightFeatureTotal = 0;
    //   let streamTotal = 0;
    //   let weightAve = null;
    //   if (data.length) {
    //     data.map((d) => {
    //       streamTotal += d.stream;
    //       weightFeatureTotal += d.stream * d[feature];
    //     });
    //     weightAve = weightFeatureTotal / streamTotal;
    //   }
    //   return weightAve;
    // }

    // const fillZero = (value) => {
    //   if (value.length == 1) {
    //     value = "0" + value;
    //   }
    //   return value;
    // };

    // const dbData = result.map((d) => {
    //   const year = d.startday.slice(0, 4);
    //   let month = Number(d.startday.slice(5, 7));
    //   if (month >= 1 && month <= 3) {
    //     month = "01";
    //   } else if (month >= 4 && month <= 6) {
    //     month = "04";
    //   } else if (month >= 7 && month <= 9) {
    //     month = "07";
    //   } else {
    //     month = "10";
    //   }
    //   const term = year + "-" + month;
    //   if (year != "2016" && year != "2021" && d.countryid != "GL") {
    //     const array = c[d.countryid][term];
    //     array.push(d);
    //     c[d.countryid][term] = array;
    //   }
    // });
    // const data = Object.keys(c).map((countryid) => {
    //   return {
    //     countryName: countryid,
    //     timeData: Object.keys(c[countryid]).map((term) => {
    //       const year = term.slice(0, 4);
    //       const month = Number(term.slice(5, 7));
    //       const weightAve = makeData(c[countryid][term]);
    //       if (max < weightAve && weightAve != null) {
    //         max = weightAve;
    //       }
    //       if (min > weightAve && weightAve != null) {
    //         min = weightAve;
    //       }
    //       return {
    //         start: term,
    //         end: year + "-" + fillZero(String(month + 2)),
    //         value: weightAve,
    //       };
    //     }),
    //   };
    // });

    // const status = { dbData: data, min: min, max: max };

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
