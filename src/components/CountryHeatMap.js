import React from "react";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStartMonth,
  changeEndMonth,
  changeCountry,
  changeChoosedCountry,
  changeChoosedPeriod,
  changeIsSwmpltShowed,
  changeSlectedCount,
} from "../stores/details";

function VerticalAxis({ len, yAxis, name, h }) {
  const dispatch = useDispatch();

  return (
    <g>
      <text
        transform={`
                translate(-60, ${(len * yAxis.length) / 2})
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
              // onClick={() => {
              //   dispatch(changeChoosedCountry("Yes"));
              //   dispatch(changeCountry(y));
              // }}
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
                dispatch(changeChoosedPeriod("Yes"));
                dispatch(changeStartMonth(t.start));
                dispatch(changeEndMonth(t.end));
              }}
            >
              <a>{t.start}</a>
            </text>
          </g>
        );
      })}
    </g>
  );
}

const CountryHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const regionId = useSelector((state) => state.detail.regionId);

  const countryids = useSelector((state) => state.detail.country);
  const period = useSelector((state) => state.detail.startMonth);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);
  const isSwmpltShowed = useSelector((state) => state.detail.isSwmpltShowed);
  const Max = useSelector((state) => state.detail.max);
  const Min = useSelector((state) => state.detail.min);
  const selectedCount = useSelector((state) => state.detail.selectedCount);

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

  const margin = {
    left: 100,
    right: 30,
    top: 10,
    bottom: 10,
  };
  const contentWidth = 300;
  const contentHeight = 170;
  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  const tooltip = d3.select(".tooltip-countryheat");
  const [featureValue, setFeatureValue] = useState(null);
  const len = 15;

  const [heatMapData, setHeatMapData] = useState([]);
  const [countries, setCountries] = useState([]);

  let checkMin;
  let checkMax;
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    (async () => {
      let country = [];
      let min = Min;
      let max = Max;
      checkMin = Infinity;
      checkMax = -Infinity;
      setShowed(false);
      const aveWeight = {};
      for (let i = 0; i < startdays.length; i++) {
        let data = await fetchData(feature, startdays[i], regionId);
        data.map((d, j) => {
          if (!aveWeight[d.countryid]) {
            country.push(d.countryid);
            aveWeight[d.countryid] = {};
          }

          aveWeight[d.countryid][startdays[i]] = d.value;
        });
      }
      setCountries(country);
      setHeatMapData(aveWeight);
      if (max != checkMax && min != checkMin) {
        checkMin = min;
        checkMax = max;
        setShowed(true);
      }
    })();
  }, [feature, regionId]);

  const colorjudge = (item, start) => {
    let color = "#F2F2F2";

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
      setFeatureValue(value.toFixed(3));
    }
    tooltip.style("visibility", "visible");
    tooltip
      .style("top", e.pageY - 20 + "px")
      .style("left", e.pageX + 10 + "px")
      .html(featureValue);
  }

  function addData(country, startmonth, judge) {
    let selectedCountry = [...countryids];
    let selectedStartmonth = [...period];
    let selectedSwmplt = [...isSwmpltShowed];
    let isdouble = false; //もう選ばれているかどうかを判定する用

    if (selectedCountry.length === 0) {
      selectedCountry.push(country);
      selectedStartmonth.push(startmonth);
      selectedSwmplt.push(judge);
      dispatch(changeCountry(selectedCountry));
      dispatch(changeStartMonth(selectedStartmonth));
      dispatch(changeIsSwmpltShowed(selectedSwmplt));
    } else if (selectedCountry.length != 0) {
      selectedCountry.map((element, i) => {
        if (element === country && selectedStartmonth[i] === startmonth) {
          isdouble = true;
        }
      });
      if (!isdouble) {
        selectedCountry.push(country);
        selectedStartmonth.push(startmonth);
        selectedSwmplt.push(judge);
        dispatch(changeCountry(selectedCountry));
        dispatch(changeStartMonth(selectedStartmonth));
        dispatch(changeIsSwmpltShowed(selectedSwmplt));
      }
    }
  }

  if (!showed || !isRegionShowed) {
    return (
      <div className="card-content">
        <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
      </div>
    );
  }
  return (
    <div className="card-content p-1" style={{ width: "100%" }}>
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
            yAxis={countries}
            name={"国"}
            h={contentHeight}
          />
          {/* <HorizontalAxis len={len} term={term} name={"期間"} w={contentWidth} /> */}
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
                if (endmonth.length === 1) {
                  endmonth = "0" + endmonth;
                }
                if (heatMapData[y][s] === undefined) {
                  return (
                    <g key={i * startdays.length + j}>
                      <rect
                        className="cell"
                        x={len * j}
                        y={len * i}
                        width={len}
                        height={len}
                        fill={colorjudge(heatMapData[y][s], s)}
                        style={{ cursor: "default" }}
                        onMouseMove={(e) => onHover(e, heatMapData[y][s])}
                        onMouseLeave={() => {
                          tooltip.style("visibility", "hidden");
                        }}
                      ></rect>
                    </g>
                  );
                } else if (period.length === 3) {
                  return (
                    <g key={i * startdays.length + j}>
                      <rect
                        className="cell"
                        x={len * j}
                        y={len * i}
                        width={len}
                        height={len}
                        fill={colorjudge(heatMapData[y][s], s)}
                        style={{ cursor: "default" }}
                        onMouseMove={(e) => onHover(e, heatMapData[y][s])}
                        onMouseLeave={() => {
                          tooltip.style("visibility", "hidden");
                        }}
                        onClick={() => {
                          dispatch(changeSlectedCount(false));
                          console.log("selectedCount false");
                        }}
                      ></rect>
                    </g>
                  );
                } else {
                  return (
                    <g key={i * startdays.length + j}>
                      <rect
                        className="cell"
                        x={len * j}
                        y={len * i}
                        width={len}
                        height={len}
                        fill={colorjudge(heatMapData[y][s], s)}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClicked(i * startdays.length + j);
                          // 国ヒートマップは期間と国の変更＋初めて期間と国が押された判定が必要。
                          addData(y, s, true);

                          dispatch(changeEndMonth(year + "-" + endmonth));
                          dispatch(changeChoosedCountry("Yes"));
                          dispatch(changeChoosedPeriod("Yes"));
                        }}
                        onMouseEnter={() => {
                          // setPos(heatMapData[y][s].toFixed(2) || "");
                        }}
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
                }
              });
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CountryHeatMap;
