import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear } from "../stores/details";
import { useState, useEffect } from "react";
import { fetchSwarmplt } from "../api";
import { fetchSongData } from "../api";
import selectPeriod from "./selectPeriod";
import { changeMusicId } from "../stores/details";

function ShowRanking() {
  const dispatch = useDispatch();

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

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const musicid = useSelector((state) => state.detail.musicid);
  const name = useSelector((state) => state.detail.name);

  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchSwarmplt(
        startMonth,
        endMonth,
        feature,
        country,
        musicid,
        name
      );
      setDbData(data);
    })();
  }, [startMonth, endMonth, feature, country, musicid, name]);

  // TODO 曲の重複削除→削除したデータの特徴量をソートして出力
  // idで重複削除、idをクリックしたらidを取得できるようにする

  const filters = dbData.filter(
    (element, index, self) =>
      self.findIndex((e) => e.name === element.name) === index
  );

  filters.sort((a, b) => {
    return a[feature] - b[feature];
  });

  console.log(filters);

  return (
    <body>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Pos MusicName</th>
            </tr>
          </thead>
          <tbody>
            
          {filters.map((item, i) => {
            {
              /* console.log(item); */
            }
            return (
              <div onClick={() => dispatch(changeMusicId(item.musicid))}>
                <tr>
                  <th>{i + 1}</th>
                  <span style={{ color: "#3273dc", cursor: "pointer" }}>
                    <td>{item.name}</td>
                  </span>
                </tr>
              </div>
            );
          })}
          
          </tbody>
        </table>
      </div>
    </body>
  );
}

export default ShowRanking;
