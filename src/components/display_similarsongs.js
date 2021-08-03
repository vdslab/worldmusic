import React from "react";
import { useState, useEffect } from "react";
import request from "request";
import { fetchSongData } from "../api";
import { useSelector } from "react-redux";
import { style } from "d3";
import "../style.css";
function display_similarsongs() {
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
  //const musicId = "4MzXwWMhyBbmu6hOcLVD49";
  const [similarSongs, setSimilarSongs] = useState([]);

  console.log(musicId);
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
      <p style={{ fontSize: "1.25rem" }}>類似曲</p>
      {similarSongs.map((item, i) => {
        return (
          <div style={{ width: "100%", fontSize: "40" }}>
            <p>
              <img
                src={item.album.images[0].url}
                width="130"
                height="130"
                style={{ float: "left", padding: "10px" }}
              />
              曲名
              <br />
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
              <br />
              歌手
              <br />
              <p>
                {item.artists.map((item2, j) => {
                  return (
                    <a
                      href={item2.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    > 
                    {j !== 0 ? " / " : []}
                    {item2.name}
                    </a>
                  );
                })}
              </p>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default display_similarsongs;
