import React from "react";

import icon from "../../../assets/icons/arrow-right-circle.svg";

import stop from "../../../assets/icons/stop-circle-fill.svg";
const TimerHeader = ({ varMin, varSec, secondsTimer, stopAddSeconds }) => {
  function createCorrectSec() {
    const newSec = varSec < 10 ? "0" + varSec : varSec;
    return newSec;
  }
  function createCorrectMin() {
    const newMin = varMin < 10 ? "0" + varMin : varMin;
    return newMin;
  }
  return (
    <div className="container text-center ">
      <span className="text-center p-1 fs-4 align-bottom">{`${createCorrectMin()} : ${createCorrectSec()}`}</span>
      <img src={icon} onClick={secondsTimer} className=" p-1 " alt="Старт" />
      <img src={stop} onClick={stopAddSeconds} className=" p-1" alt="Стоп" />
    </div>
  );
};

export default TimerHeader;
