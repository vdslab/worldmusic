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

  const [dbData, setDbData] = useState([]);
  let checkMinMax = [];

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

  let weightAvgData = [
    { countryid: "AU", WeightAvarage: 0 },
    { countryid: "CA", WeightAvarage: 0 },
    { countryid: "DE", WeightAvarage: 0 },
    { countryid: "FR", WeightAvarage: 0 },
    { countryid: "JP", WeightAvarage: 0 },
    { countryid: "NL", WeightAvarage: 0 },
    { countryid: "UK", WeightAvarage: 0 },
    { countryid: "US", WeightAvarage: 0 },
  ];

  const calcWeightedAverage = (country) => {
    let weightFeatureTotal = 0;
    let streamTotal = 0;

    dbData.map((d, i) => {
      if (d.countryid == country) {
        streamTotal += d.stream;
        weightFeatureTotal += d.stream * d[feature];
      }
    });
    return weightFeatureTotal / streamTotal;
  };
  const colorjudge = (item) => {
    let color = "white";
    checkMinMax = checkMinMax.filter((value) => !isNaN(value));
    weightAvgData.map((data) => {
      if (!isNaN(data.WeightAvarage)) {
        if (item.properties.ISO_A2 === data.countryid) {
          color = d3.interpolateTurbo(opacityjudge(item));
        }
      }
    });
    return color;
  };
  const opacityjudge = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    const checkMax = Math.max(...checkMinMax);
    const checkMin = Math.min(...checkMinMax);
    weightAvgData.map((data) => {
      if (item.properties.ISO_A2 === data.countryid) {
        opacity =
          ((opacityMax - opacityMin) * (data.WeightAvarage - checkMin)) /
            (checkMax - checkMin) +
          opacityMin;
      }
    });
    return opacity;
  };
  useEffect(() => {
    (async () => {
      console.log(country);
      const data = await fetchData(startMonth, endMonth, feature, "ALL");
      setDbData(data);
    })();
  }, [startMonth, endMonth, feature, country]);

  weightAvgData.map((item, i) => {
    item.WeightAvarage = calcWeightedAverage(item.countryid);
    checkMinMax[i] = item.WeightAvarage;
  });

  return (
    <div className="card">
      <div className="card-content">
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
          <g transform="translate(650,260) rotate(-90)">
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
            <line x1="0" y1="30" x2="0" y2="40" stroke="black" />
            <text x="0" y="50" font-size="10" text-anchor="start">
              0
            </text>
            <line x1="30" y1="30" x2="30" y2="40" stroke="black" />
            <text x="30" y="50" font-size="10" text-anchor="start">
              0.1
            </text>
            <line x1="60" y1="30" x2="60" y2="40" stroke="black" />
            <text x="60" y="50" font-size="10" text-anchor="start">
              0.2
            </text>
            <line x1="90" y1="30" x2="90" y2="40" stroke="black" />
            <text x="90" y="50" font-size="10" text-anchor="start">
              0.3
            </text>
            <line x1="120" y1="30" x2="120" y2="40" stroke="black" />
            <text x="120" y="50" font-size="10" text-anchor="start">
              0.4
            </text>
            <line x1="150" y1="30" x2="150" y2="40" stroke="black" />
            <text x="150" y="50" font-size="10" text-anchor="start">
              0.5
            </text>
            <line x1="180" y1="30" x2="180" y2="40" stroke="black" />
            <text x="180" y="50" font-size="10" text-anchor="start">
              0.6
            </text>
            <line x1="210" y1="30" x2="210" y2="40" stroke="black" />
            <text x="210" y="50" font-size="10" text-anchor="start">
              0.7
            </text>
            <line x1="240" y1="30" x2="240" y2="40" stroke="black" />
            <text x="240" y="50" font-size="10" text-anchor="start">
              0.8
            </text>
            <line x1="270" y1="30" x2="270" y2="40" stroke="black" />
            <text x="270" y="50" font-size="10" text-anchor="start">
              0.9
            </text>
            <line x1="300" y1="30" x2="300" y2="40" stroke="black" />
            <text x="300" y="50" font-size="10" text-anchor="start">
              1
            </text>
          </g>
        </svg>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <SelectFeature />
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            <SelectPeriod />
          </span>
        </p>
        <p class="card-footer-item">
          <span>色の詳細？</span>
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
