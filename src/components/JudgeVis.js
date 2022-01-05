import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCountry,
  changeEndMonth,
  changeStartMonth,
  changeMax,
  changeMin,
  changeDisplay,
  changeJudgeVis,
} from "../stores/details";
import WorldMap from "./WorldMap";
import CountryHeatMap from "./CountryHeatMap";
import Bargraph from "./Bargraph";

const JudgeVis = () => {
  const judgeVis = useSelector((state) => state.detail.judgeVis);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);

  if (
    (judgeVis === 0 && !isRegionShowed) ||
    (judgeVis === 0 && isRegionShowed)
  ) {
    //何も押されていない場合
    return (
      <div className="card-content">
        <div className="content">
          <p style={{ fontSize: "1.25rem" }}>
            ヒートマップより地域を選んでください。
          </p>
        </div>
      </div>
    );
  } else if (judgeVis === 1) {
    //期間が押された場合
    return (
      <div className="card-content p-1" style={{ height: "100%" }}>
        <WorldMap />
      </div>
    );
  } else if (judgeVis === 2) {
    //国が押された場合
    return <CountryHeatMap />;
  } else {
    //セル（国と期間）が押された場合
    return (
      <div className="card-content p-1" style={{ height: "100%" }}>
        <Bargraph />
      </div>
    );
  }
};

export default JudgeVis;
