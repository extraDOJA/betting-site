import { formatBet } from "@/utils/formatBet";
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
        [matchId]: formatBet(betType, matchDetails),
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
