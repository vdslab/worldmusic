import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwarmplt, fetchTest } from "../api";
import * as d3 from "d3";

const FeatureVis = () => {
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const sorted = useSelector((state) => state.detail.sorted);
  const [dbData, setDbData] = useState([]);
  const [da, setDa] = useState([]);
  useEffect(() => {
    (async () => {
      /**TODO:改善 */
      const data = await fetchTest(startMonth, endMonth, feature, country);
      console.log(data);
    })();
  }, []);
  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top1</p>
          {/*<Song id={'67BtfxlNbhBmCDR2L2l8qd'} /> みたいにidを変数として渡すとか？*/}
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top2</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top3</p>
        </article>
      </div>
    </div>
  );
};

export default FeatureVis;
