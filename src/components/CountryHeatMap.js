import React from "react";
import HeatMapChart from "./draw_heatmap";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { changeMax, changeMin } from "../stores/details";

const CountryHeatMap = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const [heatMapData, setHeatMapData] = useState([]);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);
  const country = [];
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
        チェックボックスの出現 （チェック押してからヒートマップの出現）
        <HeatMapChart
          judgeNumber={2}
          data={heatMapData}
          max={Max}
          min={Min}
          y={country}
        />
      </div>
    </div>
  );
};

export default CountryHeatMap;
