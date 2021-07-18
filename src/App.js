import Header from "./components/Header";
import Footer from "./components/Footer";
import SimilarSongs from "./components/SimilarSongs";
import Song from "./components/Song";
import Ranking from "./components/Ranking";
import Detail from "./components/Detail";
import "./style.css";
import HeatMap from "./components/HeatMap";
import WorldMap from "./components/WorldMap";
import { useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import SelectFeature from "./components/selectFeature";

const App = () => {
  const aboutColorGradations = [
    [0, 0],
    [0.1, 25],
    [0.2, 50],
    [0.3, 75],
    [0.4, 100],
    [0.5, 125],
    [0.6, 150],
    [0.7, 175],
    [0.8, 200],
    [0.9, 225],
    [1, 250],
  ];
  return (
    <div>
      <Header />
      <div className="columns is-gapless">
        <div className="column">
          <div className="my-section">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <WorldMap />
                </div>
              </div>
              <div className="card-content">
                <div className="content">
                  <footer className="card-footer">
                    <p className="card-footer-item">
                      <span>
                        <SelectFeature />
                      </span>
                    </p>
                    <p className="card-footer-item">
                      <span>
                        <svg width="255" height="50">
                          <g>
                            <defs>
                              <linearGradient id="gradient">
                                <stop
                                  offset="0%"
                                  stopColor={d3.interpolateTurbo(0)}
                                />
                                <stop
                                  offset="5%"
                                  stopColor={d3.interpolateTurbo(0.05)}
                                />
                                <stop
                                  offset="10%"
                                  stopColor={d3.interpolateTurbo(0.1)}
                                />
                                <stop
                                  offset="15%"
                                  stopColor={d3.interpolateTurbo(0.15)}
                                />
                                <stop
                                  offset="20%"
                                  stopColor={d3.interpolateTurbo(0.2)}
                                />
                                <stop
                                  offset="25%"
                                  stopColor={d3.interpolateTurbo(0.25)}
                                />
                                <stop
                                  offset="30%"
                                  stopColor={d3.interpolateTurbo(0.3)}
                                />
                                <stop
                                  offset="35%"
                                  stopColor={d3.interpolateTurbo(0.35)}
                                />
                                <stop
                                  offset="40%"
                                  stopColor={d3.interpolateTurbo(0.4)}
                                />
                                <stop
                                  offset="45%"
                                  stopColor={d3.interpolateTurbo(0.45)}
                                />
                                <stop
                                  offset="50%"
                                  stopColor={d3.interpolateTurbo(0.5)}
                                />
                                <stop
                                  offset="55%"
                                  stopColor={d3.interpolateTurbo(0.55)}
                                />
                                <stop
                                  offset="60%"
                                  stopColor={d3.interpolateTurbo(0.6)}
                                />
                                <stop
                                  offset="65%"
                                  stopColor={d3.interpolateTurbo(0.65)}
                                />
                                <stop
                                  offset="70%"
                                  stopColor={d3.interpolateTurbo(0.7)}
                                />
                                <stop
                                  offset="75%"
                                  stopColor={d3.interpolateTurbo(0.75)}
                                />
                                <stop
                                  offset="80%"
                                  stopColor={d3.interpolateTurbo(0.8)}
                                />
                                <stop
                                  offset="85%"
                                  stopColor={d3.interpolateTurbo(0.85)}
                                />
                                <stop
                                  offset="90%"
                                  stopColor={d3.interpolateTurbo(0.9)}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={d3.interpolateTurbo(0.95)}
                                />
                                <stop
                                  offset="100%"
                                  stopColor={d3.interpolateTurbo(1)}
                                />
                              </linearGradient>
                            </defs>
                            <rect
                              x="0"
                              y="10"
                              width="250"
                              height="20"
                              fill="url('#gradient')"
                            />
                            {aboutColorGradations.map((item, i) => {
                              return (
                                <line
                                  x1={item[1]}
                                  y1="30"
                                  x2={item[1]}
                                  y2="40"
                                  stroke="black"
                                />
                              );
                            })}
                            {aboutColorGradations.map((item, i) => {
                              return (
                                <text
                                  x={item[1]}
                                  y="50"
                                  fontSize="10"
                                  textAnchor="start"
                                >
                                  {item[0]}
                                </text>
                              );
                            })}
                          </g>
                        </svg>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
              <div className="card-content">
                <div className="content">
                  <HeatMap />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <Detail />
          <div className="columns is-gapless">
            <div className="column">
              <Ranking />
            </div>
            <div className="column">
              <Song />
              <SimilarSongs />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
