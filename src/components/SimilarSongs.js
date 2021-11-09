import React, { useState, useEffect } from "react";
import DisplaySimilarSongs from "./display_similarsongs";

const SimilarSongs = () => {
  return (
    <div className="card" style={{ height: "100%" }}>
      <DisplaySimilarSongs />
    </div>
  );
};

export default SimilarSongs;
