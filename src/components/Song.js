import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../api";

const Song = () => {
  const musicId = "3eekarcy7kvN4yt5ZFzltW";
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchData("", "", "", "ALL", musicId);
      setData(data);
    })();
  }, [musicId]);

  console.log(data);

  return (
    <div className="my-section">
      <div className="card" style={{ height: "24.25vh" }}>
        <div className="card-content">
          <div className="content">
            <div>
              <span>曲詳細 </span>
              {data[0]?.name}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "40%" }}>
                <ul>
                  <li>テンポ：{data[0].tempo}</li>
                  <li>拍子：{data[0].time_signature}</li>
                  <li>調：{data[0].mode == 0 ? "短調" : "長調"}</li>
                </ul>
              </div>
              <div style={{ width: "60%" }}>chart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
