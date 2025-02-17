import React, { createContext, useContext, useState } from "react";

const BetsContext = createContext();

export const BetsProvider = ({ children }) => {
  const [selectedBets, setSelectedBets] = useState({});

  const removeBet = (matchId) => {
    setSelectedBets((prev) => {
      const { [matchId]: _, ...rest } = prev;
      return rest;
    });
  };

  const toggleBet = (matchId, betType, matchDetails) => {
    setSelectedBets((prev) => {
      if (prev[matchId] && prev[matchId].betType === betType) {
        const { [matchId]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [matchId]: {
          betType,
          homeTeam: matchDetails.home_team,
          awayTeam: matchDetails.away_team,
          odds: betType === 'home' 
            ? matchDetails.home_win_odds 
            : betType === 'away' 
            ? matchDetails.away_win_odds 
            : matchDetails.draw_odds
        }
      };
    });
  };

  return (
    <BetsContext.Provider value={{ selectedBets, toggleBet, removeBet }}>
      {children}
    </BetsContext.Provider>
  );
};

export const useBets = () => useContext(BetsContext);
