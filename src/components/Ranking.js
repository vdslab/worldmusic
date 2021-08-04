import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear } from "../stores/details";
import { useState, useEffect } from "react";
import { fetchData, fetchSwarmplt } from "../api";
import selectPeriod from "./selectPeriod";
import ShowRanking from "./show_Ranking";

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
    (async () => {
      const data = await fetchSwarmplt(startMonth, endMonth, feature, country);
      console.log(data);
      setDbData(data);
    })();
    // const simulation = f;
  }, []);

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-content">
        <div className="content" style={{ fontSize: "1.25rem" }}>
          ランキング
        </div>
        <div className="ranking-scroll">
          <ShowRanking />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
