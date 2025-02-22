import { fetchPopularMatches } from "@/services/sportsService";
import React, { useEffect, useState } from "react";
import SportEvent from "../molecules/SportEvent";

const HomeContent = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const handleFetchMatches = async () => {
        const response = await fetchPopularMatches();
        setMatches(response);
    }
    handleFetchMatches();
  }, []);

  return <>
    {matches.map((match) => <SportEvent key={match.id} match={match} />)}
  </>;
};

export default HomeContent;
