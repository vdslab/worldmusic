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
  const feature = event.queryStringParameters.feature || null;
  const country = event.queryStringParameters.country || null;
  const musicId = event.queryStringParameters.musicId || null;

  /**TODO:応急処置, 後でちゃんとした書き方先輩に聞く */
  if (musicId !== null) {
    const data = {
      path: `SELECT Music.Musicid , Music.name , Music.acousticness, Music.danceability, Music.energy , Music.instrumentalness , Music.liveness, Music.loudness, Music.mode, Music.speechiness, Music.tempo, Music.time_signature, Music.valence FROM Music WHERE Music.musicid=${musicId}`,
    };

    console.log(data);

    try {
      const dbpath = "./netlify/functions/database.db";
      const db = new sqlite3.Database(dbpath);

      const result = await selectRows(
        db,
        `SELECT Music.Musicid , Music.name , Music.acousticness, Music.danceability, Music.energy , Music.instrumentalness, Music.liveness, Music.loudness,Music.mode, Music.speechiness, Music.tempo, Music.time_signature, Music.valence FROM Music WHERE Music.musicid='${musicId}'`
      );
      return { statusCode: 200, body: JSON.stringify(result) };
    } catch (e) {
      return { statusCode: 500, body: "error" };
    }
  }

  console.log(country);

  if (country !== "ALL") {
    const data = {
      startMonth: startMonth,
      endMonth: endMonth,
      path: `SELECT Music.Musicid , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid=${country} AND Ranking.startday BETWEEN ${startMonth}-01 AND ${endMonth}-31`,
    };

    console.log(data);

    try {
      const dbpath = "./netlify/functions/database.db";
      const db = new sqlite3.Database(dbpath);

      const result = await selectRows(
        db,
        `SELECT Music.Musicid , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid='${country}' AND Ranking.startday BETWEEN '${startMonth}-01' AND '${endMonth}-31'`
      );
      return { statusCode: 200, body: JSON.stringify(result) };
    } catch (e) {
      return { statusCode: 500, body: "error" };
    }
  } else {
    const data = {
      startMonth: startMonth,
      endMonth: endMonth,
      path: `SELECT Music.Musicid , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.startday BETWEEN ${startMonth}-01 AND ${endMonth}-31`,
    };

    console.log(data);

    try {
      const dbpath = "./netlify/functions/database.db";
      const db = new sqlite3.Database(dbpath);

      const result = await selectRows(
        db,
        `SELECT Music.Musicid , Music.${feature} , Ranking.startday , Ranking.countryid , Ranking.stream FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.startday BETWEEN '${startMonth}-01' AND '${endMonth}-31'`
      );
      return { statusCode: 200, body: JSON.stringify(result) };
    } catch (e) {
      return { statusCode: 500, body: "error" };
    }
  }
};
