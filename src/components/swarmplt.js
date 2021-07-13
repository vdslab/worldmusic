import React, { useState, useEffect, useRef } from "react";
import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceManyBody,
} from "d3-force";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { extent } from "d3-array";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../api";

const sampleData = [
  { x: 200, y: 150, r: 20, color: "red" },
  { x: 200, y: 100, r: 20, color: "black" },
  { x: 200, y: 50, r: 20, color: "green" },
  { x: 290, y: 200, r: 15, color: "blue" },
  { x: 270, y: 170, r: 10, color: "yellow" },
];

const Swarmplt = () => {
  const ref = useRef();
  const svg = select(ref.current);

  const dispatch = useDispatch();
  const [dbData, setDbData] = useState([]);

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);

  useEffect(() => {
    (async () => {
      console.log(1);
      const data = await fetchData(startMonth, endMonth, feature, country);
      setDbData(data);
    })();
    console.log(dbData);
    const jpData = dbData.filter((item) => {
      return item.countryid == "JP";
    });
    const f = jpData.map((item) => {
      return item.acousticness;
    });
    const stream = jpData.map((item) => {
      return item.stream;
    });

    let fmax = Math.max(...f);
    let fmin = Math.min(...f);
    let streammax = Math.max(...stream);
    let streammin = Math.min(...stream);
    console.log(streammin, streammax);
    // const yScale = scaleLinear().domain([fmin, fmax]).range([200, 10]);
    let xScale = scaleLinear()
      .domain(extent(jpData.map((d) => +d.acousticness)))
      .range([750, 10]);
    const rScale = scaleLinear().domain([streammin, streammax]).range([30, 5]);
    let marketcapDomain = extent(jpData.map((d) => d.stream));
    marketcapDomain = marketcapDomain.map((d) => Math.sqrt(d));
    let size = scaleLinear().domain(marketcapDomain).range([1, 30]);
    let simulation = forceSimulation(jpData)
      // .force(
      //   "x",
      //   forceX(() => {
      //     return 200;
      //   }).strength(0.2)
      // )

      // .force(
      //   "y",
      //   forceY((d) => {
      //     return yScale(d.acousticness);
      //   }).strength(1)
      // )

      .force(
        "collide",
        forceCollide((d) => {
          return size(Math.sqrt(d.stream));
        })
      )
      .alphaDecay(0)
      .alpha(0.3)
      .on("tick", () =>
        svg
          .selectAll("circle")
          .data(jpData)
          .join("circle")
          .style("fill", "red")
          .attr("stroke", "black")
          .attr("opacity", 0.7)
          .attr("cx", (d) => xScale(d.acousticness))
          .attr("cy", (d) => 100)
          .attr("r", (d) => size(Math.sqrt(d.stream)))
      );
  }, [startMonth, endMonth, feature, country]);

  return (
    <div>
      {/* <svg viewBox="0 0 1000 500">
        <g>
          {sampleData.map((d) => {
            console.log(d.r);
            return <circle cx="200" cy={d.y} r={d.r} fill={d.color}></circle>;
          })}
        </g>
      </svg> */}
      <svg height="200" width="800" ref={ref} />
    </div>
  );
};

export default Swarmplt;
