import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { extent } from "d3-array";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../api";
import { axisBottom } from "d3";
import * as d3 from "d3";

const Swarmplt = ({ width, height }) => {
  const duration = 500;
  const margin = {
    top: 10,
    bottom: 500,
    left: 50,
    right: 40,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height;
  const checkcoutry = ["AU", "CA", "DE", "FR", "JP", "NL", "GB", "US"];

  const ref = useRef();
  const svg = d3.select(ref.current);

  const [dbData, setDbData] = useState([]);

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);

  useEffect(() => {
    (async () => {
      const data = await fetchData(startMonth, endMonth, feature, country);
      setDbData(data);
    })();
    console.log(1);
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }, [startMonth, endMonth, feature, country]);

  console.log(country, startMonth, endMonth, feature);
  useEffect(() => {
    draw();
  }, [startMonth, endMonth, feature, country]);

  const draw = () => {
    console.log(startMonth, endMonth, dbData);
    checkcoutry.map((item, i) => {
      // //描画する国である＆空配列でない場合に描画?
      if (country === item && dbData.length != 0) {
        console.log("2 " + country, startMonth, endMonth, dbData.length);
        console.log(dbData);
        const swarmplt = svg.select("g");
        const xScale = scaleLinear()
          .domain(extent(dbData.map((d) => +d[feature])))
          .range([525, 10]);

        let streamDomain = extent(dbData.map((d) => d.stream));
        streamDomain = streamDomain.map((d) => Math.sqrt(d));
        let size = scaleLinear().domain(streamDomain).range([1, 7]);
        let simulation = forceSimulation(dbData)
          .force(
            "x",
            forceX((d) => {
              return xScale(d[feature]);
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
            swarmplt
              .selectAll("circle")
              .data(dbData)
              .join("circle")
              .style("fill", (d) => d3.interpolateTurbo(d[feature]))
              .attr("stroke", "black")
              .on("mouseover", (d) => {
                console.log(d.target);
              })
              .on("mouseout", function (d) {})
              .attr("stroke-width", "0.1")
              .attr("opacity", 0.7)
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y)
              .attr("r", (d) => size(Math.sqrt(d.stream)))
          );
        let init_decay = setTimeout(function () {
          simulation.alphaDecay(0.05);
        }, 5000);
        const xAxis = d3.axisBottom().scale(xScale);

        swarmplt
          .selectAll(".x.axis")
          .data([null])
          .join("g")
          .classed("x axis", true)
          .attr("transform", `translate(0,${innerHeight})`)
          .transition()
          .duration(duration)
          .call(xAxis);
      } else {
        return;
      }
    });
  };

  return (
    <div>
      <svg width="650" height="250" viewBox="0 0 650 250" ref={ref} />
    </div>
  );
};

export default Swarmplt;
