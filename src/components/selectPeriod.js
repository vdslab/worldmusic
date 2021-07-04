import React from "react";
import { DrowWorldMap } from "./drow_worldmap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStartMonth, changeEndMonth } from "../stores/details";
import { useSelector } from "react-redux";

const selectPeriod = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(0);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const textAboutYear = [
    ["2017-01", "2017-06"],
    ["2017-07", "2017-12"],
    ["2018-01", "2018-06"],
    ["2018-07", "2018-12"],
    ["2019-01", "2019-06"],
    ["2019-07", "2019-12"],
    ["2020-01", "2020-06"],
    ["2020-07", "2020-12"],
  ];

  return <p>aaa</p>;
};

export default selectPeriod;
