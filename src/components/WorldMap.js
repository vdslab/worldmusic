import React from "react";
import { DrowWorldMap } from "./drow_worldmap";

const WorldMap = () => {
  return (
    <div className="my-section">
      <div className="card" style={{ height: "40vh" }}>
        <div className="card-content">
          <div className="content">
            <div className="select is-small">
              <select>
                <option>acousticness</option>
                <option>danceability</option>
                <option>energy</option>
                <option>instrumentalness</option>
                <option>liveness</option>
                <option>loudness</option>
                <option>mode</option>
                <option>speechiness</option>
                <option>tempo</option>
                <option>time_signature</option>
                <option>valence</option>
              </select>
            </div>
            <DrowWorldMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
