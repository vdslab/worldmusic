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
import ColorLegend from "./components/colorLegend";

const App = () => {
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
                        <ColorLegend />
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
