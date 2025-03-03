import React from "react";

const BetLabel = ({ children, className = "" }) => {
  return <span className={`text-muted-foreground font-medium ${className}`}>{children}</span>;
};

export default BetLabel;
