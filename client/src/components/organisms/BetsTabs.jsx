import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useUserBets from "@/hooks/useUserBets";
import UserBetsList from "./UserBetsList";

const BetsTabs = () => {
  const { groupedBets } = useUserBets();
  const { open: openBets, finished: finishedBets, won: wonBets } = groupedBets;
  return (
    <Tabs defaultValue="open" className="max-w-[600px] mx-auto my-7">
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="open">Open Bets</TabsTrigger>
        <TabsTrigger value="resolved">Resolved Bets</TabsTrigger>
        <TabsTrigger value="won">Won Bets</TabsTrigger>
      </TabsList>
      <hr />
      <TabsContent value="open">
        <UserBetsList bets={openBets} />
      </TabsContent>
      <TabsContent value="resolved">
        <UserBetsList bets={finishedBets} />
      </TabsContent>
      <TabsContent value="won">
        <UserBetsList bets={wonBets} />
      </TabsContent>
    </Tabs>
  );
};

export default BetsTabs;
