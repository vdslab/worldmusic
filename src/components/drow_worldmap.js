import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData, fetchHeatmapData } from "../api";
import { changeCountry, changeFeature } from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import "../tooltip.css";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

const WorldMap = ({ features }) => {
  const dispatch = useDispatch();

  const startMonth = useSelector((state) => state.detail.startMonth);
  const feature = useSelector((state) => state.detail.feature);

  const [worldMapData, setWorldMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
  let a = -Infinity;
  let b = Infinity;

  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      const data = await fetchData(feature);
      setMin(data.min);
      setMax(data.max);
      setWorldMapData(data.dbData);
      console.log(data);
    })();
  }, [feature]);

  const colorjudge = (item) => {
    let color = "white";
    worldMapData.map((data) => {
      if (data.countryName === item.properties.ISO_A2) {
        data.timeData.map((t) => {
          if (t.start === startMonth && t.value != null) {
            color = d3.interpolateTurbo(opacityjudge(t.value));
          }
        });
      }
    });
    return color;
  };

  const opacityjudge = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    opacity =
      ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    return opacity;
  };

  const width = 630;
  const height = 250;
  const centerPos = [0, 0];
  const scale = 80;

  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height - 60])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  let tooltipStyle = d3.select("body").append("div").attr("class", "tooltip");

  const featureValue = null;
  return (
    <div>
      <svg viewBox="-30 -30 770 310">
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
                tooltipStyle.style("visibility", "visible");
                tooltipStyle
                  .style("top", e.pageY - 20 + "px")
                  .style("left", e.pageX + 20 + "px")
                  .html(
                    item.properties.NAME_JA +
                      "<br>" +
                      feature +
                      ":" +
                      featureValue
                  );
              }}
              onMouseLeave={() => {
                tooltipStyle.style("visibility", "hidden");
              }}
              onClick={() => {
                tooltipStyle.style("visibility", "hidden");
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

function FeatureValue(ccountry, worldMapData) {}

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
