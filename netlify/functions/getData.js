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

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */

  try {
    const dbpath = "./netlify/functions/database2.db";
    const db = new sqlite3.Database(dbpath);
    // let max
    // let min
    // const [Max, setMax] = useState(-Infinity);
    // const [Min, setMin] = useState(Infinity);
    let max = -Infinity;
    let min = Infinity;
    const c = {
      AU: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      CA: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      DE: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      FR: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      JP: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      NL: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      GB: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
      US: {
        "2017-01": [],
        "2017-04": [],
        "2017-07": [],
        "2017-10": [],
        "2018-01": [],
        "2018-04": [],
        "2018-07": [],
        "2018-10": [],
        "2019-01": [],
        "2019-04": [],
        "2019-07": [],
        "2019-10": [],
        "2020-01": [],
        "2020-04": [],
        "2020-07": [],
        "2020-10": [],
      },
    };

    const result = await selectRows(
      db,
      `SELECT Music.Musicid , Music.name , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid 
      WHERE Ranking.countryid = "AU" 
      OR Ranking.countryid = "CA"
      OR Ranking.countryid = "DE"
      OR Ranking.countryid = "FR"
      OR Ranking.countryid = "JP"
      OR Ranking.countryid = "NL"
      OR Ranking.countryid = "GB"
      OR Ranking.countryid = "US"
      AND Ranking.startday BETWEEN '2017-01-01' AND '2020-12-31'`
    );

    function makeData(data) {
      let weightFeatureTotal = 0;
      let streamTotal = 0;
      let weightAve = null;
      if (data.length) {
        data.map((d) => {
          streamTotal += d.stream;
          weightFeatureTotal += d.stream * d[feature];
        });
        weightAve = weightFeatureTotal / streamTotal;
      }
      return weightAve;
    }

    const fillZero = (value) => {
      if (value.length == 1) {
        value = "0" + value;
      }
      return value;
    };

    const dbData = result.map((d) => {
      const year = d.startday.slice(0, 4);
      let month = Number(d.startday.slice(5, 7));
      if (month >= 1 && month <= 3) {
        month = "01";
      } else if (month >= 4 && month <= 6) {
        month = "04";
      } else if (month >= 7 && month <= 9) {
        month = "07";
      } else {
        month = "10";
      }
      const term = year + "-" + month;
      if (year != "2016" && year != "2021" && d.countryid != "GL") {
        const array = c[d.countryid][term];
        array.push(d);
        c[d.countryid][term] = array;
      }
    });
    const data = Object.keys(c).map((countryid) => {
      return {
        countryName: countryid,
        timeData: Object.keys(c[countryid]).map((term) => {
          const year = term.slice(0, 4);
          const month = Number(term.slice(5, 7));
          const weightAve = makeData(c[countryid][term]);
          if (max < weightAve && weightAve != null) {
            max = weightAve;
          }
          if (min > weightAve && weightAve != null) {
            min = weightAve;
          }
          return {
            start: term,
            end: year + "-" + fillZero(String(month + 2)),
            value: weightAve,
          };
        }),
      };
    });

    const status = { dbData: data, min: min, max: max };

    return { statusCode: 200, body: JSON.stringify(status) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
