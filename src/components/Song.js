import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
import "./draw_heatmap.css";
function RaderChart({ data }) {
  //const [mousePosition, setMousePosition] = useState([]);
  const [displayFeature, setDisplayFeature] = useState([]);

  const useData = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "valence",
  ];

  const len = useData.length;
  const posX = 50;
  const posY = 50;
  const r = 50;
  const rs = [r, r * 0.8, r * 0.6, r * 0.4, r * 0.2];

  let perimeters = ["", "", "", "", ""];
  const perimetersPoint = [];
  const tick = [];
  let score = "";
  const scorePoint = [];
  const c = Math.PI / 180;

  for (let _r = 0; _r < rs.length; _r++) {
    for (let i = 0; i <= len; i++) {
      let key = useData[i];
      if (i === len) {
        key = useData[0];
      }
      const x = posX + rs[_r] * Math.cos(((360 / len) * i - 90) * c);
      const y = posY + rs[_r] * Math.sin(((360 / len) * i - 90) * c);
      if (i !== 0) {
        perimeters[_r] += "L " + x + "," + y + " ";
      } else {
        perimeters[_r] += "M " + x + "," + y + " ";
        tick.push({ x: x, y: y, value: (1 - _r / 5).toFixed(1) });
      }
      if (i === len) {
        perimeters[_r] += "z";
      }

      if (rs[_r] === r) {
        let value = data[0][key].toFixed(3);

        if (key === "loudness") {
          value = ((data[0].loudness + 60) / 60).toFixed(3);
        }

        const xs = posX + r * value * Math.cos(((360 / len) * i - 90) * c);
        const ys = posY + r * value * Math.sin(((360 / len) * i - 90) * c);

        if (i !== 0) {
          score += "L " + xs + "," + ys + " ";
        } else {
          score += "M " + xs + "," + ys + " ";
        }
        if (i === len) {
          score += "z";
        } else {
          scorePoint.push({ x: xs, y: ys, name: key, value: value });
          perimetersPoint.push({
            x: x,
            y: y,
            name: key,
            legend: false,
            value: value,
          });
          const xp = posX + rs[_r] * 1.1 * Math.cos(((360 / len) * i - 90) * c);
          const yp = posY + rs[_r] * 1.1 * Math.sin(((360 / len) * i - 90) * c);
          perimetersPoint.push({ x: xp, y: yp, name: key, legend: true });
        }
      }
    }
  }

  function overHandle(e) {
    const name = e.target.id;
    //const positionX = e.pageX;
    //const positionY = e.screenY;
    setDisplayFeature(name);
    //setMousePosition([positionX, positionY]);
  }
  function outHandle(e) {
    setDisplayFeature([]);
  }

  const margin = {
    left: 20,
    right: 20,
    top: 10,
    bottom: 10,
  };
  const contentWidth = 100;
  const contentHeight = 100;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  return (
    <div>
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <g>
          <circle cx={posX} cy={posY} r={0.5} stroke="black" />
          {perimeters.map((d, i) => {
            return (
              <g key={i}>
                <path fill="none" stroke="lightgray" d={d} strokeWidth="0.5" />
              </g>
            );
          })}
          {perimetersPoint.map((p, i) => {
            return (
              <g key={i}>
                {!p.legend ? (
                  <line
                    x1={posX}
                    y1={posY}
                    x2={p.x}
                    y2={p.y}
                    id={p.name + " " + p.value}
                    stroke="lightgray"
                    strokeWidth="0.5"
                    onMouseEnter={overHandle}
                  />
                ) : (
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="5"
                    style={{ userSelect: "none" }}
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
          {tick.map((t, i) => {
            return (
              <g key={i}>
                <text
                  x={t.x}
                  y={t.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="5"
                  style={{ userSelect: "none" }}
                >
                  {t.value}
                </text>
              </g>
            );
          })}
          <path
            fill="#FF55BB"
            fillOpacity="0.6"
            stroke="#FF0099"
            strokeWidth="0.5"
            d={score}
          />
          {scorePoint.map((p, i) => {
            return (
              <g key={i}>
                <circle
                  className="test"
                  id={p.name + " " + p.value}
                  cx={p.x}
                  cy={p.y}
                  r={1.5}
                  fill="white"
                  stroke="#FF0099"
                  strokeWidth={0.5}
                  onMouseEnter={overHandle}
                />
                {/*}  <g className="fukidashi">
                  <polygon
                    transform={`translate(${p.x - 35} ${
                      p.y - 30
                    })scale(${0.4}, 0.45)`}
                    points="1,2 160,2 160,48 70,48 80,60 55,48 1,48 1,2"
                    fill="#CBE6F3"
                    stroke="darkblue"
                    strokeWidth="1px"
                    //fillOpacity="0.8"
                  ></polygon>
                  <text
                    text-anchor="middle"
                    fontSize="5 "
                    x={p.x}
                    y={p.y - 18}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {p.name}
                    {p.value}
                  </text>
                  </g>*/}
              </g>
            );
          })}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 120,
        }}
        onMouseLeave={outHandle}
      >
        <div className="card-content">
          <div className="content">
            <p style={{ fontWeight: "15px" }}>{displayFeature}</p>
          </div>
        </div>
      </div>
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

  return (
    <div className="my-section">
      <div className="card" style={{ height: "24.25vh" }}>
        <div
          className="card-content"
          style={{ paddingTop: "12px", paddingBottom: "12px" }}
        >
          <div className="content">
            {data.length > 0 ? (
              <div>
                <div>
                  <b>{data[0]?.name}</b>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "40%" }}>
                    <br />
                    <p>
                      テンポ：{Math.round(data[0].tempo)} &ensp; 拍子：
                      {data[0].time_signature}
                    </p>

                    {/**だったらキーも教えて？*/}
                    {/*<p>調：{data[0].mode == 0 ? "短調" : "長調"}</p>*/}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      paddingTop: "5px",
                    }}
                  >
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
