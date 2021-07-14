import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../api";
import RaderChart from "./draw_raderchart";

const TextDetail = ({ data }) => {
  return (
    <div style={{ width: "40%" }}>
      <br />
      <p style={{ marginBottom: "0px" }}>
        テンポ：{Math.round(data[0].tempo)} &ensp; 拍子：
        {data[0].time_signature}　
      </p>
      {/**TODO:キーの情報なしで単調長調だけかぁって感じ*/}
      <p>調：{data[0].mode == 0 ? "短調" : "長調"}</p>
    </div>
  );
};

const Song = () => {
  /**TODO：曲のIDを受け渡してもらう */
  const musicId = "3HVWdVOQ0ZA45FuZGSfvns";
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      /**TODO:リクエストの送り方 */
      const data = await fetchData("", "", "", "ALL", musicId);
      setData(data);
    })();
  }, [musicId]);

  return (
    <div className="my-section">
      <div className="card" style={{ height: "24.25vh" }}>
        <div
          className="card-content"
          style={{ paddingTop: "12px", paddingBottom: "12px" }}
        >
          <div className="content">
            {data.length > 0 ? (
              <div>
                <div>
                  <b>{data[0]?.name}</b>
                </div>
                <div style={{ display: "flex" }}>
                  <TextDetail data={data} />
                  <div
                    style={{
                      width: "150px",
                      paddingTop: "5px",
                    }}
                  >
                    <RaderChart data={data} />
                  </div>
                </div>
              </div>
            ) : (
              []
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
