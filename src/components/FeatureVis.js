import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCountry,
  changeChoosedCountry,
  changeChoosedFeature,
  changeChoosedPeriod,
} from "../stores/details";
import {
  fetchCountries,
  fetchGLtop,
  fetchJPtop,
  fetchDectop,
  fetchJPGLTopStreamCountry,
  fetchgetDECStreamCountry,
} from "../api";
import * as d3 from "d3";

import { fetchSongData } from "../api";
import RaderChart from "./draw_raderchart";
import request from "request";
import FeatureWorldmap from "./FeatureWorldmap";

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
    <div
      className="has-text-centered"
      style={{ width: "100%", fontSize: "0.9rem" }}
    >
      <p style={{ marginBottom: "0px", cursor: "default" }}>
        テンポ：{Math.round(data[0].tempo)}　 拍子：{data[0].time_signature}　
        調：{keyDict[musicKey]}
        {data[0].mode == 0 ? "短調" : "長調"}
      </p>
      <br />
    </div>
  );
};

const Gltop = () => {
  const [top, setTop] = useState({ musicid: 1 });
  useEffect(() => {
    (async () => {
      const data = await fetchGLtop();
      setTop({ musicid: data[0].musicid });
    })();
  }, []);
  return <Song id={top.musicid} listnumber={0} />;
};

const Jptop = () => {
  const [top, setTop] = useState({ musicid: 1 });
  useEffect(() => {
    (async () => {
      const data = await fetchJPtop();
      setTop({ musicid: data[0].musicid });
    })();
  }, []);
  return <Song id={top.musicid} listnumber={1} />;
};

const Dectop = () => {
  const [top, setTop] = useState({ musicid: 1 });
  useEffect(() => {
    (async () => {
      const data = await fetchDectop();
      setTop({ musicid: data[0].musicid });
    })();
  }, []);
  return <Song id={top.musicid} listnumber={2} />;
};

const Song = (props) => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.detail.country);
  const choosedCountry = useSelector((state) => state.detail.choosedCountry);
  const choosedFeature = useSelector((state) => state.detail.choosedFeature);
  const choosedPeriod = useSelector((state) => state.detail.choosedPeriod);

  const musicId = props.id;
  const countryNumber = props.listnumber;
  //ここで渡されたtop3の配信されている国を取得して表示する。
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    (async () => {
      if (countryNumber === 2) {
        const data = await fetchgetDECStreamCountry(musicId);
        setCountries(data);
      } else {
        const data = await fetchJPGLTopStreamCountry(musicId);
        setCountries(data);
      }
    })();
  }, [musicId]); //変化するものを配列に入れておくこと。
  const [metaData, setMetaData] = useState(null);
  const [data, setData] = useState([]);
  const [key, setKey] = useState(null);
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

  return (
    <div>
      <div
        className="card-content"
        style={{ paddingTop: "12px", paddingBottom: "12px" }}
      >
        <div className="content">
          {data.length > 0 ? (
            <div>
              <div>
                <a
                  href={metaData?.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b style={{ fontSize: "1.25rem" }}>{data[0]?.name}</b>
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
                <br />
              </div>
              <div
                style={{
                  paddingTop: "1px",
                }}
              >
                <RaderChart data={data} />
                <TextDetail data={data} musicKey={key} />
              </div>
              <audio
                controls
                src={metaData?.preview_url}
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "1.25rem" }}>
                データが取得できませんでした。
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div
        className="card-content"
        style={{ paddingTop: "12px", paddingBottom: "12px" }}
      > */}
      {data.length > 0 ? (
        <div className="content">
          {/* <div className="buttons are-small">
              {countries.map((element) => {
                return (
                  <button
                    className="button"
                    onClick={() => {
                      dispatch(changeCountry(element.countryid));
                      dispatch(changeChoosedCountry("Yes"));
                    }}
                  >
                    {element.countryid}
                  </button>
                );
              })}
            </div> */}
          <FeatureWorldmap data={countries} />
        </div>
      ) : (
        <div className="content"></div>
      )}
      {/* </div> */}
    </div>
  );
};

const FeatureVis = () => {
  // ここで最新のグローバルtop3を取得してSongに渡す（ここで最新の最新のグローバルtop3を取得＋それが配信されている国を取得してSongに渡す場合、共通関数使えないから×）。
  const [top3, setTop3] = useState([
    { musicid: "" },
    { musicid: "" },
    { musicid: "" },
  ]);

  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Gltop />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Jptop />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Dectop />
        </article>
      </div>
    </div>
  );
};

export default FeatureVis;
