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
} from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import "../tooltip.css";
import "../../src/style.css";

const WorldMap = ({ features }) => {
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const feature = useSelector((state) => state.detail.feature);
  const display = useSelector((state) => state.detail.display);
  const Min = useSelector((state) => state.detail.min);
  const Max = useSelector((state) => state.detail.max);

  const [worldMapData, setWorldMapData] = useState([]);

  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      const weightAve = {};
      const data = await fetchWorldMapData(feature, startMonth);
      // console.log(data);
      data.map((d) => {
        weightAve[d.countryid] =
          d[
            `SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream)`
          ];
      });
      setWorldMapData(weightAve);
      console.log(weightAve);
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

  const [featureValue, setFeatureValue] = useState(null);
  function onChange(onCountry) {
    //console.log(worldMapData[onCountry]);
    setFeatureValue(worldMapData[onCountry]);
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
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div className="heightMax" style={{ display: "flex" }}> */}
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
              onMouseOver={() => onChange(item.properties.ISO_A2)}
              onMouseMove={(e) => onHover(e, item.properties.NAME_JA)}
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
      <Tooltip
        clientX={clientX}
        clientY={clientY}
        show={show}
        country={onCountry}
        feature={feature}
        value={featureValue}
      />
    </div>
  );
};

function Tooltip({ clientX, clientY, show, country, feature, value }) {
  return (
    <div>
      {show && (
        <div id="tooltip" style={{ top: `${clientY}px`, left: `${clientX}px` }}>
          {country}
          <br />
          {feature}:{value}
        </div>
      )}
    </div>
  );
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
