import { formatBet } from "@/utils/formatBet";
import React, { createContext, useContext, useEffect, useState } from "react";

const BetsContext = createContext();
const STORAGE_KEY = "selectedBets";

export const BetsProvider = ({ children }) => {
  const [selectedBets, setSelectedBets] = useState(() => {
    // Initialize selectedBets from localStorage if available
    const storedBets = localStorage.getItem(STORAGE_KEY);
    if (storedBets) {
      return JSON.parse(storedBets);
    }
    return {};
  });

  useEffect(() => {
    // Save selected bets to localStorage whenever they change
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedBets));
    } catch (err) {
      console.error("Error saving bets to localStorage", err);
    }
  }, [selectedBets]);

  const clearBets = () => setSelectedBets({});

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

  const context = {
    selectedBets,
    clearBets,
    toggleBet,
    removeBet,
  };

  return <BetsContext.Provider value={context}>{children}</BetsContext.Provider>;
};

export const useBets = () => useContext(BetsContext);
