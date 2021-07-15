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
    ["2017-01", "2017-03"],
    ["2017-04", "2017-06"],
    ["2017-07", "2017-09"],
    ["2017-10", "2017-12"],
    ["2018-01", "2018-03"],
    ["2018-04", "2018-06"],
    ["2018-07", "2018-09"],
    ["2018-10", "2018-12"],
    ["2019-01", "2019-03"],
    ["2019-04", "2019-06"],
    ["2019-07", "2019-09"],
    ["2019-10", "2019-12"],
    ["2020-01", "2020-03"],
    ["2020-04", "2020-06"],
    ["2020-07", "2020-09"],
    ["2020-10", "2020-12"],
  ];
  return (
    <div>
      <output for="sliderWithValue">
        {startMonth}〜{endMonth}
      </output>
      <br></br>
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
      <br></br>
      <svg width="129" height="10">
        <g>
          <line x1="8" y1="0" x2="8" y2="10" stroke="#4682b4" />
          <line x1="23" y1="0" x2="23" y2="10" stroke="#4682b4" />
          <line x1="40" y1="0" x2="40" y2="10" stroke="#4682b4" />
          <line x1="57" y1="0" x2="57" y2="10" stroke="#4682b4" />
          <line x1="73" y1="0" x2="73" y2="10" stroke="#4682b4" />
          <line x1="90" y1="0" x2="90" y2="10" stroke="#4682b4" />
          <line x1="105" y1="0" x2="105" y2="10" stroke="#4682b4" />
          <line x1="120" y1="0" x2="120" y2="10" stroke="#4682b4" />
        </g>
      </svg>
    </div>
  );
}

export default selectPeriod;
