import React from "react";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import Jsondata from "./America2016.json";

// const data = [
//   {
//     id: "0.0",
//     group: "group A",
//     price: 136,
//     volume: 9,
//   },
//   {
//     id: "0.1",
//     group: "group A",
//     price: 299,
//     volume: 7,
//   },
//   {
//     id: "0.2",
//     group: "group A",
//     price: 358,
//     volume: 19,
//   },

//   {
//     id: "1.0",
//     group: "group B",
//     price: 102,
//     volume: 11,
//   },
//   {
//     id: "1.1",
//     group: "group B",
//     price: 157,
//     volume: 4,
//   },
//   {
//     id: "1.2",
//     group: "group B",
//     price: 184,
//     volume: 7,
//   },
//   {
//     id: "2.70",
//     group: "group C",
//     price: 225,
//     volume: 6,
//   },
//   {
//     id: "2.71",
//     group: "group C",
//     price: 161,
//     volume: 17,
//   },
//   {
//     id: "2.72",
//     group: "group C",
//     price: 406,
//     volume: 13,
//   },
// ];

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
      groups={["America"]}
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
        sizes: [4, 40],
      }}
      spacing={15}
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
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: -46,
      }}
      axisRight={{
        orient: "right",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: 76,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: -76,
      }}
      motionStiffness={50}
      motionDamping={10}
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
