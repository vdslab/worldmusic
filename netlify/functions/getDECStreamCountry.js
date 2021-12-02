const { selectRows } = require("./db");

exports.handler = async function (event) {
  const musicid = event.queryStringParameters.musicId || null;
  try {
    console.log(1);
    const result = await selectRows(
      `SELECT countryid FROM Ranking WHERE Ranking.musicid = '${musicid}' 
      AND ( 
        (Ranking.startday BETWEEN '2017-12-01' AND '2017-12-31') 
        OR (Ranking.startday BETWEEN '2018-12-01' AND '2018-12-31') 
        OR (Ranking.startday BETWEEN '2019-12-01' AND '2019-12-31') 
        OR (Ranking.startday BETWEEN '2020-12-01' AND '2020-12-31') 
      )
      AND NOT Ranking.countryid = 'GL'`,
    );
    const countrys = {};
    result.map((r) => {
      if (!countrys[r.countryid]) {
        countrys[r.countryid] = {
          countryid : r.countryid,
          count : 1
        }
      }else if(countrys[r.countryid]){
        countrys[r.countryid].count += 1;
      }
    });

    return { statusCode: 200, body: JSON.stringify(countrys) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};

// Ranking.startday = (SELECT MAX(startday) FROM Ranking)だと最新の日付
