import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { Drawswarm } from "./swarmplot";
import JsonUS from "./America2021.json";
import JsonAu from "./Australia2021.json";
import JsonCa from "./Canada2021.json";
import JsonUk from "./England2021.json";
import JsonFr from "./France2021.json";
import JsonGe from "./Germany2021.json";
import JsonJa from "./Japan2021.json";
import JsonGl from "./Global2021.json";
import JsonNe from "./Netherland2021.json";

const Hero = () => {
  return (
    <section className="hero is-fluid is-danger">
      <div className="hero-body">
        <div className="container has-text-centered s-divider">
          <h1 className="title">About music aroud the world.</h1>
          <h2 className="subtitle">
            このサイトは、可視化によって世界各国の音楽の特徴を捉えることを目的としています。
          </h2>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>&copy; 2021 koizumi hatasa miura moriya watanabe</p>
      </div>
    </footer>
  );
};

const App = () => {
  const Jsondata = [
    JsonUS,
    JsonAu,
    JsonCa,
    JsonUk,
    JsonFr,
    JsonGe,
    JsonJa,
    JsonGl,
    JsonNe,
  ];
  const year = "2021";

  return (
    <div>
      {[...Array(9)].map((_, i) => {
        return <Drawswarm data={Jsondata[i]} year={year} />;
      })}
    </div>
  );
};

export default App;
