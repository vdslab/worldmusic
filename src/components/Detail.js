import { count } from "d3-array";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swarmplt from "./draw_swarmplt";
import * as d3 from "d3";
import "../tooltip.css";

const Detail = () => {
  const country = useSelector((state) => state.detail.country);
  const feature = useSelector((state) => state.detail.feature);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const choosedCountry = useSelector((state) => state.detail.choosedCountry);
  const choosedFeature = useSelector((state) => state.detail.choosedFeature);
  const choosedPeriod = useSelector((state) => state.detail.choosedPeriod);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);

  const tooltip = d3.select(".tooltip-questionMark");

  if (
    choosedCountry === "No" &&
    choosedFeature === "No" &&
    choosedPeriod === "No"
  ) {
    return (
      <div className="card" style={{ height: "100%" }}>
        <div className="card-content p-2">
          <div className="content">
            <div className="card-content">
              <div className="content">
                <p style={{ fontSize: "1.25rem" }}>
                  国・期間・特徴を選んでください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    (choosedCountry === "Yes" &&
      choosedFeature === "Yes" &&
      choosedPeriod === "Yes") ||
    (choosedCountry === "Yes" &&
      choosedFeature === "No" &&
      choosedPeriod === "Yes")
  ) {
    if (!isRegionShowed) {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>データ取得中・・・</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-1" style={{ height: "100%" }}>
            <div
              className="section p-1"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="questionmark"
                onMouseEnter={(e) => {
                  tooltip.style("visibility", "visible");
                  tooltip
                    .style("top", e.pageY - 30 + "px")
                    .style("left", e.pageX - 500 + "px")
                    .html(
                      "曲の再生回数が多いほど円の大きさは大きくなっている。"
                    );
                }}
                onMouseLeave={() => {
                  tooltip.style("visibility", "hidden");
                }}
              >
                ?
              </div>
            </div>
            <div className="content">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-content m-1">
                  <div className="content">
                    {country}（{startMonth}~{endMonth}）
                  </div>
                </div>
              </div>
              <Swarmplt />
            </div>
          </div>
        </div>
      );
    }
  } else {
    if (choosedCountry === "No" && choosedFeature === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国・特徴を選んでください。
                    <br />
                    （期間：{startMonth} ~ {endMonth}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (choosedCountry === "No" && choosedPeriod === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国・期間を選んでください。
                    <br />
                    （特徴：{feature}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (choosedFeature === "No" && choosedPeriod === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    期間・特徴を選んでください。
                    <br />
                    （国：{country}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (choosedCountry === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国を選んでください。
                    <br />
                    （期間：{startMonth} ~ {endMonth}、特徴：{feature}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (choosedFeature === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    特徴を選んでください。
                    <br />
                    （国：{country}、期間：{startMonth} ~ {endMonth}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (choosedPeriod === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    期間を選んでください。
                    <br />
                    （国：{country}、特徴：{feature}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Detail;
