import LeagueHeader from "@/components/molecules/League/LeagueHeader";
import SportEvent from "@/components/molecules/SportEvent";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { sportsAdapter } from "@/services/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const LeagueContent = () => {
  const { leagueSlug } = useParams();
  const [matches, setMatches] = useState([]);
  const [leagueDetails, setLeagueDetails] = useState(null);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const fetchLeagueMatches = async () => {
      try {
        const [leagueDetails, leagueMatches] = await Promise.all([
          sportsAdapter.getLeagueDetails(leagueSlug),
          sportsAdapter.getLeagueMatches(leagueSlug),
        ]);

        setLeagueDetails(leagueDetails);
        setMatches(leagueMatches);
      } catch (error) {
        handleError(error);
      }
    };

    fetchLeagueMatches();
  }, [leagueSlug]);

  return (
    <div>
      <LeagueHeader league={leagueDetails} />
      {matches.map((match) => (
        <SportEvent key={match.id} match={match} />
      ))}
    </div>
  );
};

export default LeagueContent;
