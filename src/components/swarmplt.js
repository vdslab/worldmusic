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

const Swarmplt = () => {
  const ref = useRef();
  const svg = select(ref.current);

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

    const xScale = scaleLinear()
      .domain(extent(dbData.map((d) => +d.acousticness)))
      .range([750, 10]);

    let streamDomain = extent(dbData.map((d) => d.stream));
    streamDomain = streamDomain.map((d) => Math.sqrt(d));
    let size = scaleLinear().domain(streamDomain).range([1, 30]);
    let simulation = forceSimulation(dbData)
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
          .data(dbData)
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
      <svg height="200" width="800" ref={ref} />
    </div>
  );
};

export default Swarmplt;
