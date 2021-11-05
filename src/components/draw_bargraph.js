import { useEffect, useState } from "react";
import * as d3 from "d3";
import { fetchData, fetchHeatmapData, fetchBarData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCountry,
  changeEndMonth,
  changeStartMonth,
  changeChoosedPeriod,
  changeChoosedCountry,
  changeRegionId,
} from "../stores/details";
import "../tooltip.css";

function BarChart(props) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState({});

  const startMonth = useSelector((state) => state.detail.startMonth);
  const feature = useSelector((state) => state.detail.feature);
  const display = useSelector((state) => state.detail.display);
  const judgeVis = useSelector((state) => state.detail.judgeVis);
  const regionId = useSelector((state) => state.detail.regionId);
  // const Min = useSelector((state) => state.detail.min);
  // const Max = useSelector((state) => state.detail.max);

  const [max, setMax] = useState(-Infinity);
  const [min, setMin] = useState(Infinity);

  const [barData, setBarData] = useState([]);
  console.log(regionId);

  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      let regionMax = -Infinity;
      let regionMin = Infinity;
      const countries = {};
      const data = await fetchBarData(feature, startMonth, regionId);
      data.map((d) => {
        console.log(regionId);
        countries[d.countryid] = true;
        if (
          d[
            "SUM ( Ranking.stream * Music.acousticness ) / SUM ( Ranking.stream)"
          ] < regionMin
        ) {
          regionMin =
            d[
              "SUM ( Ranking.stream * Music.acousticness ) / SUM ( Ranking.stream)"
            ];
        }
        if (
          d[
            "SUM ( Ranking.stream * Music.acousticness ) / SUM ( Ranking.stream)"
          ] > regionMax
        ) {
          regionMax =
            d[
              "SUM ( Ranking.stream * Music.acousticness ) / SUM ( Ranking.stream)"
            ];
        }
      });
      console.log(data);
      setMax(regionMax);
      setMin(regionMin);
      setBarData(data);
      setIsChecked(countries);
    })();
  }, [feature, startMonth, regionId]);

  const colorjudge = (value) => {
    const color = d3.interpolateTurbo(opacityjudge(value));
    return color;
  };

  const opacityjudge = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    opacity =
      ((opacityMax - opacityMin) * (item - min)) / (max - min) + opacityMin;
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
    left: 50,
    right: 30,
    top: 0,
    bottom: 10,
  };
  const contentWidth = 250;
  const contentHeight = 120;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  /**TODO:引数渡していい感じにサイズとか調整できるようにする */

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

  const handleChange = (e) => {
    const cid = e.target.name;
    setIsChecked({ ...isChecked, [cid]: !isChecked[cid] });
  };

  const countup = () => {
    setCnt(cnt + 1);
  };
  let cnt = 0;
  return (
    <div
      style={{
        height: "100%",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        {barData.map((data) => {
          return (
            <label className="checkbox">
              <input
                type="checkbox"
                checked={isChecked[data.countryid]}
                name={data.countryid}
                value={isChecked[data.countryid]}
                onChange={handleChange}
              />
              {data.countryid}
            </label>
          );
        })}
      </div>
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <g>
          {(cnt = 0)}
          {barData.map((d, i) => {
            return isChecked[d.countryid] ? (
              <g>
                {(cnt += 1)}
                <rect
                  x="0"
                  y={13 * (cnt - 1)}
                  width={
                    d[
                      `SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream)`
                    ] * 500
                  }
                  height={13}
                  fill={colorjudge(
                    d[
                      `SUM ( Ranking.stream * Music.${feature} ) / SUM ( Ranking.stream)`
                    ]
                  )}
                  // stroke="black"
                ></rect>
                <text x="-50" y={13 * cnt} fontSize={13}>
                  {d.countryid}
                </text>
              </g>
            ) : (
              console.log(isChecked[d.countryid])
            );
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
}

export default BarChart;
