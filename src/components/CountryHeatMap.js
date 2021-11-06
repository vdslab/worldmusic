import React from "react";
import HeatMapChart from "./draw_heatmap";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin } from "../stores/details";

function VerticalAxis({ len, yAxis, name, h }) {
  const dispatch = useDispatch();
  const judgeVis = useSelector((state) => state.detail.judgeVis);

  function changeInfo(country) {
    dispatch(changeChoosedCountry("Yes"));
    dispatch(changeCountry(country));
  }
  console.log(yAxis);

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
                {
                  dispatch(changeRegionId(y));

                  changeInfo(y);
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

function HorizontalAxis({ len, term, name, w }) {
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

const CountryHeatMap = () => {
  let countries = [];
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const regionId = useSelector((state) => state.detail.regionId);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const display = useSelector((state) => state.detail.display);
  const judgeVis = useSelector((state) => state.detail.judgeVis);
  const [heatMapData, setHeatMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
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

  const [clicked, setClicked] = useState(-1);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    (async () => {
      console.log(regionId);
      let min = Infinity;
      let max = -Infinity;
      const aveWeight = {};
      for (let i = 0; i < startdays.length; i++) {
        //startdayを渡す用
        let data = await fetchData(feature, startdays[i], regionId);
        data.map((d, j) => {
          if (!aveWeight[d.countryid]) {
            countries.push(d.countryid);
            aveWeight[d.countryid] = {};
          }

          aveWeight[d.countryid][startdays[i]] = d.value;
          if (d.value < min) {
            min = d.value;
          }
          if (d.value > max) {
            max = d.value;
          }
        });
      }
      console.log(countries);
      setMin(Min);
      setMax(Max);
      setHeatMapData(aveWeight);
      // dispatch(changeMax(data.max));
      // dispatch(changeMin(data.min));
      //console.log(data);
    })();
  }, [feature, regionId]);

  const colorjudge = (item, start) => {
    let color = "lightgray";

    if (item) {
      color = d3.interpolatePiYG(opacityjudge(item, start));
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
        <VerticalAxis len={len} yAxis={countries} h={contentHeight} />
        <HorizontalAxis len={len} term={term} name={"期間"} w={contentWidth} />
        <rect
          x="0"
          y="0"
          fill="lightgray"
          height={len * countries.length}
          width={len * startdays.length}
        />

        <g
          onMouseLeave={() => {
            setPos(null);
            // .style("visibility", "hidden");
          }}
        >
          {countries.map((y, i) => {
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
                    // fill={colorjudge(heatMapData[y][s], s)}
                    onClick={() => {
                      //dispatch(changeDisplay("Yes"));
                      setClicked(i * startdays.length + j);
                      dispatch(changeRegionId(y));
                      dispatch(changeStartMonth(s));
                      {
                        changeInfo(s, year + "-" + endmonth, y); //Vis２のヒートマップに必要。
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
};

export default CountryHeatMap;
