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
  return <p>111111</p>;
};

export default selectFeature;
