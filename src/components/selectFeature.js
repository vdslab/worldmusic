import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feature } from "topojson";
import {
  changeChoosedFeature,
  changeFeature,
  changeSelectClicked,
} from "../stores/details";

const selectFeature = () => {
  const dispatch = useDispatch();
  const feature = useSelector((state) => state.detail.feature);
  const elements = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    //"mode",
    "speechiness",
    "valence",
    "tempo",
    "time_signature",
  ];
  return (
    <div>
      <select
        value={feature}
        onChange={(event) => {
          dispatch(changeChoosedFeature("Yes"));
          dispatch(changeFeature(event.target.value));
          dispatch(changeSelectClicked(true));
        }}
      >
        {elements.map((element) => {
          return <option value={element}>{element}</option>;
        })}
      </select>
    </div>
  );
};

export default selectFeature;
