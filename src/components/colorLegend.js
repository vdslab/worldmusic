import React from "react";
import * as d3 from "d3";

import { useDispatch, useSelector } from "react-redux";

const colorLegend = () => {
  const feature = useSelector((state) => state.detail.feature);
  const max = useSelector((state) => state.detail.max);
  const min = useSelector((state) => state.detail.min);
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
    let value = min + p * i;
    if (i === 10) {
      value = Math.ceil(max * Math.pow(10, n)) / Math.pow(10, n);
    } else {
      value = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    }
    aboutColorGradations.push([value, 0 + (w / 10) * i]);
  }

  return (
    <div>
      <svg viewBox="0 0 265 60" /*width={w + 20} */ height="50">
        <g>
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor={d3.interpolateTurbo(0)} />
              <stop offset="5%" stopColor={d3.interpolateTurbo(0.05)} />
              <stop offset="10%" stopColor={d3.interpolateTurbo(0.1)} />
              <stop offset="15%" stopColor={d3.interpolateTurbo(0.15)} />
              <stop offset="20%" stopColor={d3.interpolateTurbo(0.2)} />
              <stop offset="25%" stopColor={d3.interpolateTurbo(0.25)} />
              <stop offset="30%" stopColor={d3.interpolateTurbo(0.3)} />
              <stop offset="35%" stopColor={d3.interpolateTurbo(0.35)} />
              <stop offset="40%" stopColor={d3.interpolateTurbo(0.4)} />
              <stop offset="45%" stopColor={d3.interpolateTurbo(0.45)} />
              <stop offset="50%" stopColor={d3.interpolateTurbo(0.5)} />
              <stop offset="55%" stopColor={d3.interpolateTurbo(0.55)} />
              <stop offset="60%" stopColor={d3.interpolateTurbo(0.6)} />
              <stop offset="65%" stopColor={d3.interpolateTurbo(0.65)} />
              <stop offset="70%" stopColor={d3.interpolateTurbo(0.7)} />
              <stop offset="75%" stopColor={d3.interpolateTurbo(0.75)} />
              <stop offset="80%" stopColor={d3.interpolateTurbo(0.8)} />
              <stop offset="85%" stopColor={d3.interpolateTurbo(0.85)} />
              <stop offset="90%" stopColor={d3.interpolateTurbo(0.9)} />
              <stop offset="95%" stopColor={d3.interpolateTurbo(0.95)} />
              <stop offset="100%" stopColor={d3.interpolateTurbo(1)} />
            </linearGradient>
          </defs>
          <rect x="0" y="10" width={w} height="20" fill="url('#gradient')" />
          {aboutColorGradations.map((item, i) => {
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
            return (
              <text key={i} x={item[1]} y="50" fontSize="10" textAnchor="start">
                {item[0]}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default colorLegend;
