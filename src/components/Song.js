import React from "react";
import { useState, useEffect } from "react";
import { fetchSongData } from "../api";
import RaderChart from "./draw_raderchart";
import { useSelector } from "react-redux";

const TextDetail = ({ data }) => {
  return (
    <div style={{ width: "40%", fontSize: "1.125vw" }}>
      <br />
      <p style={{ marginBottom: "0px" }}>テンポ：{Math.round(data[0].tempo)}</p>
      <p style={{ marginBottom: "0px" }}>拍子：{data[0].time_signature}　</p>
      {/**TODO:キーの情報なしで単調長調だけかぁって感じ*/}
      <p>調：{data[0].mode == 0 ? "短調" : "長調"}</p>
    </div>
  );
};

const Song = () => {
  /**TODO：曲のIDを受け渡してもらう */
  const musicId = useSelector((state) => state.detail.musicid);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      /**TODO:リクエストの送り方 */
      const data = await fetchSongData("", "", "", "ALL", musicId);
      setData(data);
    })();
  }, [musicId]);
  return (
    <div className="my-section">
      <div className="card" style={{ minHeight: "26.75vh" }}>
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
              <div>
                <p>曲詳細</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
