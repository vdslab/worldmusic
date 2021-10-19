import React from "react";
import HeatMapChart from "./draw_heatmap";

const HeatMap2 = () => {
  return (
    <div className="card-content p-1">
      <div className="content">
        チェックボックスの出現
        （チェック押してからヒートマップの出現）
        <HeatMapChart judgeNumber={2}/>
      </div>
    </div>
  );
};

export default HeatMap2;