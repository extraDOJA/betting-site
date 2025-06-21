import React from "react";
import { formatMatchDate } from "@/utils/formatMatchDate";
import { useBets } from "@/context/betsContext";
import BetButton from "@/components/atoms/Bet/BetButton";
import { Link } from "react-router";

const SportEvent = ({ match }) => {
  const { selectedBets, toggleBet } = useBets();
  const selectedBet = selectedBets[match.id]?.betType;

  return (
    <div className="bg-card rounded-md py-3 px-4 mb-3 text-xs lg:text-base xl:text-lg" style={{ fontFamily: "Helvetica" }}>
      <p className="text-xs text-gray-700 font-medium">{match.queue}</p>
      <div className="flex justify-between items-center">
        <Link to={`/match/${match.id}`} as="p" className="py-5 flex gap-4 items-center">
          <span className="font-bold">{match.home_team}</span>
          <span className="flex flex-col items-center text-xs text-gray-500">{formatMatchDate(match.start_time)}</span>
          <span className="font-bold">{match.away_team}</span>
        </Link>
        <div className="flex gap-2">
          {match.bet_options
            ?.filter((opt) => opt.bet_type === "1X2")
            .map((opt) => (
              <BetButton
                key={opt.value}
                title={opt.value === "home" ? match.home_team : opt.value === "away" ? match.away_team : "Draw"}
                odds={opt.odds}
                isSelected={selectedBet?.betOptionId === opt.id}
                onClick={() => toggleBet(match.id, opt, match)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SportEvent;
