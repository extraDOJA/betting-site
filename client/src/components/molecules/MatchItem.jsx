import React from "react";
import BetValue from "@/components/atoms/Bet/BetValue";

const MatchItem = ({ match }) => {
  return (
    <div className="py-2 border-b last:border-0">
      <div className="flex justify-between font-medium items-center">
        <div>
          <span className="font-semibold text-lg">
            {match.home_team} vs {match.away_team}
          </span>
          {match.status === "finished" && (
            <span className="text-lg ml-2 text-muted-foreground font-semibold">
              ({match.home_score}:{match.away_score})
            </span>
          )}
          <div className="text-muted-foreground">
            <span className="uppercase font-bold">{match.bet_choice}</span>
          </div>
        </div>
        <div>
          <BetValue className="text-lg">{match.odds.toFixed(2)}</BetValue>
        </div>
      </div>
    </div>
  );
};

export default MatchItem;