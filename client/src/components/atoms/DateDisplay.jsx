import React from "react";
import { formatBetDate } from "@/utils/formatBet";

const DateDisplay = ({ date, className = "" }) => {
  return <div className={`text-xs font-semibold text-gray-500 ${className}`}>{formatBetDate(date)}</div>;
};

export default DateDisplay;
