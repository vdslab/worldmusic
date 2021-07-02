import { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";

const WorldMap = ({ features }) => {
  const margin = {
    top: 20,
    bottom: 75,
    left: 100,
    right: 150,
  };
  const width = 960;
  const height = 500;
  const centerPos = [0, 0];
  const scale = 100;

  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);

  const svgWidth = margin.left + margin.right + width;
  const svgHeight = margin.bottom + margin.top + height;
  const [color, setColor] = useState("white");

  return (
    <div select="#map-container">
      <svg viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}>
        <g>
          {features.map((item, i) => (
            <path
              key={i}
              d={path(item)}
              fill="white" //{Color(item)}
              stroke="black"
              strokeWidth="1"
              strokeOpacity="0.5"
              onMouseOver={(e) => {
                select(e.target).attr("stroke", "red");
              }}
              onMouseOut={(e) => {
                select(e.target).attr("stroke", "black");
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
