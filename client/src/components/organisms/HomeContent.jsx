import React, { useEffect, useState } from "react";
import SportEvent from "../molecules/SportEvent";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { sportsAdapter } from "@/services/api";

const HomeContent = () => {
  const [matches, setMatches] = useState([]);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleFetchMatches = async () => {
      try {
        const response = await sportsAdapter.getPopularMatches();
        setMatches(response);
      } catch (err) {
        handleError(err);
      }
    };
    handleFetchMatches();
  }, []);

  return (
    <>
      {matches.map((match) => (
        <SportEvent key={match.id} match={match} />
      ))}
    </>
  );
};

export default HomeContent;
