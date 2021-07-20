import React from "react";
import { useState, useEffect } from "react";
import request from "request";
import { fetchData } from "../api";

export default function App() {
  const spotify = {
    ClientId: "e76d6e9c4afc46d899278c03df0d3e05",
    ClientSecret: "fe2860375c894b9bbf4d97d899b9fd3d",
  };

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(spotify.ClientId + ":" + spotify.ClientSecret).toString(
          "base64"
        ),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  //good4u
  // const data = {
  //   acousticness: 0.335,
  //   analysis_url: "https://api.spotify.com/v1/audio-analysis/4ZtFanR9U6ndgddUvNcjcG",
  //   danceability: 0.563,
  //   duration_ms: 178147,
  //   energy: 0.664,
  //   id: "4ZtFanR9U6ndgddUvNcjcG",
  //   instrumentalness: 0,
  //   key: 9,
  //   liveness: 0.0849,
  //   loudness: -5.044,
  //   mode: 1,
  //   speechiness: 0.154,
  //   tempo: 166.928,
  //   time_signature: 4,
  //   track_href: "https://api.spotify.com/v1/tracks/4ZtFanR9U6ndgddUvNcjcG",
  //   type: "audio_features",
  //   uri: "spotify:track:4ZtFanR9U6ndgddUvNcjcG",
  //   valence: 0.688,
  // }

  //夜にかける
  const data2 = {
    danceability: 0.663,
    energy: 0.871,
    key: 8,
    loudness: -5.287,
    mode: 1,
    speechiness: 0.03,
    acousticness: 0.00299,
    instrumentalness: 0.0000018,
    liveness: 0.337,
    valence: 0.826,
    tempo: 130.025,
    type: "audio_features",
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    uri: "spotify:track:6MCjmGYlw6mQVWRFVgBRvB",
    duration_ms: 258840,
    time_signature: 4,
  };

  //うっせえわ
  const data3 = {
    danceability: 0.525,
    energy: 0.978,
    key: 11,
    loudness: -1.072,
    mode: 0,
    speechiness: 0.0815,
    acousticness: 0.00485,
    instrumentalness: 0,
    liveness: 0.06,
    valence: 0.577,
    tempo: 178.069,
    type: "audio_features",
    id: "6EzZn96uOc9JsVGNRpx06n",
    uri: "spotify:track:6EzZn96uOc9JsVGNRpx06n",
    track_href: "https://api.spotify.com/v1/tracks/6EzZn96uOc9JsVGNRpx06n",
    analysis_url:
      "https://api.spotify.com/v1/audio-analysis/6EzZn96uOc9JsVGNRpx06n",
    duration_ms: 204920,
    time_signature: 4,
  };

  // const musicId = "4ZtFanR9U6ndgddUvNcjcG";
  // const musivId2 = "6MCjmGYlw6mQVWRFVgBRvB";
  // const musicId3 =  "6EzZn96uOc9JsVGNRpx06n";
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     /**TODO:リクエストの送り方 */
  //     const data = await fetchData("", "", "", "ALL", musicId);
  //     setData(data);
  //   })();
  // }, [musicId]);

  const [similarSongs, setSimilarSongs] = useState([]);
  const country = "US";
  const music = data2;
  useEffect(() => {
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: `https://api.spotify.com/v1/recommendations?limit=1&market=${country}&seed_tracks=${music.id}&target_acousticness=${music.acousticness}&target_danceability=${music.danceability}&target_duration_ms=${music.duration_ms}&target_energy=${music.energy}&target_instrumentalness=${music.instrumentalness}&target_key=${music.key}&target_liveness=${music.liveness}&target_loudness=${music.loudness}&target_mode=${music.mode}&target_speechiness=${music.speechiness}&target_tempo=${music.tempo}&target_time_signature=${music.time_signature}&target_valence=${music.valence}`,
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        };
        request.get(options, function (error, response, body) {
          setSimilarSongs(body.tracks);
        });
      }
    });
  }, [data2.id]);

  console.log(similarSongs);

  return (
    <div>
      <p>類似曲</p>
      <svg viewBox="0 0 200 50">
        {similarSongs.map((item, i) => {
          return (
            <g key={i} transfrom={`translate(70,${20 * (i + 1)})`}>
              <image href={item.album.images[0].url} width="50" height="50" />
              <a href={item.external_urls.spotify}>
                <text x="70" y="20" fontSize="10">
                  {item.name}
                </text>
              </a>
              {item.artists.map((item2, j) => {
                return (
                  <g key={j} transform={`translate(70,30)`}>
                    <a href={item2.external_urls.spotify}>
                      <text x="70" y="40" fontSize="10">
                        {item2.name}
                      </text>
                    </a>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
