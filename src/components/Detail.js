import { count } from "d3-array";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swarmplt from "./draw_swarmplt";
import * as d3 from "d3";
import "../tooltip.css";
import "../style.css";
import {
  changeStartMonth,
  changeCountry,
  changeIsSwmpltShowed,
  changeSlectedCount,
} from "../stores/details";

function AboutQuestion() {
  const selectedCount = useSelector((state) => state.detail.selectedCount);
  const tooltip = d3.select(".tooltip-questionMark");
  if (selectedCount) {
    return (
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
              .html("曲の再生回数が多いほど円の大きさは大きくなっている。");
          }}
          onMouseLeave={() => {
            tooltip.style("visibility", "hidden");
          }}
        >
          ?
        </div>
      </div>
    );
  } else {
    return (
      <div className="section p-1">
        <div
          className="box has-background-danger-light"
          style={{ float: "left" }}
        >
          一度に表示できるswarmplotは3つまでです
        </div>
        <div
          className="questionmark"
          onMouseEnter={(e) => {
            tooltip.style("visibility", "visible");
            tooltip
              .style("top", e.pageY - 30 + "px")
              .style("left", e.pageX - 500 + "px")
              .html("曲の再生回数が多いほど円の大きさは大きくなっている。");
          }}
          onMouseLeave={() => {
            tooltip.style("visibility", "hidden");
          }}
          style={{ float: "right" }}
        >
          ?
        </div>
      </div>
    );
  }
}

function CheckBox({ countries, startMonths, isSwarmpltShowed }) {
  const dispatch = useDispatch();
  const deleteData = (index) => {
    const newStartMonth = startMonths.filter((m, i) => index != i);
    const newCountries = countries.filter((c, i) => index != i);
    dispatch(changeStartMonth(newStartMonth));
    dispatch(changeCountry(newCountries));
    dispatch(changeSlectedCount(true));
  };
  console.log(isSwarmpltShowed);
  return (
    <div style={{ justifyContent: "center" }}>
      <div className="card-content py-0">
        {countries.map((element, i) => {
          const year = String(Number(startMonths[i].split("-")[0]));
          let endmonth = String(Number(startMonths[i].split("-")[1]) + 2);
          if (endmonth.length === 1) {
            endmonth = "0" + endmonth;
          }
          return (
            <div style={{ width: "100%", height: "30%" }}>
              <div>
                <label>
                  {element}({startMonths[i]}~{endmonth})　
                </label>
                <button
                  className="delete has-background-danger-light"
                  onClick={() => deleteData(i)}
                  style={{ float: "right" }}
                  st
                />
              </div>

              <Swarmplt c={countries[i]} s={startMonths[i]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Delatebutton() {
  const dispatch = useDispatch();

  return (
    <div className="content has-text-centered">
      <button
        className="button"
        onClick={() => {
          dispatch(changeCountry([]));
          dispatch(changeStartMonth([]));
          dispatch(changeIsSwmpltShowed([]));
          dispatch(changeSlectedCount(true));
        }}
      >
        国・期限を選び直す
      </button>
    </div>
  );
}

const Detail = () => {
  const country = useSelector((state) => state.detail.country);
  const feature = useSelector((state) => state.detail.feature);
  const startMonth = useSelector((state) => state.detail.startMonth);
  const choosedCountry = useSelector((state) => state.detail.choosedCountry);
  const choosedFeature = useSelector((state) => state.detail.choosedFeature);
  const choosedPeriod = useSelector((state) => state.detail.choosedPeriod);
  const isRegionShowed = useSelector((state) => state.detail.isRegionShowed);
  const isSwarmpltShowed = useSelector((state) => state.detail.isSwmpltShowed);
  const selectedCount = useSelector((state) => state.detail.selectedCount);

  const [checkboxCountry, setCheckboxCountry] = useState([]);
  const [checkboxStartMonths, setCheckboxStartMonths] = useState([]);
  const [checkboxIsSwartmpltShowed, setCheckboxIsSwarmpltShowed] = useState([]);

  useEffect(() => {
    (async () => {
      setCheckboxCountry(country);
      setCheckboxStartMonths(startMonth);
      setCheckboxIsSwarmpltShowed(isSwarmpltShowed);
    })();
  }, [country, startMonth, isSwarmpltShowed]);

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
  } else if (checkboxCountry.length === 0 && checkboxStartMonths.length === 0) {
    return (
      <div className="card" style={{ height: "100%" }}>
        <div className="card-content p-2">
          <div className="content">
            <div className="card-content">
              <div className="content">
                <p style={{ fontSize: "1.25rem" }}>
                  国・期間を選んでください。
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
        <div className="card" style={{ width: "100%" }}>
          <div className="card-content p-1" style={{ width: "100%" }}>
            <AboutQuestion />
            {selectedCount ? console.log("true") : console.log("false")}

            <div className="content" style={{ width: "100%" }}>
              <CheckBox
                countries={checkboxCountry}
                startMonths={checkboxStartMonths}
                isSwarmpltShowed={checkboxIsSwartmpltShowed}
              />
            </div>
            <Delatebutton />
          </div>
        </div>
      );
    }
  } else {
    if (choosedCountry === "No" && choosedPeriod === "No") {
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
      // } else if (choosedCountry === "No" && choosedFeature === "No") {
      //   return (
      //     <div className="card" style={{ height: "100%" }}>
      //       <div className="card-content p-2">
      //         <div className="content">
      //           <div className="card-content">
      //             <div className="content">
      //               <p style={{ fontSize: "1.25rem" }}>
      //                 国・特徴を選んでください。
      //                 <br />
      //                 （期間：{startMonth} ~ {endMonth}）
      //               </p>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // } else if (choosedFeature === "No" && choosedPeriod === "No") {
      // return (
      //   <div className="card" style={{ height: "100%" }}>
      //     <div className="card-content p-2">
      //       <div className="content">
      //         <div className="card-content">
      //           <div className="content">
      //             <p style={{ fontSize: "1.25rem" }}>
      //               期間・特徴を選んでください。
      //               <br />
      //               （国：{country}）
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // );
      // } else if (choosedCountry === "No") {
      //   // return (
      //   //   <div className="card" style={{ height: "100%" }}>
      //   //     <div className="card-content p-2">
      //   //       <div className="content">
      //   //         <div className="card-content">
      //   //           <div className="content">
      //   //             <p style={{ fontSize: "1.25rem" }}>
      //   //               国を選んでください。
      //   //               <br />
      //   //               （期間：{startMonth} ~ {endMonth}、特徴：{feature}）
      //   //             </p>
      //   //           </div>
      //   //         </div>
      //   //       </div>
      //   //     </div>
      //   //   </div>
      //   // );
      // } else if (choosedFeature === "No") {
      //   // return (
      //   //   <div className="card" style={{ height: "100%" }}>
      //   //     <div className="card-content p-2">
      //   //       <div className="content">
      //   //         <div className="card-content">
      //   //           <div className="content">
      //   //             <p style={{ fontSize: "1.25rem" }}>
      //   //               特徴を選んでください。
      //   //               <br />
      //   //               （国：{country}、期間：{startMonth} ~ {endMonth}）
      //   //             </p>
      //   //           </div>
      //   //         </div>
      //   //       </div>
      //   //     </div>
      //   //   </div>
      //   );
      // } else if (choosedPeriod === "No") {
      //   // return (
      //   //   <div className="card" style={{ height: "100%" }}>
      //   //     <div className="card-content p-2">
      //   //       <div className="content">
      //   //         <div className="card-content">
      //   //           <div className="content">
      //   //             <p style={{ fontSize: "1.25rem" }}>
      //   //               期間を選んでください。
      //   //               <br />
      //   //               （国：{country}、特徴：{feature}）
      //   //             </p>
      //   //           </div>
      //   //         </div>
      //   //       </div>
      //   //     </div>
      //   //   </div>
      //   // );
      // }
    }
  }
};

export default Detail;
