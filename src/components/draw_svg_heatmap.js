import { useEffect, useState } from "react";
import * as d3 from "d3";
import { fetchData } from "../api";
import { changeCountry, changeFeature } from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import SelectPeriod from "./selectPeriod";
import SelectFeature from "./selectFeature";
import HeatMap from "./HeatMap";

function App() {
  /**startMonthとendMonth,countryは世界地図と連携づけるのに持っておく。今は未使用 */
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);

  const term = [
    { start: "2017-01", end: "2017-06" },
    { start: "2017-07", end: "2017-012" },
    { start: "2018-01", end: "2018-06" },
    { start: "2018-07", end: "2018-12" },
    { start: "2019-01", end: "2019-06" },
    { start: "2019-07", end: "2019-12" },
    { start: "2020-01", end: "2020-06" },
    { start: "2020-01", end: "2020-12" },
  ];

  const countries = ["AU", "CA", "DE", "FR", "JP", "NL", "UK", "US"];

  const [heatMapData, setHeatMapData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        countries.map(async (cId) => {
          const countryData = { coutry: cId };
          const timeData = await Promise.all(
            term.map(async (t, i) => {
              /*TODO:selectで国絞れるようにする*/
              const data = await fetchData(t.start, t.end, feature, cId);
              const weightAve = makeData(data, cId);
              return { start: t.start, end: t.end, value: weightAve };
            })
          );
          console.log(timeData);
          countryData["timeData"] = timeData;
          return countryData;
        })
      );
      setHeatMapData(data);
    })();
  }, [feature]);

  function makeData(data, cId) {
    let weightFeatureTotal = 0;
    let streamTotal = 0;
    let weightAve = -1;
    if (data.length) {
      data.map((d) => {
        if (d.countryid === cId) {
          streamTotal += d.stream;
          weightFeatureTotal += d.stream * d[feature];
        }
      });
      weightAve = weightFeatureTotal / streamTotal;
    }
    return weightAve;
  }

  const colorjudge = (item, start) => {
    let color = "white";
    color = d3.interpolateTurbo(opacityjudge(item, start));
    return color;
  };

  const opacityjudge = (item, start) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    const termData = heatMapData.map((country) => {
      return country.timeData.filter((item) => item.start === start)[0].value;
    });

    const checkMax = Math.max(...termData);
    const checkMin = Math.min(...termData);

    opacity =
      ((opacityMax - opacityMin) * (item - checkMin)) / (checkMax - checkMin) +
      opacityMin;
    console.log(opacity);
    return opacity;
  };

  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const contentWidth = 400;
  const contentHeight = 80;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  /**TODO:引数渡していい感じにサイズとか調整できるようにする */
  const len = 10;

  /**TODO:軸つける */
  return (
    <div style={{ width: "700px" }}>
      <div>
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 0px" }}
        >
          {heatMapData.map((country, i) => {
            return country.timeData.map((item, j) => {
              return (
                <rect
                  x={len * j}
                  y={len * i}
                  width={len}
                  height={len}
                  fill={colorjudge(item.value, item.start)}
                  key={i * country.timeData.length + j}
                />
              );
            });
          })}
        </svg>
      </div>
    </div>
  );
}

export default App;
