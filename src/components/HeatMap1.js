import React from "react";
import HeatMapChart from "./draw_heatmap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";

const HeatMap1 = () => {
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
              <ColorLegend />
            </div>
          </div>
        </div>
        <HeatMapChart judgeNumber={1}/>
      </div>
    </div>
  );
};

export default HeatMap1;
