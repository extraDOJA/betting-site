import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useBets } from "@/context/betsContext";
import { BetItem } from "../atoms/BetItem";
import { BetSummary } from "../molecules/BetSummary";
import BetsList from "../molecules/BetsList";
import AuthContext from "@/context/authContext";

const RightPanel = () => {
  const {user} = useContext(AuthContext);
  const { selectedBets, removeBet } = useBets();
  const [stake, setStake] = useState(0);

  const betsCount = Object.keys(selectedBets).length;

  const totalMultiplier = Object.values(selectedBets)
    .reduce((acc, bet) => acc * parseFloat(bet.odds), 1)
    .toFixed(2);

  return (
    <div className="mx-auto rounded-xl bg-card min-h-[500px] h-[70vh] max-w-[350px] flex flex-col" style={{ fontFamily: "Helvetica" }}>
      <div className="p-2 font-bold text-sm">
        {betsCount} {betsCount === 1 ? "event" : "events"}
      </div>
      <hr />
      <BetsList betsCount={betsCount} bets={selectedBets} onRemoveBet={removeBet} />
      <hr />
      <div className="p-2 font-bold text-sm">
        <BetSummary
          stake={stake}
          betsCount={betsCount}
          totalMultiplier={betsCount > 0 ? totalMultiplier : 0}
          onStakeChange={(e) => setStake(e.target.value)}
        />
        <Button variant="destructive" className="w-full font-bold" disabled={betsCount === 0 || !user}>
          Place bet
        </Button>
      </div>
    </div>
  );
};

export default RightPanel;
