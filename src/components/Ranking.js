import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear } from "../stores/details";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
import selectPeriod from "./selectPeriod";

// import { changeFeature, changeYear } from "../stores/Count";

const Ranking = () => {
  const dispatch = useDispatch();
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const [dbData, setDbData] = useState([]);
  const [da, setDa] = useState([]);

  const array = ["q", "b", "c", "d", "e", "f"];

  // console.log(startMonth, endMonth, feature, country);
  useEffect(() => {
    // (async () => {
    //   const data = await fetchData(startMonth, endMonth, feature, country);
    //   setDbData(data);
    // })();
    // const simulation = f;
  }, []);

  return (
    <div className="my-section">
      <div className="card" style={{ minHeight: "55vh" }}>
        <div className="card-content">
          <div className="content">ランキング</div>
          <p>aaa</p>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
