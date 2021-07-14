import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../api";

function RaderChart({ data }) {
  //loudnessを01に正規化しないといけないけどこれMAXどれ？
  const useData = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "speechiness",
    "valence",
  ];

  const len = useData.length;
  const r = 50;
  const rs = [r, r * 0.8, r * 0.6, r * 0.4, r * 0.2];

  let perimeters = ["", "", "", "", ""];
  let score = "";
  const c = Math.PI / 180;

  console.log(len);
  for (let _r = 0; _r < rs.length; _r++) {
    for (let i = 0; i <= len; i++) {
      const x = 50 + rs[_r] * Math.cos(((360 / len) * i - 90) * c);
      const y = 60 + rs[_r] * Math.sin(((360 / len) * i - 90) * c);
      if (i !== 0) {
        perimeters[_r] += "L " + x + "," + y + " ";
      } else {
        perimeters[_r] += "M " + x + "," + y + " ";
      }
      if (i === len) {
        perimeters[_r] += "z";
      }

      if (rs[_r] === r) {
        let key = useData[i];
        if (i === len) {
          key = useData[0];
        }
        const xs = 50 + r * data[0][key] * Math.cos(((360 / len) * i - 90) * c);
        const ys = 60 + r * data[0][key] * Math.sin(((360 / len) * i - 90) * c);
        if (i !== 0) {
          score += "L " + xs + "," + ys + " ";
        } else {
          score += "M " + xs + "," + ys + " ";
        }
        if (i === len) {
          score += "z";
        }
      }
    }
  }

  console.log(score);
  //8or7角形を作る
  return (
    <div>
      <svg>
        <g>
          <circle cx={50} cy={60} r={0.5} stroke="black" />
          {/*<circle cx={100} cy={50} r={3} stroke="black" />*/}
          {/*} <path
            fill="none"
            stroke="red"
            d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z"
  />*/}
          {perimeters.map((d) => {
            return (
              <g>
                <path fill="none" stroke="lightgray" d={d} />
              </g>
            );
          })}
          {/*} <path fill="none" stroke="black" d={str} />
          <path fill="none" stroke="black" d={str2} />*/}
          <path fill="none" stroke="blue" d={score} />
        </g>
      </svg>
    </div>
  );
}

const Song = () => {
  const musicId = "3HVWdVOQ0ZA45FuZGSfvns";
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchData("", "", "", "ALL", musicId);
      setData(data);
    })();
  }, [musicId]);

  console.log(data);

  return (
    <div className="my-section">
      <div className="card" style={{ height: "24.25vh" }}>
        <div className="card-content">
          <div className="content">
            {data.length > 0 ? (
              <div>
                <div>
                  <span>曲詳細 </span>
                  {data[0]?.name}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "40%" }}>
                    <ul>
                      <li>テンポ：{data[0].tempo}</li>
                      <li>拍子：{data[0].time_signature}</li>
                      <li>調：{data[0].mode == 0 ? "短調" : "長調"}</li>
                    </ul>
                  </div>
                  <div style={{ width: "60%" }}>
                    <RaderChart data={data} />
                  </div>
                </div>
              </div>
            ) : (
              []
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
