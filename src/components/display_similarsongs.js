import React from "react";
import { useState, useEffect } from "react";
import request from "request";
import { fetchSongData } from "../api";
import { useSelector } from "react-redux";

export default function App() {
  const spotify = {
    ClientId: process.env.REACT_APP_CLIENTID,
    ClientSecret: process.env.REACT_APP_CLIENTSECRET,
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

  const country = useSelector((state) => state.detail.country);
  const musicId = useSelector((state) => state.detail.musicid);
  const [similarSongs, setSimilarSongs] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchSongData("", "", "", "ALL", musicId);
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200 && data.length > 0) {
          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: `https://api.spotify.com/v1/recommendations?limit=1&market=${country}&seed_tracks=${data[0].musicid}&target_acousticness=${data[0].acousticness}&target_danceability=${data[0].danceability}&target_energy=${data[0].energy}&target_instrumentalness=${data[0].instrumentalness}&target_liveness=${data[0].liveness}&target_loudness=${data[0].loudness}&target_mode=${data[0].mode}&target_speechiness=${data[0].speechiness}&target_tempo=${data[0].tempo}&target_time_signature=${data[0].time_signature}&target_valence=${data[0].valence}`,
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
    })();
  }, [musicId]);

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
