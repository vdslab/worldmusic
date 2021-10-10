import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchTest , fetchTop3} from "../api";
import * as d3 from "d3";

import { fetchSongData } from "../api";
import RaderChart from "./draw_raderchart";
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
    <div className="has-text-centered" style={{ width: "100%", fontSize: "0.9rem" }}>
      <p style={{ marginBottom: "0px" }}>
        テンポ：{Math.round(data[0].tempo)}　
        拍子：{data[0].time_signature}　
        調：{keyDict[musicKey]}
        {data[0].mode == 0 ? "短調" : "長調"}
      </p>
      <br />
    </div>
  );
};

const Song = (props) => {
  const musicId = props.id;
  //console.log(musicId,props.listnumber) ←各top3のmusicidが取れてた。

  //ここで渡されたtop3の配信されている国を取得して表示する。
  const [countries, setCountries] = useState([]);
    useEffect(() => {
      (async () => {
        const data = await fetchTest(musicId);  //←できていない！！！
        setCountries(data);
        //console.log(countries,props.listnumber);
      })();
    }, []);
  const testcountries = ["AU","CA","DE","FR","JP","NL","GB","US","BE","BG"]; //←データの取得がまだできていないので、代わりの文字表示するためのテストデータ
  //

  const [metaData, setMetaData] = useState(null);
  const [data, setData] = useState([]);
  const [key, setKey] = useState(null);
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
      //console.log(data);
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
              {/*<div style={{ display: "flex" }}>*/}
              {/*<TextDetail data={data} musicKey={key} />*/}
                <div
                  style={{
                    //width: "300px",
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
              <p style={{ fontSize: "1.25rem" }}>データが取得できませんでした。</p>
            </div>
          )}
        </div>
      </div>
      <div
        className="card-content"
        style={{ paddingTop: "12px", paddingBottom: "12px" }}
      >
        {data.length > 0 ? (
          <div className="content">
            同じ期間にランクインされた国： <br />
            {testcountries[0]}, {testcountries[1]}, {testcountries[2]}, {testcountries[3]}, {testcountries[4]}, {testcountries[5]}, {testcountries[6]}, {testcountries[7]}, {testcountries[8]}, {testcountries[9]}
          </div>
        ) : (
          <div className="content"></div>
        )}
      </div>
    </div>
  );
};

const FeatureVis = () => {
  // ここで最新のグローバルtop3を取得してSongに渡す（ここで最新の最新のグローバルtop3を取得＋それが配信されている国を取得してSongに渡す場合、共通関数使えないから×）。
  const [top3, setTop3] = useState([{},{},{}]);   
  useEffect(() => {
      (async () => {
        const data = await fetchTop3();
        //console.log(data);
        setTop3(data);
      })();
    }, []);
  //console.log("top3: "+top3[0].musicid+" , "+top3[1].musicid+" , "+top3[2].musicid)

  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Song id={top3[0].musicid} listnumber={0}/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Song id={top3[1].musicid} listnumber={1}/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <Song id={top3[2].musicid} listnumber={2}/>
        </article>
      </div>
    </div>
  );
};

export default FeatureVis;
