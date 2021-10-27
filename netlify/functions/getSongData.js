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
  const musicId = event.queryStringParameters.musicId || null;

  try {
    const dbpath = "./netlify/functions/musicvisdatabase.db";
    const db = new sqlite3.Database(dbpath);

    const result = await selectRows(
      db,
      `SELECT Music.Musicid , Music.name , Music.acousticness, Music.danceability, Music.energy , Music.instrumentalness, Music.liveness, Music.loudness,Music.mode, Music.speechiness, Music.tempo, Music.time_signature, Music.valence FROM Music WHERE Music.musicid='${musicId}'`
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
};
