import React from "react";
import HeatMapChart from "./draw_heatmap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
import { useEffect, useState } from "react";
import { fetchData, } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMax,
  changeMin,
} from "../stores/details";

const HeatMap1 = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const [heatMapData, setHeatMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
  useEffect(() => {
    (async () => {
      const data = await fetchData(feature);
      setMin(data.min);
      setMax(data.max);
      setHeatMapData(data.dbData);
      dispatch(changeMax(data.max));
      dispatch(changeMin(data.min));
      //console.log(data);
    })();
  }, [feature]);
  
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
        <HeatMapChart judgeNumber={1} data={heatMapData} max={Max} min={Min}/>
      </div>
    </div>
  );
};

export default HeatMap1;
