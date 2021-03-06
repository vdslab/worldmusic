import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwarmplt } from "../api";
import * as d3 from "d3";
import {
  changeMax,
  changeMin,
  changeStartMonth,
  changeEndMonth,
  changeCountry,
  changeChoosedCountry,
  changeChoosedPeriod,
  changeIsSwmpltShowed,
  changeMusicId,
  changeIsSwmpltChoosed,
  changeSwarmpltMax,
  changeSwarmpltMin,
} from "../stores/details";
import "../tooltip.css";
import "../style.css";
import { Link as Scroll } from "react-scroll";

const Swarmplt = ({ width, height, c, s }) => {
  const dispatch = useDispatch();
  const duration = 500;
  const margin = {
    top: 10,
    bottom: 10,
    left: 60,
    right: 60,
  };

  const ref = useRef();
  const svg = d3.select(ref.current);
  const [dbData, setDbData] = useState([]);

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const swarmpltMin = useSelector((state) => state.detail.swarmpltMin);
  const swarmpltMax = useSelector((state) => state.detail.swarmpltMax);

  useEffect(() => {
    let max = -Infinity;
    let min = Infinity;
    (async () => {
      const data = await fetchSwarmplt(s, feature, c);
      const musicdata = {};
      data.map((d) => {
        if (!musicdata[d.musicid]) {
          musicdata[d.musicid] = {
            musicid: d.musicid,
            stream: d.stream,
            name: d.name,
            [feature]: d[feature],
          };
          if (max < d[feature]) {
            max = d[feature];
          }
          if (min > d[feature]) {
            min = d[feature];
          }
        } else if (musicdata[d.musicid].musicid) {
          musicdata[d.musicid].stream =
            Number(musicdata[d.musicid].stream) + Number(d.stream);
        }
      });
      dispatch(changeSwarmpltMax(max));
      dispatch(changeSwarmpltMin(min));
      const a = Object.keys(musicdata).map((m) => {
        return musicdata[m];
      });
      setDbData(a);
    })();

    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }, [startMonth, endMonth, feature, country]);

  useEffect(() => {
    draw();
  }, [dbData]);

  const checkColor = (item) => {
    let opacity = 0;
    let opacityMax = 1;
    let opacityMin = 0.1;
    opacity =
      ((opacityMax - opacityMin) * (item - swarmpltMin)) /
        (swarmpltMax - swarmpltMin) +
      opacityMin;
    return opacity;
  };

  const draw = () => {
    const tooltip = d3.select(".tooltip-swarm");
    const swarmplt = svg.select("g");
    const xScale = scaleLinear()
      .domain(extent(dbData.map((d) => +d[feature])))
      .range([10, 525]);

    let streamDomain = extent(dbData.map((d) => d.stream));
    streamDomain = streamDomain.map((d) => Math.sqrt(d));
    let size = scaleLinear().domain(streamDomain).range([2, 13]);
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
          return 150;
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

      .on(
        "tick",
        () =>
          swarmplt
            .selectAll("circle")
            .data(dbData)
            .join("circle")
            .style("fill", "#FF55BB") //??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            .attr("stroke", "black")
            .on("mouseover", function (d, i) {
              tooltip.style("visibility", "visible").html("?????? : " + i.name);
            })
            .on("mousemove", function (d) {
              tooltip
                .style("top", d.pageY - 20 + "px")
                .style("left", d.pageX + 10 + "px");
            })
            .on("mouseout", function (d) {
              tooltip.style("visibility", "hidden");
            })
            .on("click", (d, i) => {
              dispatch(changeMusicId(i.musicid));
              dispatch(changeIsSwmpltChoosed(true));
              console.log(i.musicid);
            })
            .attr("stroke-width", "0.1")
            .attr("opacity", 0.7)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => size(Math.sqrt(d.stream)))
            .style("cursor", "pointer").append
      );
    let init_decay = setTimeout(function () {
      simulation.alphaDecay(0.1);
    }, 1000);
    const xAxis = d3.axisBottom().scale(xScale); //tickSize(200)??????????????? ticks(10)?????????????????????????????????
    swarmplt
      .selectAll(".x.axis")
      .data([null])
      .join("g")
      .attr("class", "axisBlack")
      .classed("x axis", true)
      .attr("transform", `translate(0,-20)`)
      .transition()
      .duration(duration)
      .call(xAxis);
  };
  return (
    <div>
      <Scroll to="ScrollToSong" smooth={true} offset={-20}>
        <div className="swmplt-scroll">
          <svg width="650" height="300" viewBox="0 -20 650 350" ref={ref} />
        </div>
      </Scroll>
    </div>
  );
};

export default Swarmplt;
