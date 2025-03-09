import React from "react";
import { Badge } from "@/components/ui/badge";
import BetInfoItem from "./BetInfoItem";
import BetValue from "@/components/atoms/Bet/BetValue";

const BetInfoSummary = ({ totalOdds, amount, potentialWin }) => {
  return (
    <div className="space-y-2">
      <BetInfoItem label="Combined course">
        <Badge className="text-base py-1">{totalOdds}</Badge>
      </BetInfoItem>
      <BetInfoItem label="Stake">
        <BetValue>{amount} $</BetValue>
      </BetInfoItem>
      <BetInfoItem label="Potential winnings">
        <BetValue>{potentialWin} $</BetValue>
      </BetInfoItem>
    </div>
  );
};

export default BetInfoSummary;
