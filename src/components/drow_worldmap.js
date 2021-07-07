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
  const [checkMinMaxi, setCheckMinMaxi] = useState([]);

  const width = 900;
  const height = 500;
  const centerPos = [0, 0];
  const scale = 78;

  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height / 2])
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
    <div className="#map-container" style={{ height: "40vh" }}>
      <SelectFeature />
      <SelectPeriod />
      <svg width="800" height="280" viewBox="50 50 800 280">
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
