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
import ColorLegend from "./colorLegend";

const WorldMap = ({ features }) => {
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const cMax = useSelector((state) => state.detail.max);
  const cMin = useSelector((state) => state.detail.min);
  const display = useSelector((state) => state.detail.display);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
  const [worldMapData, setWorldMapData] = useState([]);

  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      let max = -Infinity;
      let min = Infinity;
      const weightAve = {};
      const data = await fetchWorldMapData(feature, startMonth);
      // console.log(data);
      data.map((d) => {
        weightAve[d.countryid] =
          d[
            `SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream)`
          ];
        if (max < weightAve[d.countryid]) {
          max = weightAve[d.countryid];
        }
        if (weightAve[d.countryid] < min) {
          min = weightAve[d.countryid];
        }
      });
      setWorldMapData(weightAve);
      // setMax(max);
      // setMin(min);
      if (max < cMax) {
        max = cMax;
        setMax(max);
      } else if (cMax < max) {
        setMax(max);
        dispatch(changeMax(max));
      }
      if (cMin < min) {
        min = cMin;
        setMin(min);
      } else if (min < cMin) {
        setMin(min);
        dispatch(changeMin(min));
      }
    })();
  }, [feature, startMonth]);

  const colorjudge = (item) => {
    let color = "white";
    if (worldMapData[item.properties.ISO_A2]) {
      color = d3.interpolateTurbo(
        opacityjudge(worldMapData[item.properties.ISO_A2])
      );
    }
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
  const tooltip = d3.select(".tooltip-world");

  const [featureValue, setFeatureValue] = useState(null);
  function onChange(onCountry) {
    //console.log(worldMapData[onCountry]);
    if (worldMapData[onCountry] === undefined) {
      setFeatureValue("（データなし）");
    } else {
      setFeatureValue(worldMapData[onCountry].toFixed(3));
    }
  }

  const [show, setShow] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [onCountry, setOnCountry] = useState(null);
  function onHover(e, country) {
    const clientX = e.pageX;
    const clientY = e.pageY - 200;
    setShow(true);
    setClientX(clientX);
    setClientY(clientY);
    setOnCountry(country);
  }

  function onOut() {
    setShow(false);
    setFeatureValue(null);
  }

  return (
    <div className="content">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card-content">
          <div className="content">
            {startMonth}~{endMonth}
          </div>
        </div>
        {/* <div
            className="card-content p-2 colorLegend"
            style={{ height: "10%" }}
          >
            <div className="content" style={{ height: "100%" }}>
              <ColorLegend
                max={Max}
                min={Min}
                color={"interpolateSpectral"}
                id={"gradient2"}
              />
            </div>
          </div> */}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg viewBox="-30 -30 770 325">
          <g>
            {features.map((item, i) => (
              <path
                d={path(item)}
                fill={colorjudge(item)}
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.5"
                countryname={item}
                onMouseOver={() => onChange(item.properties.ISO_A2)}
                onMouseMove={(e) => {
                  onHover(e, item.properties.NAME_JA);
                  tooltip.style("visibility", "visible");
                  tooltip
                    .style("top", e.pageY - 20 + "px")
                    .style("left", e.pageX + 10 + "px")
                    .html(onCountry + " " + featureValue);
                }}
                onMouseLeave={() => {
                  tooltip.style("visibility", "hidden");
                }}
                onMouseOut={() => onOut()}
                onClick={() => {
                  //console.log(item.properties.ISO_A2);
                  const c = item.properties.ISO_A2;
                  dispatch(changeChoosedCountry("Yes"));
                  dispatch(changeCountry(c));
                  dispatch(changeDisplay("Yes"));
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
