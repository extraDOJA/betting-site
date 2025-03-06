import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import BetCardHeader from "@/components/molecules/Bet/BetCardHeader";
import "@/css/accordion-overrides.css";
import BetInfoSummary from "@/components/molecules/Bet/BetInfoSummary";
import DateDisplay from "@/components/atoms/DateDisplay";

const UserBetCard = ({ bet }) => {
  return (
    <Card className="w-full" style={{ fontFamily: "Helvetica" }}>
      <BetCardHeader bet={bet} />
      <CardContent>
        <BetInfoSummary totalOdds={bet.total_odds} amount={bet.total_amount} potentialWin={bet.potential_win} />
      </CardContent>
      <CardFooter className="p-3">
        <div className="w-full text-sm text-end">
          <hr />
          <div className="mt-2">
            <DateDisplay date={bet.created_at} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserBetCard;
