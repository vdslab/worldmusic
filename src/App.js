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

const App = () => {
  return (
    <div>
      <Header />
      <div className="columns is-gapless">
        <div className="column">
          <div className="card">
            <WorldMap />
            <HeatMap />
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
