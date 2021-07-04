import { useEffect, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import * as topojson from "topojson";
import { fetchData } from "../api";
import { dispatch, rgb } from "d3";
import { changeCountry } from "../stores/details";
import { useDispatch } from "react-redux";
import React from "react";
import { changeFeature } from "../stores/details";
import { changeStartMonth, changeEndMonth } from "../stores/details";
import { useSelector } from "react-redux";
import { interpolateTurbo } from "d3-interpolate";

const WorldMap = ({ features }) => {
  const d = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchData(startMonth, endMonth, feature, country);
      setDbData(data);
    })();
  }, [startMonth, endMonth, feature, country]);
  //console.log(dbData[0][feature]);
  
  //const aveData = {}
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

  function calcWeightedAverage(country,db){
    let weightAverage = 0;
    let weightFeatureTotal = 0;
    let streamTotal = 0;

    db.map((d, i) => {
      if(d.countryid == country){
        streamTotal += d.stream
        weightFeatureTotal += d.stream*d[feature]
      }
      //console.log(db[feature]);
    })
    weightAverage = weightFeatureTotal/streamTotal;
    return weightAverage;
  }

  let weightAvgData = [
    {countryid:"AU",WeightAvarage:0},
    {countryid:"CA",WeightAvarage:0},
    {countryid:"DE",WeightAvarage:0},
    {countryid:"FR",WeightAvarage:0},
    {countryid:"JP",WeightAvarage:0},
    {countryid:"NL",WeightAvarage:0},
    {countryid:"UK",WeightAvarage:0},
    {countryid:"US",WeightAvarage:0}
  ]

  let checkMinMax = [];

  weightAvgData.map((item,i) => {
    item.WeightAvarage = calcWeightedAverage(item.countryid,dbData);
    //console.log(item.WeightAvarage);
    checkMinMax[i] = item.WeightAvarage;
  })

  const projection = d3
    .geoMercator()
    .center(centerPos)
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);
  const [year, setYear] = useState(7);

  const elements = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "mode",
    "speechiness",
    "tempo",
    "time_signature",
    "valence",
  ];

  const textAboutYear = [
    ["2017-01", "2017-06"],
    ["2017-07", "2017-12"],
    ["2018-01", "2018-06"],
    ["2018-07", "2018-12"],
    ["2019-01", "2019-06"],
    ["2019-07", "2019-12"],
    ["2020-01", "2020-06"],
    ["2020-07", "2020-12"],
  ];

  //const svgWidth = margin.left+margin.right+width;
  //const svgHeight = -margin.bottom+margin.top+height;

  //console.log(data);

  function colorjudge(weightAvgData ,item){
    let color = "white";
    weightAvgData.map((test) => {
      if(item.properties.ISO_A2 === test.countryid){
        color = d3.interpolateTurbo(opacityjudge(weightAvgData,item,checkMinMax));
        return color;
      }
    });
    return color;
  }
  
  function opacityjudge(weightAvgData,item,checkMinMax){
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    const checkMax = Math.max(...checkMinMax);
    const checkMin = Math.min(...checkMinMax);
    weightAvgData.map((test) => {
      if(item.properties.ISO_A2 === test.countryid){
        opacity = (opacityMax-opacityMin)*(test.WeightAvarage-checkMin)/(checkMax-checkMin)+opacityMin;
        console.log(item.properties.ISO_A2);
        console.log(opacity);
        return opacity;
      }
    });
    return opacity;
  }

  const color = d3.interpolateYlGn(0.5);
  return (
    <div className="#map-container" style={{ height: "40vh" }}>
      <select
        onChange={(event) => {
          d(changeFeature(event.target.value));
        }}
      >
        {elements.map((element, i) => {
          return <option>{element}</option>;
        })}
      </select>
      <input
        className="slider is-fullwidth"
        type="range"
        id="getSliderValue"
        min="0"
        max="7"
        step="1"
        value={year}
        onChange={(event) => {
          setYear(event.target.value);
          const s = textAboutYear[event.target.value][0];
          const e = textAboutYear[event.target.value][1];
          // console.log(s);
          d(changeStartMonth(s));
          d(changeEndMonth(e));
        }}
      ></input>
      <output for="sliderWithValue">
        {startMonth}〜{endMonth}
      </output>
      <svg width="800" height="280" viewBox="50 50 800 280">
        <g>
          {features.map((item) => (
            <path
              d={path(item)}
              fill={colorjudge(weightAvgData,item)}    
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
                const c = item.properties.ISO_A2;
                d(changeCountry(c));
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