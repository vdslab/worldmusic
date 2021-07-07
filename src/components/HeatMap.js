import React from "react";
import HeatMapChart from "./draw_heatmap";

const HeatMap = () => {
  return (
    <div className="my-section">
      <div className="card" style={{ height: "40vh" }}>
        <div className="card-content">
          <div className="content">
            <HeatMapChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
