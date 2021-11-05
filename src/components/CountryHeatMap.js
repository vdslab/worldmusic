import React from "react";
import HeatMapChart from "./draw_heatmap";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin } from "../stores/details";

const CountryHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const regionId = useSelector((state) => state.detail.regionId);
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

  // const aveWeight = {
  //   HK: {},
  //   ID: {},
  //   IN: {},
  //   JP: {},
  //   KR: {},
  //   MY: {},
  //   PH: {},
  //   SG: {},
  //   TH: {},
  //   TW: {},
  //   VN: {},
  // };
  useEffect(() => {
    (async () => {
      console.log(regionId);
      let min = Infinity;
      let max = -Infinity;
      const aveWeight = {};
      for (let i = 0; i < startdays.length; i++) {
        //startdayを渡す用
        let data = await fetchData(feature, startdays[i], regionId);
        console.log(data);
        data.map((d, i) => {
          if (!aveWeight[d.countryid]) {
            aveWeight[d.countryid] = {};
          }
          console.log(startdays[i]);
          // aveWeight[d.countryid][startdays[i]] = {};
          if (d.value < min) {
            min = d.value;
          }
          if (d.value > max) {
            max = d.value;
          }
        });
        // console.log(startdays[i]);
      }
      console.log(aveWeight);
      // console.log(data);
      // setMin(data.min);
      // setMax(data.max);
      // setHeatMapData(data.dbData);
      // dispatch(changeMax(data.max));
      // dispatch(changeMin(data.min));
      //console.log(data);
    })();
  }, [feature, regionId]);
  const countries = ["JP", "US"];
  return (
    <div className="card-content p-1">
      <div className="content">
        チェックボックスの出現 （チェック押してからヒートマップの出現）
        <HeatMapChart
          judgeNumber={2}
          data={heatMapData}
          max={Max}
          min={Min}
          y={countries}
        />
      </div>
    </div>
  );
};

export default CountryHeatMap;
