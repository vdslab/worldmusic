import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData, fetchWorldMapData } from "../api";
import {
  changeCountry,
  changeFeature,
  changeDisplay,
  changeChoosedCountry,
  changeMin,
  changeMax,
} from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import "../tooltip.css";
import "../../src/style.css";

const Worldmap = ({ features, data }) => {
  const worldMapData = data;
  const [onCountryJapanese, setOnCountryJapanese] = useState(null);
  const [onCountryEnglish, setOnCountryEnglish] = useState(null);

  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const svgWidth = 600;
  const svgHeight = 400;
  const centerPos = [0, 0];
  const scale = 90;
  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([svgWidth / 2, svgHeight / 2])
    .scale(scale);
  const path = d3.geoPath().projection(projection);
  const tooltip = d3.select(".tooltip-world");

  console.log(worldMapData);
  const colorjudge = (item) => {
    let color = "#F2F2F2";
    if (worldMapData[item.properties.ISO_A2]) {
      color = "red";
    }
    return color;
  };

  return (
    <div className="content">
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          viewBox={`${-margin.left + 45} ${
            -margin.top - 55
          } ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 0px" }}
        >
          <g>
            {features.map((item, i) => (
              <path
                d={path(item)}
                fill={colorjudge(item)}
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.5"
                countryname={item}
                onMouseMove={(e) => {
                  setOnCountryJapanese(item.properties.NAME_JA);
                  setOnCountryEnglish(item.properties.ISO_A2);
                  tooltip.style("visibility", "visible");
                  tooltip
                    .style("top", e.pageY - 20 + "px")
                    .style("left", e.pageX + 10 + "px")
                    .html(onCountryJapanese + "(" + onCountryEnglish + ")");
                }}
                onMouseLeave={() => {
                  tooltip.style("visibility", "hidden");
                }}
                key={i}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export const DrowWorldMap = (props) => {
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
  return <Worldmap features={features} data={props.data} />;
};

const FeatureWorldmap = (props) => {
  return <DrowWorldMap data={props.data} />;
};

export default FeatureWorldmap;
