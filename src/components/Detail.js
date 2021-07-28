import React from "react";
import Swarmplt from "./draw_swarmplt";

const Detail = () => {
  return (
    <div className="">
      <div className="card" /*style={{ height: "39.25vh" }}*/>
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
