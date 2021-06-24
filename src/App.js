import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { Drawswarm } from "./components/swarmplot";
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

// import JsonUS from "./America2021.json";
// import JsonAu from "./Australia2021.json";
// import JsonCa from "./Canada2021.json";
// import JsonUk from "./England2021.json";
// import JsonFr from "./France2021.json";
// import JsonGe from "./Germany2021.json";
// import JsonJa from "./Japan2021.json";
// import JsonGl from "./Global2021.json";
// import JsonNe from "./Netherland2021.json";

const App = () => {
  // const Jsondata = [
  //   JsonUS,
  //   JsonAu,
  //   JsonCa,
  //   JsonUk,
  //   JsonFr,
  //   JsonGe,
  //   JsonJa,
  //   JsonGl,
  //   JsonNe,
  // ];
  const year = "2021";

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
