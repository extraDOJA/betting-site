import React from "react";

const BetValue = ({ children, bold = true, className = "" }) => {
  return <span className={`${bold ? "font-bold" : ""} ${className}`}>{children}</span>;
};

export default BetValue;
