import React from "react";
import { useDispatch } from "react-redux";
import { changeFeature } from "../stores/details";

const selectFeature = () => {
  const dispatch = useDispatch();
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
        onChange={(event) => {
          dispatch(changeFeature(event.target.value));
        }}
      >
        {elements.map((element, i) => {
          return <option>{element}</option>;
        })}
      </select>
    </div>
  );
};

export default selectFeature;
