import React from "react";
import { DrowWorldMap } from "./drow_worldmap";
import { useState } from "react";

const WorldMap = () => {
  const [year, setValue] = useState(0);
  const [start,setStart] = useState("2017-01");
  const [end,setEnd] = useState("2017-06");
  const elements = ["acousticness","danceability","energy","instrumentalness","liveness","loudness","mode","speechiness","tempo","time_signature","valence"];
  const textYear = [["2017-01","2017-06"],["2017-07","2017-12"],["2018-01","2018-06"],["2018-07","2018-12"],["2019-01","2019-06"],["2019-07","2019-12"],["2020-01","2020-06"],["2020-07","2020-12"]];
  //let start = textYear[0][0];
  //let end = textYear[0][1];

  return (
    <div className="my-section">
      <div className="card" style={{ height: "40vh" }}>
        <div className="card-content">
          <div className="content">
            <div className="select is-small">
              <select onChange={(event) => {console.log(event.target.value);}}>
                {elements.map((element,i) => {
                  return(
                    <option>{element}</option>
                  );
                })}
              </select>
            </div>
            <input 
              className="slider is-fullwidth" type="range" id="getSliderValue"
              min="0" max="7" step="1"
              value={year}
              onChange={(event) => {
                //console.log(event.target.value);
                setValue(event.target.value);
                setStart(textYear[event.target.value][0]);
                setEnd(textYear[event.target.value][1]);
                //start = textYear[event.target.value][0];
                //end = textYear[event.target.value][1];
                //console.log(start);
                //console.log(end);
              }}
            ></input>
            <output for="sliderWithValue">{start}〜{end}</output>
            <DrowWorldMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
