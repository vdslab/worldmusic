import React from "react";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import Jsondata from "./2016.json";

const MyResponsiveSwarmPlot = ({ data }) => {
  let streams = [];
  let value = [];
  data.map((d) => {
    streams.push(d.streams);
    value.push(d.acousticness);
    // console.log(d.id);
  });
  //   console.log(value);
  return (
    <ResponsiveSwarmPlot
      data={data}
      groups={[
        "America",
        "Canada",
        "England",
        // "England",
        // "France",
        // "Germany",
        // "Global",
        // "Japan",
        // "Netherland",
      ]}
      //   groupBy={"country"}
      identity={"id"}
      value="acousticness"
      valueFormat=".2f"
      valueScale={{
        type: "linear",
        min: Math.min(...value),
        max: Math.max(...value),
        reverse: false,
      }}
      size={{
        key: "streams",
        values: [Math.min(...streams), Math.max(...streams)],
        sizes: [4, 50],
      }}
      animate={false}
      spacing={5}
      forceStrength={4}
      simulationIterations={100}
      borderColor={{
        from: "color",
        modifiers: [
          ["darker", 0.6],
          ["opacity", 0.5],
        ],
      }}
      margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
      axisTop={{
        orient: "top",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country if vertical, acousticness if horizontal",
        legendPosition: "middle",
        legendOffset: -46,
      }}
      axisRight={{
        orient: "right",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country if vertical, acousticness if horizontal",
        legendPosition: "middle",
        legendOffset: 76,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country if vertical, acousticness if horizontal",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country if vertical, acousticness if horizontal",
        legendPosition: "middle",
        legendOffset: -76,
      }}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default function App() {
  return (
    <div style={{ width: 1600, height: 800 }}>
      <MyResponsiveSwarmPlot data={Jsondata} />
    </div>
  );
}
