import { useEffect, useState } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import {
  changeJudgeVis,
  changeRegionId,
  changeCheckRegionClicked,
} from "../stores/details";
import "../tooltip.css";

function VerticalAxis({ len, yAxis, name, h }) {
  const dispatch = useDispatch();
  const checkRegionCheck = useSelector(
    (state) => state.detail.checkRegionClicked
  );
  const [isRegionOver, setIsRegionOver] = useState({
    Asia: false,
    Africa: false,
    MiddleEast: false,
    Oceania: false,
    NorthAmerica: false,
    CentralAmerica: false,
    SouthAmerica: false,
    NorthEurope: false,
    EastEurope: false,
    WestEurope: false,
    SouthEurope: false,
  });
  return (
    <g>
      <text
        transform={`
                translate(-65 ${h / 2})
               `}
        x="-15"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      {yAxis.map((y, i) => {
        return (
          <g transform={`translate(0, ${len * i + len / 2})`} key={i}>
            <text
              x="-5"
              textAnchor="end"
              dominantBaseline="central"
              onClick={() => {
                dispatch(
                  changeCheckRegionClicked(
                    checkRegionCheck.map((c, index) =>
                      index === i ? true : false
                    )
                  )
                );
                dispatch(changeRegionId(y[0]));
                dispatch(changeJudgeVis(2)); //国ヒートマップ
              }}
              onMouseLeave={() => {
                setIsRegionOver({
                  ...isRegionOver,
                  [y[0]]: false,
                });
              }}
              onMouseOver={() => {
                // console.log(isRegionOver);
                setIsRegionOver({
                  ...isRegionOver,
                  [y[0]]: true,
                });
                console.log(isRegionOver[y[0]]);
                // console.log(isRegionOver);
              }}
              style={
                checkRegionCheck[i]
                  ? {
                      userSelect: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      textDecoration: "overline",
                    }
                  : { userSelect: "none", cursor: "pointer", fontSize: "8px" }
              }
              fill={isRegionOver[y[0]] ? "black" : "#FF9872"}
            >
              {y[1]}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HorizontalAxis({ len, term, name, w }) {
  return (
    <g>
      <text
        transform={`translate(${w / 2} -40)`}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      {term.map((t, i) => {
        return (
          <g transform={`translate(${len * i + len}, -15) rotate(-45)`} key={i}>
            <text
              x="0"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="8"
              style={{ userSelect: "none" }}
            >
              {t.start}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HeatMapChart(props) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(-1);
  const [pos, setPos] = useState(null);

  const heatMapData = props.data;
  const Max = props.max;
  const Min = props.min;
  const yAxis = props.y;

  const startdays = [
    "2017-01",
    "2017-04",
    "2017-07",
    "2017-10",
    "2018-01",
    "2018-04",
    "2018-07",
    "2018-10",
    "2019-01",
    "2019-04",
    "2019-07",
    "2019-10",
    "2020-01",
    "2020-04",
    "2020-07",
    "2020-10",
    "2021-01",
    "2021-04",
    "2021-07",
  ];

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
    { start: "2021-01", end: "2021-03" },
    { start: "2021-04", end: "2021-06" },
    { start: "2021-07", end: "2021-09" },
  ];

  const japaneseRegions = [
    ["Asia", "アジア"],
    ["Africa", "アフリカ"],
    ["MiddleEast", "中東"],
    ["Oceania", "オセアニア"],
    ["NorthAmerica", "北米"],
    ["CentralAmerica", "中米"],
    ["SouthAmerica", "南米"],
    ["NorthEurope", "北欧"],
    ["EastEurope", "東欧"],
    ["WestEurope", "西欧"],
    ["SouthEurope", "南欧"],
  ];

  const margin = {
    left: 100,
    right: 30,
    top: 45,
    bottom: 10,
  };
  const contentWidth = 300;
  const contentHeight = 170;
  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  const tooltip = d3.select(".tooltip-regionheat");
  const [featureValue, setFeatureValue] = useState(null);
  const len = 15;

  const colorjudge = (item, start) => {
    let color = "#F2F2F2";
    if (item === 0) {
      color = d3.interpolateTurbo(0);
    }
    if (item) {
      color = d3.interpolateTurbo(opacityjudge(item, start));
    }
    return color;
  };

  const opacityjudge = (item, start) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    opacity =
      ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    return opacity;
  };

  function onHover(e, value) {
    if (value === undefined) {
      setFeatureValue("（データなし）");
    } else {
      setFeatureValue(Number(value).toFixed(3));
    }
    tooltip.style("visibility", "visible");
    tooltip
      .style("top", e.pageY - 20 + "px")
      .style("left", e.pageX + 10 + "px")
      .html(featureValue);
  }

  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <VerticalAxis
          len={len}
          yAxis={japaneseRegions}
          name={"地域"}
          h={contentHeight}
        />
        <HorizontalAxis len={len} term={term} name={"期間"} w={contentWidth} />
        <rect
          x="0"
          y="0"
          fill="lightgray"
          height={len * yAxis.length}
          width={len * startdays.length}
        />

        <g
          onMouseLeave={() => {
            setPos(null);
          }}
        >
          {yAxis.map((y, i) => {
            return startdays.map((s, j) => {
              const startmonth = s;
              let endmonth = String(Number(startmonth.split("-")[1]) + 2);
              if (endmonth.length === 1) {
                endmonth = "0" + endmonth;
              }

              return (
                <g key={i * startdays.length + j}>
                  <rect
                    className="cell"
                    x={len * j}
                    y={len * i}
                    width={len}
                    height={len}
                    fill={colorjudge(heatMapData[y][s], s)}
                    onMouseMove={(e) => onHover(e, heatMapData[y][s])}
                    onMouseLeave={() => {
                      tooltip.style("visibility", "hidden");
                    }}
                  ></rect>
                  <rect
                    x={len * j}
                    y={len * i}
                    width={len - 0.5}
                    height={len - 0.5}
                    fill="none"
                    stroke="black"
                    opacity={clicked === i * startdays.length + j ? 1 : 0}
                  />
                </g>
              );
            });
          })}
        </g>
      </svg>
    </div>
  );
}

export default HeatMapChart;
