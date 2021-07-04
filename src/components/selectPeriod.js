import React from "react";
import { changeStartMonth, changeEndMonth } from "../stores/details";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function selectPeriod() {
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
  return (
    <div>
      <input
        className="slider is-fullwidth"
        type="range"
        id="getSliderValue"
        min="0"
        max="7"
        step="1"
        value={year}
        onChange={(event) => {
          setYear(event.target.value);
          const s = textAboutYear[event.target.value][0];
          const e = textAboutYear[event.target.value][1];
          dispatch(changeStartMonth(s));
          dispatch(changeEndMonth(e));
        }}
      ></input>
      <output for="sliderWithValue">
        {startMonth}〜{endMonth}
      </output>
    </div>
  );
}

export default selectPeriod;
