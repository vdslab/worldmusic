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
// import { domain } from "process";
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
      // console.log(1);
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
    const yScale = scaleLinear().domain([fmin, fmax]).range([200, 10]);

    const rScale = scaleLinear().domain([streammin, streammax]).range([50, 10]);
    const simulation = forceSimulation(jpData)
      .force(
        "x",
        forceX((d) => {
          return 200;
        }).strength(0)
      )
      .force(
        "y",
        forceY((d) => {
          return 150;
        }).strength(0.1)
      )
      // .force(
      //   "y",
      //   forceY()
      //     .y(200)
      //     .y((d) => {
      //       return yScale(d.y);
      //     })
      //     .strength(0.5)
      // forceY((d) => {
      //   return yScale(d.y);
      // }).strength(1)
      // )
      // .force(
      //   "y",
      //   forceY()
      //     .y(100)
      //     .strength((d) => {
      //       return d.y;
      //     })
      //     .strength(0.2)
      // )
      .force(
        "collide",
        // forceCollide((d) => {
        //   return d.r;
        // })
        forceCollide().radius((d) => {
          return 10;
        })
      );
    // .alphaDecay(0);
    // .alpha(0.3);
    // .force("chage", forceManyBody());
    simulation.on("tick", () =>
      svg
        .selectAll("circle")
        .data(jpData)
        .join("circle")
        .style("fill", "red")
        .attr("stroke", "black")
        .attr("opacity", 0.7)
        .attr("cx", (d) => 200)
        .attr("cy", (d) => yScale(d.acousticness))
        .attr("r", (d) => d.stream / 10000)
    );
  }, [startMonth, endMonth, feature, country]);
  //   const simulation = forceSimulation(sampleData).force('x',forceX().strength(0.2)).force('y',forceY().strength(0.2)).force('collide',forceCollide((d) => {
  //     return d.y*20+3
  //   }))
  //   simulation.on('tick',() =>
  //   svg.selectAll().data(sampleData).join('circle').style('fill', () => 'red').attr('cx', (d) => 200)
  //   .attr('cy', (d) => d.y)
  //   .attr('r', (d) => d.r))
  // }, [])

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
      <svg height="1000" width="500" ref={ref} />
    </div>
  );
};

export default Swarmplt;
