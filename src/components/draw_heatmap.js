import { useEffect, useState } from "react";
import * as d3 from "d3";
import { fetchData, fetchHeatmapData, fetchTest } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCountry,
  changeEndMonth,
  changeStartMonth,
  changeMax,
  changeMin,
  changeDisplay,
  changeJudgeVis,
  changeFeature,
  changeChoosedPeriod,
  changeChoosedCountry,
  changeRegionId,
} from "../stores/details";
import "../tooltip.css";

function VerticalAxis({ len, yAxis, name, h, judgenumber }) {
  const dispatch = useDispatch();
  const judgeVis = useSelector((state) => state.detail.judgeVis);

  function changeInfo(country) {
    dispatch(changeChoosedCountry("Yes"));
    dispatch(changeCountry(country));
  }

  return (
    <g>
      <text
        transform={`
                translate(-80 ${h / 2})
               `}
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
              fontSize="8"
              style={{ userSelect: "none" }}
              onClick={() => {
                dispatch(changeRegionId(y));
                {
                  judgenumber === 1
                    ? dispatch(changeJudgeVis(2)) //ヒートマップ
                    : changeInfo(y);
                }
              }}
            >
              {y}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HorizontalAxis({ len, term, name, w, judgenumber }) {
  const dispatch = useDispatch();
  const judgeVis = useSelector((state) => state.detail.judgeVis);

  function changeInfo(start, end) {
    dispatch(changeStartMonth(start));
    dispatch(changeEndMonth(end));
  }

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
              onClick={() => {
                console.log(t.start + " " + t.end);
                changeInfo(t.start, t.end);
                dispatch(changeChoosedPeriod("Yes"));
                {
                  judgenumber === 1
                    ? dispatch(changeJudgeVis(1)) //世界地図
                    : console.log("国別のヒートマップではセルのみ押せる。");
                }
              }}
            >
              {t.start}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Legend({ h, w }) {
  const ticks = [...Array(11)].map((_, i) => i);
  return (
    <g transform={`translate(${w + 5},55)`}>
      {ticks.map((value, i) => {
        return (
          <g transform={`translate(0,${(h / ticks.length / 2) * i})`}>
            <rect
              width={10}
              height={h / ticks.length / 2}
              fill={d3.interpolateTurbo(1 - value / 10)}
            ></rect>
          </g>
        );
      })}
    </g>
  );
}

function Tooltip({ clientX, clientY, show, feature, value }) {
  return (
    <div>
      {show && (
        <div id="tooltip" style={{ top: `${clientY}px`, left: `${clientX}px` }}>
          {feature}:{value}
        </div>
      )}
    </div>
  );
}

function HeatMapChart(props) {
  /**startMonthとendMonth,countryは世界地図と連携づけるのに持っておく。今は未使用 */
  /**dispatch change country*/
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const display = useSelector((state) => state.detail.display);
  const judgeVis = useSelector((state) => state.detail.judgeVis);
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

  const [clicked, setClicked] = useState(-1);
  const [pos, setPos] = useState(null);
  const heatMapData = props.data;
  const Max = props.max;
  const Min = props.min;
  const yAxis = props.y;
  const judgenumber = props.judgeNumber;
  // console.log(Max, Min);
  const tooltip = d3.select(".tooltip-regionheat");

  const colorjudge = (item, start) => {
    let color = "lightgray";

    if (item) {
      color = d3.interpolateTurbo(opacityjudge(item, start));
    }
    // console.log(color);
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

  function changeInfo(start, end, countryId) {
    dispatch(changeCountry(countryId));
    dispatch(changeStartMonth(start));
    dispatch(changeEndMonth(end));
    dispatch(changeChoosedCountry("Yes"));
    dispatch(changeChoosedPeriod("Yes"));
  }

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
  /**TODO:引数渡していい感じにサイズとか調整できるようにする */
  const len = 15;

  const [show, setShow] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [featureValue, setFeatureValue] = useState(null);
  function onHover(e,value) {
    const clientX = e.pageX;
    const clientY = e.pageY - 200;
    setShow(true);
    setClientX(clientX);
    setClientY(clientY);

    if(value === undefined){
      setFeatureValue("（データなし）");
    } else {
      setFeatureValue(value.toFixed(3));
    }
    tooltip.style("visibility", "visible");
    tooltip
      .style("top", e.pageY - 20 + "px")
      .style("left", e.pageX + 10 + "px")
      .html(featureValue);
  }

  function onOut() {
    setShow(false);
    tooltip.style("visibility", "hidden");
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
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <VerticalAxis
          len={len}
          yAxis={yAxis}
          name={judgenumber === 1 ? "地域" : "国"}
          h={contentHeight}
          judgenumber={props.judgeNumber}
        />
        <HorizontalAxis
          len={len}
          term={term}
          name={"期間"}
          w={contentWidth}
          judgenumber={props.judgeNumber}
        />
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
            // .style("visibility", "hidden");
          }}
        >
          {yAxis.map((y, i) => {
            return startdays.map((s, j) => {
              const startmonth = s;
              const year = String(Number(startmonth.split("-")[0]));
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
                    onClick={() => {
                      //dispatch(changeDisplay("Yes"));
                      setClicked(i * startdays.length + j);
                      dispatch(changeRegionId(y));
                      dispatch(changeStartMonth(s));
                      dispatch(changeChoosedPeriod("Yes"));
                      dispatch(changeEndMonth(year + "-" + endmonth));
                      {
                        judgenumber === 1
                          ? dispatch(changeJudgeVis(3))//棒グラフ
                          : changeInfo(s, year + "-" + endmonth, y); //Vis２のヒートマップに必要。
                      }
                      console.log(heatMapData[y][s])
                    }}
                    onMouseEnter={() => {
                      // setPos(heatMapData[y][s].toFixed(2) || "");
                    }}
                    onMouseMove={(e) => onHover(e,heatMapData[y][s])}
                    onMouseLeave={(e) => onOut()}
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
