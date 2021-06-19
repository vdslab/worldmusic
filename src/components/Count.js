import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from "react";
import { CountUp, CountDown } from "../stores/Count";

const Count = () => {
  const dispatch = useDispatch();
  const cnt = useSelector((state) => state.user.count);
  return (
    <div>
      <button className="button" onClick={() => dispatch(CountUp(1))}>
        CountUp
      </button>
      <button className="button" onClick={() => dispatch(CountDown(1))}>
        CountDown
      </button>
      <p>{cnt}</p>
    </div>
  );
};

export default Count;
