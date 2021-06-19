import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { Drawswarm } from "./components/swarmplot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Count from "./components/Count";
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
      <Count />
      <Footer />
      {/* {[...Array(9)].map((_, i) => {
        return <Drawswarm data={Jsondata[i]} year={year} />;
      })} */}
    </div>
  );
};

export default App;
