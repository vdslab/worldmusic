import { useEffect, useState } from "react";
import * as d3 from "d3";
import { fetchData } from "../api";
import { changeCountry, changeFeature } from "../stores/details";
import { useDispatch, useSelector } from "react-redux";
import SelectPeriod from "./selectPeriod";
import SelectFeature from "./selectFeature";

function App() {
  /**startMonthとendMonthは世界地図と連携づけるのに持っておく。今は未使用 */
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

  let weightAvgData = [
    { countryid: "AU", WeightAvarage: 0 },
    { countryid: "CA", WeightAvarage: 0 },
    { countryid: "DE", WeightAvarage: 0 },
    { countryid: "FR", WeightAvarage: 0 },
    { countryid: "JP", WeightAvarage: 0 },
    { countryid: "NL", WeightAvarage: 0 },
    { countryid: "UK", WeightAvarage: 0 },
    { countryid: "US", WeightAvarage: 0 },
  ];

  const [heatMapData, setHeatMapData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        countries.map(async (cId) => {
          const countryData = { coutry: cId };
          const timeData = await Promise.all(
            term.map(async (t) => {
              const data = await fetchData(t.start, t.end, feature, cId);
              let weightFeatureTotal = 0;
              let streamTotal = 0;
              let weightAve = -1;
              if (data.length) {
                data.map((d) => {
                  streamTotal += d.stream;
                  weightFeatureTotal += d.stream * d[feature];
                });
                weightAve = weightFeatureTotal / streamTotal;
              }
              return { start: t.start, end: t.end, value: weightAve };
            })
          );
          countryData["timeData"] = timeData;
          return countryData;
        })
      );
      setHeatMapData(data);
    })();
  }, []);

  console.log(heatMapData);

  const [dbData, setDbData] = useState([]);
  let checkMinMax = [];
  const [checkMinMaxi, setCheckMinMaxi] = useState([]);

  const calcWeightedAverage = (country) => {
    let weightFeatureTotal = 0;
    let streamTotal = 0;

    dbData.map((d) => {
      if (d.countryid == country) {
        streamTotal += d.stream;
        weightFeatureTotal += d.stream * d[feature];
      }
    });
    return weightFeatureTotal / streamTotal;
  };

  const colorjudge = (item) => {
    let color = "white";
    checkMinMax = checkMinMax.filter((value) => !isNaN(value));
    weightAvgData.map((data) => {
      if (!isNaN(data.WeightAvarage)) {
        if (item.properties.ISO_A2 === data.countryid) {
          color = d3.interpolateTurbo(opacityjudge(item));
        }
      }
    });
    return color;
  };

  const opacityjudge = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    const checkMax = Math.max(...checkMinMax);
    const checkMin = Math.min(...checkMinMax);
    weightAvgData.map((data) => {
      if (item.properties.ISO_A2 === data.countryid) {
        opacity =
          ((opacityMax - opacityMin) * (data.WeightAvarage - checkMin)) /
            (checkMax - checkMin) +
          opacityMin;
      }
    });
    return opacity;
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData(startMonth, endMonth, feature, country);
      setDbData(data);
    })();
  }, [startMonth, endMonth, feature, country]);

  weightAvgData.map((item, i) => {
    item.WeightAvarage = calcWeightedAverage(item.countryid);
    checkMinMax[i] = item.WeightAvarage;
  });

  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const contentWidth = 400;
  const contentHeight = 80;

  /*const xScale = d3
    .scaleLinear()
    .domain(d3.extent(heatData, (item, i) => i))
    .range([0, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item, j) => item[yProperty]))
    .range([contentHeight, 0])
    .nice();*/

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  //schemeCategory10 色の割り振りしてくれる便利
  const colorScale2 = d3.scaleOrdinal(d3.schemeCategory10);

  var colorScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range(["#fff8dd", "#ffc800"]);

  // データの準備
  const width = 1200; // グラフの幅
  const height = 800; // グラフの高さ
  const n = 30;
  // const m　= 20;
  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      matrix[i][j] = Math.random();
    }
  }

  const scale = d3
    .scaleBand()
    .rangeRound([0, d3.min([width, height])])
    .domain(d3.range(n));
  const color = d3
    .scaleSequential(function (t) {
      return d3.interpolate("white", "steelblue")(t);
    })
    .domain([
      0,
      d3.max(matrix, function (row) {
        return d3.max(row);
      }),
    ]);

  const len = 5;

  return (
    <div style={{ width: "700px" }}>
      <div>
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          {matrix.map((_, i) => {
            return _.map((item, j) => {
              return (
                <rect
                  x={len * j}
                  y={len * i}
                  width={len}
                  height={len}
                  fill={color(item)}
                  key={i * _.length + j}
                />
              );
            });
          })}
        </svg>
      </div>
      {/*} <div>
       
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          <Legend />
          <VerticalAxis
            scale={yScale}
            strokeColor={strokeColor}
            name={yProperty}
            len={contentWidth}
          />
          <HorizontalAxis
            scale={xScale}
            strokeColor={strokeColor}
            name={xProperty}
            len={contentHeight}
          />
         
          {data.map((item) => {
            return (
              <circle
                key={item.key}
                //cx={xScale(item[xProperty])}
                //cy={yScale(item[yProperty])}
                transform={`translate(${xScale(item[xProperty])},${yScale(
                  item[yProperty]
                )})`}
                r="5"
                fill={colorScale(item.species)}
                style={{ transitionDuration: "1s" }}
              />
            );
          })}
          
        </svg>
        </div>*/}
    </div>
  );
}

export default App;
