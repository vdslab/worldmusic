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
  changeChoosedFeature,
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
                console.log(y);
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
                    ? dispatch(changeJudgeVis(1))
                    : console.log("国別のヒートマップではセルのみ押せる。");
                }
                //dispatch(changeJudgeVis(1)); //世界地図
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
  const Min = props.min;
  const Max = props.max;
  // console.log(Min, Max);
  const startdays = [
    "2017-01-01",
    "2017-04-01",
    "2017-07-01",
    "2017-10-01",
    "2018-01-01",
    "2018-04-01",
    "2018-07-01",
    "2018-10-01",
    "2019-01-01",
    "2019-04-01",
    "2019-07-01",
    "2019-10-01",
    "2020-01-01",
    "2020-04-01",
    "2020-07-01",
    "2020-10-01",
    "2021-01-01",
    "2021-04-01",
    "2021-07-01",
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

  const yAxis = props.y;

  const [clicked, setClicked] = useState(-1);
  const [pos, setPos] = useState(null);
  const heatMapData = props.data;
  const judgenumber = props.judgeNumber;

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
    // const termData = heatMapData
    //   .map((country) => {
    //     return country.timeData.filter((item) => item.start === start).value;
    //   })
    //   .filter((t) => t);

    opacity =
      ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    // console.log(Max - Min);
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

  function onHover(e) {
    const clientX = e.pageX;
    const clientY = e.pageY - 200;
    setShow(true);
    setClientX(clientX);
    setClientY(clientY);
  }

  function onOut() {
    setShow(false);
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
                      // console.log(
                      //   d.countryName + " " + item.start + " " + item.end
                      // );
                      {
                        judgenumber === 1
                          ? dispatch(changeJudgeVis(3))
                          : changeInfo(s, year + "-" + endmonth, y); //Vis２のヒートマップに必要。
                      }
                      //dispatch(changeJudgeVis(3)); //棒グラフ
                    }}
                    onMouseEnter={() => {
                      // setPos(heatMapData[y][s].toFixed(2) || "");
                    }}
                    onMouseMove={(e) => onHover(e)}
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

          {/* {heatMapData.map((d, i) => {
            return d.timeData.map((item, j) => {
              return (
                <g key={i * d.timeData.length + j}>
                  <rect
                    className="cell"
                    x={len * j}
                    y={len * i}
                    width={len}
                    height={len}
                    fill={colorjudge(item.value, item.start)}
                    onClick={() => {
                      //dispatch(changeDisplay("Yes"));
                      setClicked(i * d.timeData.length + j);
                      console.log(
                        d.countryName + " " + item.start + " " + item.end
                      );
                      {
                        judgenumber === 1
                          ? dispatch(changeJudgeVis(3))
                          : changeInfo(item.start, item.end, d.countryName); //Vis２のヒートマップに必要。
                      }
                      //dispatch(changeJudgeVis(3)); //棒グラフ
                    }}
                    onMouseEnter={() => {
                      setPos(item.value?.toFixed(2) || "");
                    }}
                    onMouseMove={(e) => onHover(e)}
                    onMouseLeave={(e) => onOut()}
                  />
                  <rect
                    x={len * j}
                    y={len * i}
                    width={len - 0.5}
                    height={len - 0.5}
                    fill="none"
                    stroke="black"
                    opacity={clicked === i * d.timeData.length + j ? 1 : 0}
                  />
                </g>
              );
            });
          })} */}
        </g>
      </svg>
      {/* <Tooltip
        clientX={clientX}
        clientY={clientY}
        show={show}
        feature={feature}
        value={pos}
      /> */}
    </div>
  );
}

export default HeatMapChart;
