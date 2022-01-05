import React from "react";
import * as d3 from "d3";

import { useDispatch, useSelector } from "react-redux";

const colorLegend = (props) => {
  const feature = useSelector((state) => state.detail.feature);
  const max = Number(props.max);
  const min = Number(props.min);
  const color = props.color;
  const id = props.id;
  const url = "url('#" + id + "')";
  const w = 250;
  let n = 2;

  if (feature === "loudness") {
    n = 1;
  } else if (feature === "tempo") {
    n = 0;
  }

  const aboutColorGradations = [
    [Math.floor(min * Math.pow(10, n)) / Math.pow(10, n), 0],
  ];

  for (let i = 1; i <= 10; i++) {
    const p = (max - min) / 10;
    let value = Number(min + p * i);
    if (i === 10) {
      value = Math.ceil(max * Math.pow(10, n)) / Math.pow(10, n);
    } else {
      value = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    }
    aboutColorGradations.push([value, 0 + (w / 10) * i]);
  }
  return (
    <svg viewBox="0 0 265 60" width={w + 20} height="55">
      <defs>
        <linearGradient id={id}>
          <stop offset="0%" stopColor={d3[color](0)} />
          <stop offset="5%" stopColor={d3[color](0.05)} />
          <stop offset="10%" stopColor={d3[color](0.1)} />
          <stop offset="15%" stopColor={d3[color](0.15)} />
          <stop offset="20%" stopColor={d3[color](0.2)} />
          <stop offset="25%" stopColor={d3[color](0.25)} />
          <stop offset="30%" stopColor={d3[color](0.3)} />
          <stop offset="35%" stopColor={d3[color](0.35)} />
          <stop offset="40%" stopColor={d3[color](0.4)} />
          <stop offset="45%" stopColor={d3[color](0.45)} />
          <stop offset="50%" stopColor={d3[color](0.5)} />
          <stop offset="55%" stopColor={d3[color](0.55)} />
          <stop offset="60%" stopColor={d3[color](0.6)} />
          <stop offset="65%" stopColor={d3[color](0.65)} />
          <stop offset="70%" stopColor={d3[color](0.7)} />
          <stop offset="75%" stopColor={d3[color](0.75)} />
          <stop offset="80%" stopColor={d3[color](0.8)} />
          <stop offset="85%" stopColor={d3[color](0.85)} />
          <stop offset="90%" stopColor={d3[color](0.9)} />
          <stop offset="95%" stopColor={d3[color](0.95)} />
          <stop offset="100%" stopColor={d3[color](1)} />
        </linearGradient>
      </defs>
      <rect x="0" y="10" width={w} height="20" fill={url} />
      {/* {aboutColorGradations.map((item, i) => {
        return (
          <line
            key={i}
            x1={item[1]}
            y1="30"
            x2={item[1]}
            y2="40"
            stroke="black"
          />
        );
      })}
      {aboutColorGradations.map((item, i) => {
        console.log(item);
        return (
          <text key={i} x={item[1]} y="50" fontSize="10" textAnchor="start">
            {item[0]}
          </text>
        );
      })} */}
      <line x1={10} y1={30} x2={10} y2={40} stroke="black" />
      <line x1={240} y1={30} x2={240} y2={40} stroke="black" />
      <text x={5} y={50} fontSize="10" textAnchor="start">
        低
      </text>
      <text x={235} y={50} fontSize="10" textAnchor="start">
        高
      </text>
    </svg>
  );
};

export default colorLegend;
