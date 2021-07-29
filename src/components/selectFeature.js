import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feature } from "topojson";
import { changeFeature } from "../stores/details";

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
    "mode",
    "speechiness",
    "tempo",
    "time_signature",
    "valence",
  ];
  return (
    <div>
      <select 
        value={feature}
        onChange={(event) => {
          dispatch(changeFeature(event.target.value));
        }}
      >
        {elements.map((element) => {
          return (
            <option value={element}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default selectFeature;
