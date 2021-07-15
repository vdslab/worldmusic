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
import * as d3 from "d3";
import { select } from "d3-selection";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
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
    <div>
      <div className="card-content">
        <div className="content">
          <DrowWorldMap />
        </div>
      </div>
      <div className="card-content">
        <div className="content">
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                <SelectFeature />
              </span>
            </p>
            <p class="card-footer-item">
              <span>
                <ColorLegend />
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
