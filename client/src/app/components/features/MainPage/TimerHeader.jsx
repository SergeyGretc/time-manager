import React from "react";

import icon from "../../../assets/icons/arrow-right-circle.svg";

import stop from "../../../assets/icons/stop-circle-fill.svg";

import { formatNumber } from "../../../utils/formatNumber";
const TimerHeader = ({ varMin, varSec, secondsTimer, stopAddSeconds }) => {
  return (
    <div className="container text-center ">
      <span className="text-center p-1 fs-4 align-bottom">{`${formatNumber(
        varMin
      )} : ${formatNumber(varSec)}`}</span>
      <img src={icon} onClick={secondsTimer} className=" p-1 " alt="Старт" />
      <img src={stop} onClick={stopAddSeconds} className=" p-1" alt="Стоп" />
    </div>
  );
};

export default TimerHeader;
