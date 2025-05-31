import LeftPanel from "@/components/organisms/panels/LeftPanel";
import Navbar from "@/components/organisms/navigation/Navbar";
import RightPanel from "@/components/organisms/panels/RightPanel";
import { BetsProvider } from "@/context/betsContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { sportsAdapter } from "@/services/api";
import SportEvent from "@/components/molecules/SportEvent";
import ErrorMessage from "@/components/atoms/ErrorMessage";

const MatchPage = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setError(null);
        const response = await sportsAdapter.getMatchDetails(matchId);
        if (response.error) {
          throw new Error(response.error);
        }
        setMatchData(response);
      } catch (error) {
        setMatchData(null);
        setError(error.message || error || "An error occurred while fetching match data.");
        console.error("Error fetching match data:", error);
      }
    };
    fetchMatchData();
  }, [matchId]);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <BetsProvider>
        <main className="min-w-[1024px] h-full w-full pt-[75px] grid grid-cols-8 lg:grid-cols-9 ">
          <section className="col-span-2 lg:col-span-2">
            <LeftPanel />
          </section>
          <section className="col-span-4 lg:col-span-5 px-4 lg:px-2">
            {error ? (
              <ErrorMessage error={error} />
            ) : matchData ? (
              <>
                <SportEvent match={matchData} />
              </>
            ) : (
              <div className="text-center text-gray-500">Loading match data...</div>
            )}
          </section>
          <section className="col-span-2 lg:col-span-2">
            <RightPanel />
          </section>
        </main>
      </BetsProvider>
    </div>
  );
};

export default MatchPage;
