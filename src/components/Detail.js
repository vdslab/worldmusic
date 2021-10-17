import { count } from "d3-array";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swarmplt from "./draw_swarmplt";

const Detail = () => {
  const country = useSelector((state) => state.detail.country);
  const feature = useSelector((state) => state.detail.feature);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const endMonth = useSelector((state) => state.detail.endMonth);
  const choosedCountry = useSelector((state) => state.detail.choosedCountry);
  const choosedFeature = useSelector((state) => state.detail.choosedFeature);
  const choosedPeriod = useSelector((state) => state.detail.choosedPeriod);

  if (choosedCountry === "No" && choosedFeature === "No" && choosedPeriod === "No") {
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
  } else if (choosedCountry === "Yes" && choosedFeature === "Yes" && choosedPeriod === "Yes" || choosedCountry === "Yes" && choosedFeature === "No" && choosedPeriod === "Yes" ) {
    return (
      <div className="card" style={{ height: "100%" }}>
      <div className="card-content p-2">
        <div className="content">
          <div className="card-content">
            <div className="content">
              {country}、{startMonth} ~ {endMonth}、{feature}
              <Swarmplt />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  } else {
    if (choosedCountry === "No" && choosedFeature === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国・特徴を選んでください。<br />
                    （期間：{startMonth} ~ {endMonth}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else if (choosedCountry === "No" && choosedPeriod === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国・期間を選んでください。<br />
                    （特徴：{feature}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else if (choosedFeature === "No" && choosedPeriod=== "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    期間・特徴を選んでください。<br />
                    （国：{country}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else if (choosedCountry === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    国を選んでください。<br />
                    （期間：{startMonth} ~ {endMonth}、特徴：{feature}）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else if (choosedFeature === "No") {
      return (
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content p-2">
            <div className="content">
              <div className="card-content">
                <div className="content">
                  <p style={{ fontSize: "1.25rem" }}>
                    特徴を選んでください。<br />
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
                    期間を選んでください。<br />
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
