import { fetchPopularMatches } from "@/services/sportsService";
import React, { useEffect, useState } from "react";
import SportEvent from "../molecules/SportEvent";
import { useErrorHandler } from "@/hooks/useErrorHandler";

const HomeContent = () => {
  const [matches, setMatches] = useState([]);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleFetchMatches = async () => {
      try {
        const response = await fetchPopularMatches();
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
