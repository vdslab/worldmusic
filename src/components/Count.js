import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from "react";
import { CountUp, CountDown } from "../stores/Count";

const Count = () => {
  //値を更新するための関数
  //dispatch(関数())の引数がaction.payloadに渡される
  const dispatch = useDispatch();
  //値を参照するための関数
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
