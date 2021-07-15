import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData } from "../api";
import { changeCountry, changeFeature } from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import SelectPeriod from "./selectPeriod";
import SelectFeature from "./selectFeature";

const WorldMap = ({ features }) => {
  const dispatch = useDispatch();

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);

  const term = [
    { start: "2017-01", end: "2017-03" },
    { start: "2017-04", end: "2017-06" },
    { start: "2017-07", end: "2017-09" },
    { start: "2017-10", end: "2017-12" },
    { start: "2018-01", end: "2018-03" },
    { start: "2018-04", end: "2018-06" },
    { start: "2018-07", end: "2018-09" },
    { start: "2018-10", end: "2018-12" },
    { start: "2019-01", end: "2019-03" },
    { start: "2019-04", end: "2019-06" },
    { start: "2019-07", end: "2019-09" },
    { start: "2019-10", end: "2019-12" },
    { start: "2020-01", end: "2020-03" },
    { start: "2020-04", end: "2020-06" },
    { start: "2020-07", end: "2020-09" },
    { start: "2020-10", end: "2020-12" },
  ];

  const countries = ["AU", "CA", "DE", "FR", "JP", "NL", "UK", "US"];
  const [worldMapData, setWorldMapData] = useState([]);
  const [Max,setMax] = useState(-Infinity);
  const [Min,setMin] = useState(Infinity);
  
  useEffect(() => {
    let Max = -Infinity;
    let Min = Infinity;
    (async () => {
      /**TODO:改善 */
      const data = await Promise.all(
        countries.map(async (cId) => {
          const countryData = { countryName: cId };
          const timeData = await Promise.all(
            term.map(async (t) => {
              const data = await fetchData(t.start, t.end, feature, cId);
              const weightAve = makeData(data, cId);
              if(Max < weightAve && weightAve != null){
                Max = weightAve;
              }
              if(Min > weightAve && weightAve != null){
                Min = weightAve;
              }
              return { start: t.start, end: t.end, value: weightAve };
            })
          );
          countryData["timeData"] = timeData;
          return countryData;
        })
      );
      setWorldMapData(data);
      setMax(Max);
      setMin(Min);
    })();
  }, [feature]);

  function makeData(data) {
    let weightFeatureTotal = 0;
    let streamTotal = 0;
    let weightAve = null;
    if (data.length) {
      data.map((d) => {
        streamTotal += d.stream;
        weightFeatureTotal += d.stream * d[feature];
      });
      weightAve = weightFeatureTotal / streamTotal;
    }
    return weightAve;
  }

  const colorjudge = (item) => {
    let color = "white";
    worldMapData.map((data) => {
      if(data.countryName === item.properties.ISO_A2){
        data.timeData.map((t) => {
          if(t.start === startMonth && t.value != null){
            color = d3.interpolateTurbo(opacityjudge(t.value));
          }
        })
      }   
    })
    return color; 
  }
    
  const opacityjudge = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    opacity = ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    return opacity;
  };

  const aboutColorGradations = [
    [0, 0],
    [0.1, 30],
    [0.2, 60],
    [0.3, 90],
    [0.4, 120],
    [0.5, 150],
    [0.6, 180],
    [0.7, 210],
    [0.8, 240],
    [0.9, 270],
    [1, 300],
  ];

  const width = 630;
  const height = 250;
  const centerPos = [0, 0];
  const scale = 75;

  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height - 60])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  return (
    <div>
        <svg viewBox="0 -30 770 310">
          <g>
            {features.map((item, i) => (
              <path
                d={path(item)}
                fill={colorjudge(item)}
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.5"
                countryname={item}
                onMouseOver={(e) => {
                  select(e.target).attr("stroke", "red");
                }}
                onMouseOut={(e) => {
                  select(e.target).attr("stroke", "black");
                }}
                onClick={() => {
                  console.log(item.properties.ISO_A2);
                  const c = item.properties.ISO_A2;
                  dispatch(changeCountry(c));
                }}
                key={i}
              />
            ))}
          </g>
        </svg>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <SelectFeature />
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            <svg width="310" height="50">
              <g>
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stop-color={d3.interpolateTurbo(0)} />
                    <stop offset="5%" stop-color={d3.interpolateTurbo(0.05)} />
                    <stop offset="10%" stop-color={d3.interpolateTurbo(0.1)} />
                    <stop offset="15%" stop-color={d3.interpolateTurbo(0.15)} />
                    <stop offset="20%" stop-color={d3.interpolateTurbo(0.2)} />
                    <stop offset="25%" stop-color={d3.interpolateTurbo(0.25)} />
                    <stop offset="30%" stop-color={d3.interpolateTurbo(0.3)} />
                    <stop offset="35%" stop-color={d3.interpolateTurbo(0.35)} />
                    <stop offset="40%" stop-color={d3.interpolateTurbo(0.4)} />
                    <stop offset="45%" stop-color={d3.interpolateTurbo(0.45)} />
                    <stop offset="50%" stop-color={d3.interpolateTurbo(0.5)} />
                    <stop offset="55%" stop-color={d3.interpolateTurbo(0.55)} />
                    <stop offset="60%" stop-color={d3.interpolateTurbo(0.6)} />
                    <stop offset="65%" stop-color={d3.interpolateTurbo(0.65)} />
                    <stop offset="70%" stop-color={d3.interpolateTurbo(0.7)} />
                    <stop offset="75%" stop-color={d3.interpolateTurbo(0.75)} />
                    <stop offset="80%" stop-color={d3.interpolateTurbo(0.8)} />
                    <stop offset="85%" stop-color={d3.interpolateTurbo(0.85)} />
                    <stop offset="90%" stop-color={d3.interpolateTurbo(0.9)} />
                    <stop offset="95%" stop-color={d3.interpolateTurbo(0.95)} />
                    <stop offset="100%" stop-color={d3.interpolateTurbo(1)} />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="10"
                  width="300"
                  height="20"
                  fill="url('#gradient')"
                />
                {aboutColorGradations.map((item, i) => {
                  return (
                    <line
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
                    <text x={item[1]} y="50" font-size="10" text-anchor="start">
                      {item[0]}
                    </text>
                  );
                })}
              </g>
            </svg>
          </span>
        </p>
      </footer>
    </div>
  );
};

export const DrowWorldMap = () => {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/worldmap.json`);
      const data = await res.json();
      const { features } = topojson.feature(data, data.objects.worldmap);
      setFeatures(features);
    })();
  }, []);
  if (features == null) {
    return <p>loading</p>;
  }
  return <WorldMap features={features} />;
};
