import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData } from "../api";
import { changeCountry, changeFeature } from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import "../tooltip.css";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

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

  const countries = ["AU", "CA", "DE", "FR", "JP", "NL", "GB", "US"];
  const [worldMapData, setWorldMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);

  useEffect(() => {
    let a = -Infinity;
    let b = Infinity;
    (async () => {
      /**TODO:改善 */
      const data = await Promise.all(
        countries.map(async (cId) => {
          const countryData = { countryName: cId };
          const timeData = await Promise.all(
            term.map(async (t) => {
              const data = await fetchData(t.start, t.end, feature, cId);
              //const data = [];
              const weightAve = makeData(data, cId);
              if (a < weightAve && weightAve != null) {
                a = weightAve;
              }
              if (b > weightAve && weightAve != null) {
                b = weightAve;
              }
              return { start: t.start, end: t.end, value: weightAve };
            })
          );
          countryData["timeData"] = timeData;
          return countryData;
        })
      );
      setWorldMapData(data);
      setMax(a);
      setMin(b);
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

function FeatureValue (ccountry,worldMapData){

}

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
