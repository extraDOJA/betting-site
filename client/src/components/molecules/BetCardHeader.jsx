import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/atoms/StatusBadge";
import MatchItem from "./MatchItem";

const BetCardHeader = ({ bet }) => {
  const getBetTitle = () => {
    if (!bet.matches_data || !Array.isArray(bet.matches_data)) {
      return "Bet";
    }

    const matchCount = bet.matches_data.length;

    if (matchCount === 0) {
      return "Bet";
    } else if (matchCount === 1) {
      return "Single Bet";
    } else {
      return `Multi Bet (${matchCount} matches)`;
    }
  };

  const hasMatchesData = bet.matches_data && Array.isArray(bet.matches_data) && bet.matches_data.length > 0;

  if (!hasMatchesData) return null;

  return (
    <CardHeader>
      <Accordion type="single" collapsible className="custom-accordion">
        <AccordionItem value="matches" className="">
          <AccordionTrigger className="text-muted-foreground font-medium pt-0 mt-0 border-b-0 hover:no-underline">
            <div className="flex justify-between items-center w-full">
              <CardTitle>{getBetTitle()}</CardTitle>
              <StatusBadge status={bet.status} />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              {bet.matches_data.map((match, index) => (
                <MatchItem key={index} match={match} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardHeader>
  );
};

export default BetCardHeader;
