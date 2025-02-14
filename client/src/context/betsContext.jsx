import React, { createContext, useContext, useState } from "react";

const BetsContext = createContext();

export const BetsProvider = ({ children }) => {
  const [selectedBets, setSelectedBets] = useState({});

  const toggleBet = (matchId, betType) => {
    setSelectedBets((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === betType ? null : betType,
    }));
    console.log(selectedBets);
  };

  return <BetsContext.Provider value={{ selectedBets, toggleBet }}>{children}</BetsContext.Provider>;
};

export const useBets = () => useContext(BetsContext);
