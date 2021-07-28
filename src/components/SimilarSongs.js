import React, { useState, useEffect } from "react";
import DisplaySimilarSongs from "./display_similarsongs";

const SimilarSongs = () => {
  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-content">
        <div className="content">
          <DisplaySimilarSongs />
        </div>
      </div>
    </div>
  );
};

export default SimilarSongs;
