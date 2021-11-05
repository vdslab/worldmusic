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

  useEffect(() => {
    (async () => {
      let min = Infinity;
      let max = -Infinity;
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
