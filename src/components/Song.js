import React from "react";
import { useState, useEffect } from "react";
import { fetchSongData } from "../api";
import RaderChart from "./draw_raderchart";
import { useSelector } from "react-redux";
import request from "request";

const TextDetail = ({ data, musicKey }) => {
  const keyDict = {
    0: "ハ",
    1: "嬰ハ/変二",
    2: "ニ",
    3: "嬰ニ/変ホ",
    4: "ホ",
    5: "ヘ",
    6: "嬰ヘ/変ト",
    7: "ト",
    8: "嬰ト/変イ",
    9: "イ",
    10: "嬰イ/変ロ",
    11: "ロ",
  };

  return (
    <div style={{ width: "100%", fontSize: "0.9rem" }}>
      <p style={{ marginBottom: "0px", cursor: "default" }}>
        テンポ：{Math.round(data[0].tempo)}　 拍子：{data[0].time_signature}　
        調：{keyDict[musicKey]}
        {data[0].mode == 0 ? "短調" : "長調"}
      </p>
      <br />
    </div>
  );
};

const Song = () => {
  const regionId = useSelector((state) => state.detail.regionId);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);
  const isSwmpltChoosed = useSelector((state) => state.detail.isSwmpltChoosed);
  const country = useSelector((state) => state.detail.country);
  const musicId = useSelector((state) => state.detail.musicid);
  const [metaData, setMetaData] = useState(null);
  const [data, setData] = useState([]);
  const [key, setKey] = useState(null);
  // console.log(process.env.REACT_APPCLIENTID);
  const spotify = {
    ClientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    ClientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
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

  useEffect(() => {
    (async () => {
      /**TODO:リクエストの送り方 */
      const data = await fetchSongData("", "", "", "ALL", musicId);
      setData(data);
    })();
  }, [musicId]);

  useEffect(() => {
    (async () => {
      const data = await fetchSongData("", "", "", "ALL", musicId);
      setData(data);
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200 && data.length > 0) {
          // use the access token to access the Spotify Web API
          const token = body.access_token;
          const options = {
            url: `https://api.spotify.com/v1/tracks/${musicId}`,

            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          };
          request.get(options, function (error, response, body) {
            setMetaData(body);
          });
        }
      });

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200 && data.length > 0) {
          // use the access token to access the Spotify Web API
          const token = body.access_token;
          const options = {
            url: `https://api.spotify.com/v1/audio-features/${musicId}`,
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          };
          request.get(options, function (error, response, body) {
            setKey(body.key);
          });
        }
      });
    })();
  }, [musicId]);

  if (isSwmpltChoosed && !isRegionShowed) {
    return (
      <div className="card-content" style={{ height: "100%" }}>
        <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
      </div>
    );
  } else if (regionId === "") {
    return (
      <div className="card-content" style={{ height: "100%" }}>
        <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>曲詳細</p>
        <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>
          ヒートマップより地域を選んでください。
        </p>
      </div>
    );
  } else if (country.length === 0) {
    return (
      <div className="card-content" style={{ height: "100%" }}>
        <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>曲詳細</p>
        <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>
          ヒートマップより国・期間を選んでください。
        </p>
      </div>
    );
  }
  return (
    <div className="card-content" style={{ height: "100%" }}>
      {data.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              paddingTop: "5px",
            }}
          >
            <div>
              <a
                href={metaData?.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b style={{ fontSize: "1.2rem" }}>{data[0]?.name}</b>
              </a>
              <br />
              <div style={{ fontSize: "0.85rem" }}>
                アーティスト : &ensp;
                {metaData?.artists.map((item2, j) => {
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
              </div>
            </div>
            <br />
            <br />
            <TextDetail data={data} musicKey={key} />
            <audio
              controls
              src={metaData?.preview_url}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              width: "100%",
              paddingTop: "5px",
            }}
          >
            <RaderChart data={data} />
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>曲詳細</p>
          <p style={{ fontSize: "1.25rem", marginBottom: "5px" }}>
            スワームプロットより曲を選んでください。
          </p>
        </div>
      )}
    </div>
  );
};

export default Song;
