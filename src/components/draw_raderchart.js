import React from "react";
import { useState } from "react";
import * as d3 from "d3";
import "../tooltip.css";

function RaderChart({ data }) {
  const [displayFeature, setDisplayFeature] = useState([]);
  const [watch, setWatch] = useState(false);

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
  const tooltipStyle = d3.select("body").append("div").attr("class", "tooltip");
  const tooltipStyle2 = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip2");

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
          const xp = posX + rs[_r] * 1.2 * Math.cos(((360 / len) * i - 90) * c);
          const yp =
            posY + rs[_r] * 1.15 * Math.sin(((360 / len) * i - 90) * c);
          perimetersPoint.push({ x: xp, y: yp, name: key, legend: true });
        }
      }
    }
  }

  function overHandle(e) {
    const name = e.target.id;
    setDisplayFeature(name);
  }
  function outHandle() {
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
          {perimeters.map((d, i) => {
            return (
              <g key={i}>
                <path fill="none" stroke="lightgray" d={d} strokeWidth="0.5" />
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

          <path
            fill="#FF55BB"
            fillOpacity="0.5"
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
                  // onMouseEnter={overHandle}
                  onMouseMove={(e) => {
                    /* tooltipStyle.style("visibility", "visible");
                    tooltipStyle2.style("visibility", "visible");
                    tooltipStyle
                      //  .style("top", e.pageY - 20 + "px")
                      //  .style("left", e.pageX + 20 + "px")
                      .style("top", e.pageY + "px")
                      .style("left", 50 + "px")
                      .html(p.name + ":" + p.value);
                    console.log(e);*/
                    setWatch(true);
                  }}
                  onMouseLeave={() => {
                    /*tooltipStyle.style("visibility", "hidden");
                    tooltipStyle2.style("visibility", "hidden");*/
                    setWatch(false);
                  }}
                  onClick={() => {
                    /*tooltipStyle.style("visibility", "hidden");*/
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 130,
        }}
        onMouseLeave={outHandle}
      >
        <div className="card-content">
          <div className="content">
            {watch ? (
              <div className="tooltip2">
                <p style={{ fontSize: "2vh" }}>{displayFeature}</p>
              </div>
            ) : (
              []
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaderChart;
