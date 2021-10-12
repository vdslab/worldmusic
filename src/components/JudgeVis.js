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

const JudgeVis = () => {
  const dispatch = useDispatch();
  const judgeVis = useSelector((state) => state.detail.judgeVis);
  //console.log("judgeVis :" + judgeVis);

  if (judgeVis === 0) { //何も押されていない場合
    return (
      <div className="card-content">
        <div className="content">
          <p style={{ fontSize: "1.25rem" }}>
            ヒートマップより国と期間、もしくは国と期間のセルを選んでください。
          </p>
        </div>
      </div>
    );
  } else if (judgeVis === 1) { //期間が押された場合
    return <div>世界地図の表示</div>;
  } else if (judgeVis === 2) { //国が押された場合
    return <div>ヒートマップの表示</div>;
  } else { //セル（国と期間）が押された場合
    return <div>棒グラフの表示</div>;
  }
};

export default JudgeVis;
