import React from "react";
import HeatMapChart from "./draw_regionHeatmap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
import { useEffect, useState } from "react";
import { fetchRegionHeatMapData, fetchgetHeatMapMinMax } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin, changeIsRegionShowed } from "../stores/details";

const RegionHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const Max = useSelector((state) => state.detail.max);
  const Min = useSelector((state) => state.detail.min);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed); //地域ヒートマップが表示されているか否か

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

  const countriesAveWeight = {};
  const [heatMapData, setHeatMapData] = useState([]);

  let checkMin;
  let checkMax;
  const [showed, setShowed] = useState(false); //地域ヒートマップを表示していいか否か

  useEffect(() => {
    (async () => {
      // fuga tuiki
      // const data = await Promise.all(
      //   startdays.map((s) => fetchRegionHeatMapData(feature, s))
      // );
      // console.log("data", data);
      // const a = data.reduce((acc, cur) => {
      //   acc.push(...cur.map((c) => c.value));
      //   return acc;
      // }, []);
      // const max = Math.max(...a);
      // const min = Math.min(...a);

      const maxdata = await fetchgetHeatMapMinMax(feature, "startdays[i]");
      console.log("minmax", maxdata);

      let min = Infinity;
      let max = -Infinity;
      checkMin = min; //minが変更されたかをチェックする変数
      checkMax = max; //maxが変更されたかをチェックする変数
      setShowed(false); //データが揃ってから見せる
      dispatch(changeIsRegionShowed(false)); //データが揃ってから見せる
      for (let i = 0; i < startdays.length; i++) {
        //最大値・最小値を取得するために、まず３ヶ月ごとで各国のデータを取得する
        let minmaxdata = await fetchgetHeatMapMinMax(feature, startdays[i]);
        console.log("minmaxdata", minmaxdata);
        minmaxdata.map((d) => {
          // if (!countriesAveWeight[d.countryid]) {
          //   countriesAveWeight[d.countryid] = {};
          // }
          // countriesAveWeight[d.countryid][startdays[i]] = d.value;
          if (d.value < min) {
            min = d.value;
          }
          if (d.value > max) {
            max = d.value;
          }
        });
        //地域ごとのデータを取得する
        let data = await fetchRegionHeatMapData(feature, startdays[i]);
        console.log("region", data);
        data.map((d) => {
          aveWeight[d.region][startdays[i]] = d.value;
        });
      }
      //minとmaxが変更されたので、セットする（データも）
      dispatch(changeMax(max));
      dispatch(changeMin(min));
      setHeatMapData(aveWeight);
      //チェック用変数と値が異なれば（＝最大値最小値の準備おk）、地域ヒートマップを表示する
      if (max != checkMax && min != checkMin) {
        checkMin = min;
        checkMax = max;
        setShowed(true);
      }
    })();
  }, [feature]);

  // useEffect(() => {
  //   (async () => {
  //     let min = Infinity;
  //     let max = -Infinity;
  //     checkMin = min; //minが変更されたかをチェックする変数
  //     checkMax = max; //maxが変更されたかをチェックする変数
  //     setShowed(false); //データが揃ってから見せる
  //     dispatch(changeIsRegionShowed(false)); //データが揃ってから見せる
  //     for (let i = 0; i < startdays.length; i++) {
  //       //最大値・最小値を取得するために、まず３ヶ月ごとで各国のデータを取得する
  //       let minmaxdata = await fetchgetHeatMapMinMax(feature, startdays[i]);
  //       minmaxdata.map((d) => {
  //         if (!countriesAveWeight[d.countryid]) {
  //           countriesAveWeight[d.countryid] = {};
  //         }
  //         countriesAveWeight[d.countryid][startdays[i]] = d.value;
  //         if (d.value < min) {
  //           min = d.value;
  //         }
  //         if (d.value > max) {
  //           max = d.value;
  //         }
  //       });
  //       //地域ごとのデータを取得する
  //       let data = await fetchRegionHeatMapData(feature, startdays[i]);
  //       data.map((d) => {
  //         aveWeight[d.region][startdays[i]] = d.value;
  //       });
  //     }
  //     //minとmaxが変更されたので、セットする（データも）
  //     dispatch(changeMax(max));
  //     dispatch(changeMin(min));
  //     setHeatMapData(aveWeight);
  //     //チェック用変数と値が異なれば（＝最大値最小値の準備おk）、地域ヒートマップを表示する
  //     if (max != checkMax && min != checkMin) {
  //       checkMin = min;
  //       checkMax = max;
  //       setShowed(true);
  //     }
  //   })();
  // }, [feature]);

  if (!showed) {
    return (
      <div className="card-content">
        <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
        <p style={{ fontSize: "1.25rem" }}>
          （データ取得に約1分ほど時間がかかります。）
        </p>
      </div>
    );
  } else {
    //地域ヒートマップを表示している扱いにする
    dispatch(changeIsRegionShowed(true));
  }
  return (
    <div className="card-content p-1" style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card-content m-1">
          <div className="content">
            <SelectFeature />
          </div>
        </div>
        <div className="card-content p-2 colorLegend" style={{ height: "10%" }}>
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
      <HeatMapChart data={heatMapData} max={Max} min={Min} y={regions} />
    </div>
  );
};

export default RegionHeatMap;
