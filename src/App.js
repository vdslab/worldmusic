// import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
// import { Drawswarm } from "./components/swarmplot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SimilarSongs from "./components/SimilarSongs";
import Song from "./components/Song";
import Ranking from "./components/Ranking";
import Detail from "./components/Detail";
import Count from "./components/Count";
import "./style.css";
import HeatMap from "./components/HeatMap";
import WorldMap from "./components/WorldMap";
import { check } from "./api";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/getData");
      const data = await response.json();
      setData(data);
    })();
  }, []);

  console.log(data);
  return (
    <div>
      <Header />
      <div className="columns is-gapless">
        <div className="column">
          <WorldMap />
          <HeatMap />
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
      {/* {[...Array(9)].map((_, i) => {
        return <Drawswarm data={Jsondata[i]} year={year} />;
      })} */}
    </div>
  );
};

export default App;
