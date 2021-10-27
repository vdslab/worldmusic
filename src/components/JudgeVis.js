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
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const judgeVis = useSelector((state) => state.detail.judgeVis);
  //console.log("judgeVis :" + judgeVis);

  if (judgeVis === 0) {
    //何も押されていない場合
    return (
      <div className="card-content">
        <div className="content">
          <p style={{ fontSize: "1.25rem" }}>
            ヒートマップより国か期間、もしくは国と期間のセルを選んでください。
          </p>
        </div>
      </div>
    );
  } else if (judgeVis === 1) {
    //期間が押された場合
    return (
      <div className="card-content p-1">
        <div className="content heightMax">
          <div className="subtile">
            {startMonth}~{endMonth}
          </div>
          <WorldMap />
        </div>
      </div>
    );
  } else if (judgeVis === 2) {
    //国が押された場合
    return (
      <div>
        <CountryHeatMap />
      </div>
    );
  } else {
    //セル（国と期間）が押された場合
    return (
      <div>
        <Bargraph />
      </div>
    );
  }
};

export default JudgeVis;
