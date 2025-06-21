import React, { useEffect, useState } from "react";
import SportEvent from "../molecules/SportEvent";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { sportsAdapter } from "@/services/api";
import EmptyMessage from "../atoms/EmptyMessage";

const HomeContent = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleFetchMatches = async () => {
      try {
        const response = await sportsAdapter.getPopularMatches();
        setMatches(response);
        setLoading(false);
      } catch (err) {
        handleError(err);
      }
    };
    handleFetchMatches();
  }, []);

  return (
    <>
      {!loading && matches.length > 0 ? (
        matches.map((match) => <SportEvent key={match.id} match={match} />)
      ) : (
        <EmptyMessage title={"No Bets!"} message={"No active bets in our database."} />
      )}
    </>
  );
};

export default HomeContent;
