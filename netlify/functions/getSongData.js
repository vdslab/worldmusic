const { selectRows } = require("./db");

exports.handler = async function (event) {
  const musicId = event.queryStringParameters.musicId || null;

  try {
    const result = await selectRows(
      `SELECT Music.Musicid , Music.name , Music.acousticness, Music.danceability, Music.energy , Music.instrumentalness, Music.liveness, Music.loudness,Music.mode, Music.speechiness, Music.tempo, Music.time_signature, Music.valence FROM Music WHERE Music.musicid='${musicId}'`,
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (e) {
    return { statusCode: 500, body: "error" };
  }
};
