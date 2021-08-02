import React from "react";
import Swarmplt from "./draw_swarmplt";

const Detail = () => {
  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-content p-2">
        <div className="content">
          <Swarmplt />
        </div>
      </div>
    </div>
  );
};

export default Detail;
