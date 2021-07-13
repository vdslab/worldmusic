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
      //console.log(1);
      const data = await fetchData(startMonth, endMonth, feature, country);
      setDbData(data);
    })();
    console.log(dbData);

    const xScale = scaleLinear()
      .domain(extent(dbData.map((d) => +d.acousticness)))
      .range([600, 10]);

    let streamDomain = extent(dbData.map((d) => d.stream));
    streamDomain = streamDomain.map((d) => Math.sqrt(d));
    let size = scaleLinear().domain(streamDomain).range([1, 7]);
    let simulation = forceSimulation(dbData)
      .force(
        "x",
        forceX((d) => {
          return xScale(d.acousticness);
        }).strength(5)
      )
      .force(
        "y",
        forceY((d) => {
          return 125;
        }).strength(0.2)
      )
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
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", (d) => size(Math.sqrt(d.stream)))
      );
    let init_decay = setTimeout(function(){
      console.log("start alpha decay");
      simulation.alphaDecay(0.05);
    },5000);
  }, [startMonth, endMonth, feature, country]);

  return (
    <div>
      <svg width="650" height="250" viewBox="0 0 650 250"ref={ref} />
    </div>
  );
};

export default Swarmplt;
