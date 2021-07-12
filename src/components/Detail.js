import React from "react";
import Swarmplt from "./swarmplt";

const Detail = () => {
  return (
    <div className="my-section">
      <div className="card" style={{ height: "30vh", width: "100vh" }}>
        <div className="card-content">
          <div className="content">
            <Swarmplt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
