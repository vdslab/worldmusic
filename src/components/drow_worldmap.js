import { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData } from "../api";

const WorldMap = ({ features }) => {
  const year = "2020";
  const period = "01-06";
  const feature = "Acousticness";
  const [detail, setDetail] = useState([]);
  console.log(year, period, feature);
  useEffect(() => {
    (async () => {
      const data = await fetchData(year, period, feature);
      setDetail(data);
      console.log(detail);
      // const response = await fetch("/.netlify/functions/getData");
      // const sql = await response.json();
      // setData(sql);
    })();
  }, []);
  const margin = {
    top: 30,
    bottom: 50,
    left: 50,
    right: 100,
  };

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

  //const svgWidth = margin.left+margin.right+width;
  //const svgHeight = -margin.bottom+margin.top+height;

  //console.log(data);

  return (
    <div class="#map-container" style={{ height: "40vh" }}>
      <svg width="800" height="280" viewBox="50 50 800 280">
        <g>
          {features.map((item) => (
            <path
              d={path(item)}
              fill="white"
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
              onClick={(e) => {
                console.log(item.properties.ISO_A2);
              }}
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