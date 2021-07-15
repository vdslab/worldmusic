import React, { useState, useEffect } from "react";
import DisplaySimilarSongs  from "./display_similarsongs";

const SimilarSongs = () => {
  return (
    <div className="my-section">
      <div className="card" style={{ height: "24.25vh" }}>
        <div className="card-content">
          <div className="content">
            <DisplaySimilarSongs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarSongs;
