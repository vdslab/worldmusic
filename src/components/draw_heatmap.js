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
} from "../stores/details";
import "../tooltip.css";

function VerticalAxis({ len, countries, name, h }) {
  return (
    <g>
      <text
        transform={`
                translate(-30 ${h / 2})
               `}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        style={{ userSelect: "none" }}
      >
        {name}
      </text>
      {countries.map((country, i) => {
        return (
          <g transform={`translate(0, ${len * i + len / 2})`} key={i}>
            <text
              x="-5"
              textAnchor="end"
              dominantBaseline="central"
              fontSize="8"
              style={{ userSelect: "none" }}
            >
              {country}
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

function HeatMapChart() {
  /**startMonthとendMonth,countryは世界地図と連携づけるのに持っておく。今は未使用 */
  /**dispatch change country*/
  const dispatch = useDispatch();

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);

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
  ];

  const countries = ["AU", "CA", "DE", "FR", "JP", "NL", "GB", "US"];
  const [heatMapData, setHeatMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
  const [clicked, setClicked] = useState(-1);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      const data = await fetchData(feature);
      setMin(data.min);
      setMax(data.max);
      setHeatMapData(data.dbData);
      dispatch(changeMax(data.max));
      dispatch(changeMin(data.min));
      console.log(data);
    })();
  }, [feature]);

  const colorjudge = (item, start) => {
    let color = "lightgray";
    if (item !== null) {
      color = d3.interpolateTurbo(opacityjudge(item, start));
    }
    return color;
  };

  const opacityjudge = (item, start) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    const termData = heatMapData
      .map((country) => {
        return country.timeData.filter((item) => item.start === start).value;
      })
      .filter((t) => t);

    opacity =
      ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    return opacity;
  };

  function changeInfo(start, end, countryCd) {
    dispatch(changeCountry(countryCd));
    dispatch(changeStartMonth(start));
    dispatch(changeEndMonth(end));
  }

  const margin = {
    left: 50,
    right: 30,
    top: 45,
    bottom: 10,
  };
  const contentWidth = 250;
  const contentHeight = 130;

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
          countries={countries}
          name={"国"}
          h={contentHeight}
        />
        <HorizontalAxis len={len} term={term} name={"期間"} w={contentWidth} />
        <rect
          x="0"
          y="0"
          fill="lightgray"
          height={len * countries.length}
          width={len * term.length}
        />

        <g
          onMouseLeave={() => {
            setPos(null);
            // .style("visibility", "hidden");
          }}
        >
          {heatMapData.map((country, i) => {
            return country.timeData.map((item, j) => {
              return (
                <g key={i * country.timeData.length + j}>
                  <rect
                    className="cell"
                    x={len * j}
                    y={len * i}
                    width={len}
                    height={len}
                    fill={colorjudge(item.value, item.start)}
                    onClick={() => {
                      changeInfo(item.start, item.end, country.countryName);
                      setClicked(i * country.timeData.length + j);
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
                    opacity={
                      clicked === i * country.timeData.length + j ? 1 : 0
                    }
                  />
                </g>
              );
            });
          })}
        </g>
      </svg>
      <Tooltip
        clientX={clientX}
        clientY={clientY}
        show={show}
        feature={feature}
        value={pos}
      />
    </div>
  );
}

export default HeatMapChart;
