import React from "react";
import BetLabel from "@/components/atoms/Bet/BetLabel";

const BetInfoItem = ({ label, children }) => {
  return (
    <div className="flex justify-between">
      <BetLabel>{label}</BetLabel>
      {children}
    </div>
  );
};

export default BetInfoItem;
