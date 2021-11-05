import React from "react";
import HeatMapChart from "./draw_heatmap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
import { useEffect, useState } from "react";
import { fetchRegionHeatMapData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin } from "../stores/details";
//import { changeMax, changeMin } from "../stores/details";

const RegionHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
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

  let checkMin;
  let checkMax;
  const [showed, setShowed] = useState("No");
  useEffect(() => {
    (async () => {
      let min = Infinity;
      let max = -Infinity;
      checkMin = min;
      checkMax = max;
      setShowed("No");
      for (let i = 0; i < startdays.length; i++) {
        //startdayを渡す用
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
      if(max != checkMax && min != checkMin){
        checkMin = min;
        checkMax = max;
        setShowed("Yes");
      }
      setMin(min);
      setMax(max);
    })();
    // console.log(Min, Max);
    setHeatMapData(aveWeight);
  }, [feature]);

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

  // ToDo：後で地域を日本語にすること
  // const regions = [
  //   "アジア",
  //   "アフリカ",
  //   "中東",
  //   "オセアニア",
  //   "北米",
  //   "中米",
  //   "南米",
  //   "北欧",
  //   "東欧",
  //   "西欧",
  //   "南欧",
  // ];

  //if (Max === -Infinity || Min === Infinity) {
  if(showed === "No"){
    //ToDo：特徴を変えた時も取得中になるようにすること
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
  }
  return (
    <div className="card-content p-1">
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
                color={"interpolatePiYG"}
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
