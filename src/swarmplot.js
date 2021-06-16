import React from "react";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";

const MyResponsiveSwarmPlot = ({ data, year }) => {
  const features = [
    "acousticness",
    "danceability",
    "energy",
    "liveness",
    "loudness",
    "mode",
    "speechiness",
    "tempo",
    "valence",
  ];
  const feature = features[0];
  let streams = [];
  let value = [];
  data.map((d) => {
    streams.push(d.streams);
    value.push(d.valence);
  });
  return (
    <ResponsiveSwarmPlot
      data={data}
      animate={false}
      groups={[data[0][14]]}
      identity={"id"}
      value={feature}
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
        sizes: [4, 100],
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
        legend: year,
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
        legend: feature,
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "streams",
        legendPosition: "middle",
        legendOffset: -76,
      }}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export const Drawswarm = ({ data, year }) => {
  return (
    <div style={{ width: 1600, height: 800 }}>
      <MyResponsiveSwarmPlot data={data} year={year} />
    </div>
  );
};
