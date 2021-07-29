import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear } from "../stores/details";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
import { fetchSongData } from "../api";
import selectPeriod from "./selectPeriod";

function ShowRanking(){
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
        const data = await fetchData(
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

    const filters = dbData.filter((element, index, self) =>
                      self.findIndex(e =>
                          e.name === element.name) === index
    );
    console.log(filters);

    // filters.sort();

    // TODO IDをnameに

    return (
      <body>
        <div className="container">
            {filters.map((item, i) => {
              return (
                
                <React.Fragment key={i}>{i+1}.<a href="">{item.name}</a><br /></React.Fragment>
                
                
              );
            })}
        </div>
      </body>
        
    );
}

export default ShowRanking;