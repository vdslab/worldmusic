import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear } from "../stores/details";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
// import { changeFeature, changeYear } from "../stores/Count";

const Ranking = () => {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.detail.year);
  const period = useSelector((state) => state.detail.period);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const [dbData, setDbData] = useState([]);

  console.log(year, period, feature, country);
  useEffect(() => {
    (async () => {
      const data = await fetchData(year, period, feature, country);
      setDbData(data);

      console.log(dbData);
    })();
  }, []);

  return (
    <div className="my-section">
      <div className="card" style={{ height: "50vh" }}>
        <div className="card-content">
          <div className="content">ランキング</div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
