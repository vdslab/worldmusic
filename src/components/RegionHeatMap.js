import React from "react";
import HeatMapChart from "./draw_heatmap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
import { useEffect, useState } from "react";
import { fetchRegionHeatMapData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin, changeIsRegionShowed } from "../stores/details";

const RegionHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  //const cMin = useSelector((state) => state.detail.min);
  //const cMax = useSelector((state) => state.detail.max);
  const Max = useSelector((state) => state.detail.max);
  const Min = useSelector((state) => state.detail.min);
  //const [Max, setMax] = useState(-Infinity);
  //const [Min, setMin] = useState(Infinity);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);

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

  const regions = [
    "Asia",
    "Africa",
    "MiddleEast",
    "Oceania",
    "NorthAmerica",
    "CentralAmerica",
    "SouthAmerica",
    "NorthEurope",
    "EastEurope",
    "WestEurope",
    "SouthEurope",
  ];

  const aveWeight = {
    Asia: {},
    Africa: {},
    MiddleEast: {},
    Oceania: {},
    NorthAmerica: {},
    CentralAmerica: {},
    SouthAmerica: {},
    NorthEurope: {},
    EastEurope: {},
    WestEurope: {},
    SouthEurope: {},
  };
  const [heatMapData, setHeatMapData] = useState([]);

  let checkMin;
  let checkMax;
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    (async () => {
      let min = Infinity;
      let max = -Infinity;
      checkMin = min;
      checkMax = max;
      setShowed(false);
      dispatch(changeIsRegionShowed(false));
      for (let i = 0; i < startdays.length; i++) {
        let data = await fetchRegionHeatMapData(feature, startdays[i]);
        data.map((d) => {
          aveWeight[d.region][startdays[i]] = d.value;
          if (d.value < min) {
            min = d.value;
          }
          if (d.value > max) {
            max = d.value;
          }
        });
      }
      //setMin(min);
      //setMax(max);
      dispatch(changeMax(max));
      dispatch(changeMin(min));
      setHeatMapData(aveWeight);
      if (max != checkMax && min != checkMin) {
        checkMin = min;
        checkMax = max;
        setShowed(true);
      }
    })();
  }, [feature]);

  if (!showed) {
    return (
      <div className="card" style={{ height: "100%" }}>
        <div className="card-content p-2">
          <div className="content">
            <div className="card-content">
              <div className="content">
                <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    dispatch(changeIsRegionShowed(true));
  }
  return (
    <div className="card-content p-1" style={{ height: "100%" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="card-content m-1">
            <div className="content">
              <SelectFeature />
            </div>
          </div>
          <div
            className="card-content p-2 colorLegend"
            style={{ height: "10%" }}
          >
            <div className="content" style={{ height: "100%" }}>
              <ColorLegend
                max={Max}
                min={Min}
                color={"interpolateTurbo"}
                id={"gradient1"}
              />
            </div>
          </div>
        </div>
        <HeatMapChart
          judgeNumber={1}
          data={heatMapData}
          max={Max}
          min={Min}
          y={regions}
        />
      </div>
    </div>
  );
};

export default RegionHeatMap;
