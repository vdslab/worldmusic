import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeYear, changeSorted } from "../stores/details";
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
  const sorted = useSelector((state) => state.detail.sorted);
  const [dbData, setDbData] = useState([]);
  const [da, setDa] = useState([]);

  const array = ["q", "b", "c", "d", "e", "f"];

  useEffect(() => {
    (async () => {
      const data = await fetchSwarmplt(startMonth, endMonth, feature, country);
      console.log(data);
      setDbData(data);
    })();
  }, []);

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-content">
        <div className="content" style={{ fontSize: "1.25rem" }}>
          ランキング
          <div class="select is-small" style={{ paddingLeft: "70px" }}>
            <select
              value={sorted}
              onChange={(event) => {
                dispatch(changeSorted(event.target.value));
              }}
            >
              <option>昇順</option>
              <option>降順</option>
            </select>
          </div>
        </div>
        <div className="ranking-scroll">
          <ShowRanking />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
