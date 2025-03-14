import { sportsAdapter } from "@/services/api";
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

  useEffect(() => {
    // Validate bets on component mount and remove any unavailable bets
    const validateBets = async () => {
      const matchIds = Object.keys(selectedBets);

      if (matchIds.length === 0) return;

      try {
        const availableMatches = await sportsAdapter.validateBetsAvailability({ matchIds });
        const availableMatchIds = new Set(availableMatches.map(match => match.id.toString()));
        const unavailableMatchIds = matchIds.filter(id => !availableMatchIds.has(id));

        if (unavailableMatchIds.length > 0) {
          unavailableMatchIds.forEach((id) => {
            removeBet(id);
          });
        }
      } catch (err) {
        console.error("Error validating bets", err);
      }
    };

    validateBets();
  }, []);

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
