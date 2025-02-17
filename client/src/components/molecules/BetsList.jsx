import React from "react";
import { BetItem } from "../atoms/BetItem";

const BetsList = ({ betsCount, bets, onRemoveBet }) => {
  return (
    <div className="p-2 font-bold text-sm flex-1">
      {betsCount === 0 ? (
        <div className="flex items-center justify-center h-full italic text-lg text-gray-500 ">Add first bet</div>
      ) : (
        <div className="space-y-2">
          {Object.entries(bets).map(([matchId, bet]) => (
            <>
              <BetItem key={matchId} bet={bet} matchId={matchId} onRemove={() => onRemoveBet(matchId)} />
              <hr />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default BetsList;
