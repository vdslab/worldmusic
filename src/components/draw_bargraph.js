import { useEffect, useState } from "react";
import * as d3 from "d3";
import { fetchBarData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCountry,
  changeChoosedPeriod,
  changeChoosedCountry,
} from "../stores/details";
import "../tooltip.css";

function BarChart(props) {
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const feature = useSelector((state) => state.detail.feature);
  const regionId = useSelector((state) => state.detail.regionId);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);

  const [isChecked, setIsChecked] = useState({});
  const [max, setMax] = useState(-Infinity);
  const [min, setMin] = useState(Infinity);
  const [barData, setBarData] = useState([]);

  let cnt = 0;
  const [controlWidth, setControlWidth] = useState(500); //棒グラフの横幅を全体的に揃えるために掛ける数
  const margin = {
    left: 50,
    right: 30,
    top: 0,
    bottom: 30,
  };
  const contentWidth = 250;
  const contentHeight = 120;
  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  const tooltip = d3.select(".tooltip-bar");
  const [featureValue, setFeatureValue] = useState(null);

  useEffect(() => {
    (async () => {
      let regionMax = -Infinity;
      let regionMin = Infinity;
      const countries = {};
      const data = await fetchBarData(feature, startMonth, regionId);
      data.map((d) => {
        countries[d.countryid] = true;
        if (d.value < regionMin) {
          regionMin = d.value;
        }
        if (d.value > regionMax) {
          regionMax = d.value;
        }
      });
      setMax(regionMax);
      setMin(regionMin);
      setBarData(data);
      setIsChecked(countries);

      //今のところそれぞれ掛けて100以上になるようにしている状態
      if (feature === "danceability") {
        setControlWidth(200);
      } else if (feature === "energy" || feature === "valence") {
        setControlWidth(300);
      } else if (feature === "instrumentalness") {
        setControlWidth(10000);
      } else if (feature === "liveness" || feature === "speechiness") {
        setControlWidth(1000);
      } else if (feature === "loudness") {
        setControlWidth(-20);
      } else if (feature === "tempo") {
        setControlWidth(1);
      } else if (feature === "time_signature") {
        setControlWidth(50);
      }else if (feature === "acousticness") {
        setControlWidth(500);
      }
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

  function onHover(e, value) {
    const clientX = e.pageX;
    const clientY = e.pageY - 200;
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

  const handleChange = (e) => {
    const cid = e.target.name;
    setIsChecked({ ...isChecked, [cid]: !isChecked[cid] });
  };

  if (!isRegionShowed) {
    return (
      <div className="card-content p-2">
        <div className="content">
          <div className="card-content">
            <div className="content">
              <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card-content m-1">
          <div className="content">
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
          </div>
        </div>
      </div>
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <g>
          {(cnt = 0)}
          {barData.map((d, i) => {
            console.log(d.value * controlWidth);
            return isChecked[d.countryid] ? (
              <g>
                {(cnt += 1)}
                <rect
                  x="0"
                  y={13 * (cnt - 1)}
                  width={d.value * controlWidth}
                  height={13}
                  fill={colorjudge(d.value)}
                  onMouseMove={(e) => {
                    onHover(e, d.value);
                  }}
                  onMouseLeave={() => {
                    tooltip.style("visibility", "hidden");
                  }}
                  onClick={() => {
                    dispatch(changeCountry(d.countryid));
                    dispatch(changeChoosedPeriod("Yes"));
                    dispatch(changeChoosedCountry("Yes"));
                  }}
                ></rect>
                <text
                  x="-10"
                  y={13 * cnt - 5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="6"
                  style={{ userSelect: "none" }}
                  onClick={() => {
                    dispatch(changeCountry(d.countryid));
                    dispatch(changeChoosedCountry("Yes"));
                  }}
                >
                  <a>{d.countryid}</a>
                </text>
              </g>
            ) : (
              console.log(isChecked[d.countryid])
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default BarChart;
