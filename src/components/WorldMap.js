import React from "react";
import { DrowWorldMap } from "./drow_worldmap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeFeature,
  changeStartMonth,
  changeEndMonth,
} from "../stores/details";
import { useSelector } from "react-redux";
// import featureSelect from "./featureSelect";
// import periodSelect from "./periodSelect";

const WorldMap = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(0);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  //let start = textYear[0][0];
  //let end = textYear[0][1];
  return (
    <div className="my-section">
      <DrowWorldMap />
    </div>
  );
};

export default WorldMap;
