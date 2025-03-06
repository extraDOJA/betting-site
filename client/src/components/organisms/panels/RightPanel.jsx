import React, { useContext, useState } from "react";
import { Button } from "../../ui/button";
import { useBets } from "@/context/betsContext";
import { BetSummary } from "../../molecules/Bet/BetSummary";
import AuthContext from "@/context/authContext";
import { createBetSlip } from "@/services/sportsService";
import { useToast } from "@/hooks/use-toast";
import { showSuccessToast } from "@/services/toastService";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import BetsList from "@/components/organisms/bet/BetsList";

const RightPanel = () => {
  const { user, handleSetBalance } = useContext(AuthContext);
  const { selectedBets, removeBet, clearBets } = useBets();
  const [stake, setStake] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { handleError } = useErrorHandler();

  const betsCount = Object.keys(selectedBets).length;

  const totalMultiplier = Object.values(selectedBets)
    .reduce((acc, bet) => acc * parseFloat(bet.odds), 1)
    .toFixed(2);

  const handlePlaceBet = async () => {
    try {
      setIsLoading(true);

      const betSlipData = {
        total_amount: parseFloat(stake),
        bets: Object.entries(selectedBets).map(([matchId, bet]) => ({
          match: parseInt(matchId),
          bet_choice: bet.betType,
          odds: parseFloat(bet.odds),
        })),
      };

      const data = await createBetSlip(betSlipData);
      handleSetBalance(data.user_balance);

      showSuccessToast(toast, "Bet placed successfully!");
      clearBets();
      setStake(0);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = betsCount > 0 && stake > 0 && user;

  return (
    <div className="mx-auto rounded-xl bg-card min-h-[500px] h-[70vh] max-w-[350px] flex flex-col" style={{ fontFamily: "Helvetica" }}>
      <div className="p-2 font-bold text-sm">
        {betsCount} {betsCount === 1 ? "event" : "events"}
      </div>
      <hr />
      <BetsList betsCount={betsCount} bets={selectedBets} onRemoveBet={removeBet} />
      <hr />
      <div className="p-2 font-bold text-sm">
        <BetSummary
          stake={stake}
          betsCount={betsCount}
          totalMultiplier={betsCount > 0 ? totalMultiplier : 0}
          onStakeChange={(e) => setStake(e.target.value)}
        />
        <Button variant="destructive" className="w-full font-bold" disabled={!isFormValid || isLoading} onClick={handlePlaceBet}>
          {isLoading ? "Placing Bet..." : "Place Bet"}
        </Button>
      </div>
    </div>
  );
};

export default RightPanel;
