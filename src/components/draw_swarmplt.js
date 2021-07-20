import React, { useState, useEffect, useRef } from "react";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../api";
import * as d3 from "d3";
import { changeMusicId } from "../stores/details";

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

  const dispatch = useDispatch();
  const [dbData, setDbData] = useState([]);

  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const feature = useSelector((state) => state.detail.feature);
  const country = useSelector((state) => state.detail.country);
  const musicid = useSelector((state) => state.detail.musicid);
  const [Max, setMax] = useState(-Infinity);
  const [Min, setMin] = useState(Infinity);

  useEffect(() => {
    let a = -Infinity;
    let b = Infinity;
    (async () => {
      const data = await fetchData(
        startMonth,
        endMonth,
        feature,
        country,
        musicid
      );
      data.map((item, i) => {
        if (a < item[feature]) {
          a = item[feature];
        }
        if (item[feature] < b) {
          b = item[feature];
        }
        item[feature] = checkColor(item[feature]);
      });
      setDbData(data);
      setMax(a);
      setMin(b);
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
      ((opacityMax - opacityMin) * (item - Min)) / (Max - Min) + opacityMin;
    return opacity;
  };

  const draw = () => {
    checkcoutry.map((item, i) => {
      // //描画する国である＆空配列でない場合に描画?
      if (country === item && dbData.length != 0) {
        const swarmplt = svg.select("g");
        const xScale = scaleLinear()
          .domain(extent(dbData.map((d) => +d[feature])))
          .range([10,525]);

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
          .on(
            "tick",
            () =>
              swarmplt
                .selectAll("circle")
                .data(dbData)
                .join("circle")
                .style("fill", (d) => d3.interpolatePuRd(checkColor(d[feature]))) //左側は重み付き平均の最大最小だけど、右側はトータルの最大最小だから、同じカラーレジェンドだと意味が変わる。→違うカラーを使う
                .attr("stroke", "black")
                .on("mouseover", (d, i) => {
                  //d3.select(this).attr("stroke","red") //←反応なし
                })
                .on("mouseout", (d, i) => {
                  //d3.select(i.this).attr("stroke","black") //←反応なし
                })
                .on("click", (d, i) => {
                  dispatch(changeMusicId(i.musicid));
                })
                .attr("stroke-width", "0.1")
                .attr("opacity", 0.7)
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y)
                .attr("r", (d) => size(Math.sqrt(d.stream)))
            //.attr("transform", `rotate(180 ${650/2}, ${250/2})`) //←綺麗に180度回転できていない
          );
        let init_decay = setTimeout(function () {
          simulation.alphaDecay(0.05);
        }, 5000);

        const xAxis = d3.axisBottom().scale(xScale); //tickSize(200)で伸ばせる ticks(10)でメモリ数を制限できる
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
