import React, { useEffect } from "react";
import { useState } from "react";
import * as d3 from "d3";
import "../tooltip.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChoosedFeature,
  changeFeature,
  changeSelectClicked,
  changeCheckRaderFeatureClicked,
} from "../stores/details";
import "./RegionHeatMap";
import "../style.css";
import { Link as Scroll } from "react-scroll";

function RaderChart({ data }) {
  const dispatch = useDispatch();
  const selectClicked = useSelector((state) => state.detail.selectClicked);
  const checkFeatureClicked = useSelector(
    (state) => state.detail.checkRaderFeatureClicked
  );

  const useData = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "valence",
  ];

  const len = useData.length;
  const posX = 50;
  const posY = 50;
  const r = 50;
  const rs = [r, r * 0.8, r * 0.6, r * 0.4, r * 0.2];

  let perimeters = ["", "", "", "", ""];
  const perimetersPoint = [];
  const tick = [];
  let score = "";
  const scorePoint = [];
  const c = Math.PI / 180;
  const tooltip = d3.select(".tooltip-rader");
  const tooltip2 = d3.select(".tooltip-aboutFeature");

  for (let _r = 0; _r < rs.length; _r++) {
    for (let i = 0; i <= len; i++) {
      let key = useData[i];
      if (i === len) {
        key = useData[0];
      }
      const x = posX + rs[_r] * Math.cos(((360 / len) * i - 90) * c);
      const y = posY + rs[_r] * Math.sin(((360 / len) * i - 90) * c);
      if (i !== 0) {
        perimeters[_r] += "L " + x + "," + y + " ";
      } else {
        perimeters[_r] += "M " + x + "," + y + " ";
        tick.push({ x: x, y: y, value: (1 - _r / 5).toFixed(1) });
      }
      if (i === len) {
        perimeters[_r] += "z";
      }

      if (rs[_r] === r) {
        let value = data[0][key].toFixed(3);

        if (key === "loudness") {
          value = ((data[0].loudness + 60) / 60).toFixed(3);
        }

        const xs = posX + r * value * Math.cos(((360 / len) * i - 90) * c);
        const ys = posY + r * value * Math.sin(((360 / len) * i - 90) * c);

        if (i !== 0) {
          score += "L " + xs + "," + ys + " ";
        } else {
          score += "M " + xs + "," + ys + " ";
        }
        if (i === len) {
          score += "z";
        } else {
          scorePoint.push({ x: xs, y: ys, name: key, value: value });
          perimetersPoint.push({
            x: x,
            y: y,
            name: key,
            legend: false,
            value: value,
          });
          const xp = posX + rs[_r] * 1.2 * Math.cos(((360 / len) * i - 90) * c);
          const yp =
            posY + rs[_r] * 1.15 * Math.sin(((360 / len) * i - 90) * c);
          perimetersPoint.push({ x: xp, y: yp, name: key, legend: true });
        }
      }
    }
  }

  const margin = {
    left: 35,
    right: 20,
    top: 10,
    bottom: 15,
  };
  const contentWidth = 100;
  const contentHeight = 100;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  useEffect(() => {
    if (selectClicked) {
      dispatch(
        changeCheckRaderFeatureClicked(
          checkFeatureClicked.map((c, index) => false)
        )
      );
      dispatch(changeSelectClicked(false));
    }
  }, [selectClicked]);

  function onHover(e,value) {
    let text = "曲がアコースティックかどうかを示す。\
      値が1.0に近いほどアコースティックであることを表す。";
    if(value === "danceability"){
      text = "テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽要素の組み合わせに基づき、\
      曲がダンスにどの程度適しているかを示す。\
      値が1.0に近いほど踊りやすいことを表す。";
    }else if(value === "energy"){
      text = "ダイナミックレンジ、音の大きさ、音色、出だし（頭子音）、および一般的なエントロピーの判断要素に基づき、\
      曲の激しさと活発さを示す。\
      値が1.0に近いほど激しい、活発であることを表す。";
    }else if(value === "instrumentalness"){
      text = "曲にボーカルが含まれているかどうかを示す。\
      なお、「Ooh」と「aah」の音は楽器として取り扱い、\
      ラップやスポークンワード（喋り言葉）の曲はボーカルである。\
      値が1.0に近いほど曲にボーカルコンテンツが含まれていない可能性が高いことを表す。\
      0.5を超える場合は楽器性の高い曲を表すが、値が1.0に近づくにつれ、ボーカルを含まないことを表す。";
    }else if(value === "liveness"){
      text = "曲のなかに聴衆の存在がどれくらいあるのかを示す。\
      値が1.0に近いほど曲がライブで演奏された可能性が高いことを表す。\
      値が0.8を超す場合は曲がライブ（生演奏）である可能性が高いことを表す。";
    }else if(value === "loudness"){
      text = "音の強さ・大きさ、曲全体の音の強さ・大きさをデシベル数（dB）で示す。\
      値は曲全体の平均値であり、主に物理的な強さ・大きさに心理的な相関をもたらす音の品質を指している。\
      値は一般的には-60から0dbまでの範囲で示される（レーダーチャートでは値を0~1に正規化している）。\
      値が小さいほど音・曲が強い、大きいことを表す。";
    }else if(value === "speechiness"){
      text = "曲のなかにある話し言葉の存在を検出し、示している。ただのスピーチ\
      （トークショー、オーディオブック、詩等）に似ているような録音であるほど、値は1.0に近づく。 \
      値が0.66を超す場合は完全に話し言葉でできている曲であろうことを表す。\
      値が0.33から0.66までの場合はセクションまたはレイヤーのいずれかで音楽とスピーチの両方を含む\
      可能性のある曲（ラップ音楽等の場合も含む）を表す。\
      値が0.33未満であれば曲はほとんど音楽であり、言葉が含まれていない可能性が高いことを表す。";
    }else if(value === "valence"){
      text = "曲の音楽的なポジティブさ（陽気さ）を示す。\
      値が1.0に近いほど曲はよりポジティブに聞こえ（例：幸せ、陽気、陶酔）、\
      値が0.0に近いほど曲はよりネガティブに聞こえる（例：悲しい、落ち込んだ、怒っている）。";
    }
    tooltip2.style("visibility", "visible");
    tooltip2
      .style("top", e.pageY - 20 + "px")
      .style("left", e.pageX + 10 + "px")
      .html(text);
  }

  return (
    <div>
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth + 10} ${svgHeight}`}
        style={{ border: "solid 0px" }}
      >
        <g>
          {perimeters.map((d, i) => {
            return (
              <g key={i}>
                <path fill="none" stroke="lightgray" d={d} strokeWidth="0.5" />
              </g>
            );
          })}
          {tick.map((t, i) => {
            return (
              <g key={i}>
                <text
                  x={t.x}
                  y={t.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="5"
                  style={{ userSelect: "none" }}
                >
                  {t.value}
                </text>
              </g>
            );
          })}
          {perimetersPoint.map((p, i) => {
            return (
              <g key={i}>
                {!p.legend ? (
                  <line
                    x1={posX}
                    y1={posY}
                    x2={p.x}
                    y2={p.y}
                    id={p.name + " " + p.value}
                    stroke="lightgray"
                    strokeWidth="0.5"
                    onMouseMove={(e) => {
                      tooltip.style("visibility", "visible");
                      tooltip
                        .style("top", e.pageY - 20 + "px")
                        .style("left", e.pageX + 10 + "px")
                        .html(p.value);
                    }}
                    onMouseLeave={() => {
                      tooltip.style("visibility", "hidden");
                    }}
                  />
                ) : (
                  <Scroll to="ScrollToHeatmap" smooth={true} offset={-20}>
                    <text
                      x={p.x}
                      y={p.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      onClick={() => {
                        dispatch(
                          changeCheckRaderFeatureClicked(
                            checkFeatureClicked.map((c, index) =>
                              index === i ? true : false
                            )
                          )
                        );
                        dispatch(changeFeature(p.name));
                        dispatch(changeChoosedFeature("Yes"));
                      }}
                      onMouseMove={(e) => {
                        onHover(e,p.name);
                      }}
                      onMouseLeave={() => {
                        tooltip2.style("visibility", "hidden");
                      }}
                      style={
                        checkFeatureClicked[i]
                          ? {
                              userSelect: "none",
                              cursor: "pointer",
                              fontSize: "8px",
                              textDecoration: "overline",
                            }
                          : {
                              userSelect: "none",
                              cursor: "pointer",
                              fontSize: "5px",
                            }
                      }
                    >
                      {p.name}
                    </text>
                  </Scroll>
                )}
              </g>
            );
          })}

          <path
            fill="#FF55BB"
            fillOpacity="0.5"
            stroke="#FF0099"
            strokeWidth="0.5"
            d={score}
          />
          {scorePoint.map((p, i) => {
            return (
              <g key={i}>
                <circle
                  className="test"
                  id={p.name + " " + p.value}
                  cx={p.x}
                  cy={p.y}
                  r={1.8}
                  fill="white"
                  fillOpacity={0.6}
                  stroke="#FF0099"
                  strokeWidth={0.5}
                  onMouseMove={(e) => {
                    tooltip.style("visibility", "visible");
                    tooltip
                      .style("top", e.pageY - 20 + "px")
                      .style("left", e.pageX + 10 + "px")
                      .html(p.value);
                  }}
                  onMouseLeave={() => {
                    tooltip.style("visibility", "hidden");
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default RaderChart;
