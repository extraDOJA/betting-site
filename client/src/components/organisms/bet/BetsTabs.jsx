import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import useUserBets from "@/hooks/useUserBets";
import UserBetsList from "./UserBetsList";
import { motion } from "framer-motion";
import BetsPagination from "../../molecules/Bet/BetsPagination";

const BetsTabs = () => {
  const { groupedBets, loading, changeFilter, page, totalPages, changePage } = useUserBets();
  const { open: openBets, finished: finishedBets, won: wonBets } = groupedBets;

  const handleTabChange = (value) => {
    // Map tab values to filter objects
    const filters = {
      open: "open",
      resolved: "finished",
      won: "won",
    };

    // Apply the filter when tab changes
    if (filters[value]) {
      changeFilter(filters[value]);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.75 } },
  };

  const renderTabContent = (bets, emptyMessage) => (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} key={`content-${loading}-${page}`}>
      <UserBetsList 
        bets={bets} 
        isLoading={loading} 
        emptyMessage={emptyMessage} 
      />
      <BetsPagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={changePage} 
      />
    </motion.div>
  );

  return (
    <Tabs defaultValue="open" className="max-w-[600px] mx-auto my-7" onValueChange={handleTabChange}>
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="open">Open Bets</TabsTrigger>
        <TabsTrigger value="resolved">Resolved Bets</TabsTrigger>
        <TabsTrigger value="won">Won Bets</TabsTrigger>
      </TabsList>
      <hr />
      <TabsContent value="open" className="min-h-[300px]">
        {renderTabContent(openBets, "No open bets found")}
      </TabsContent>
      <TabsContent value="resolved" className="min-h-[300px]">
      {renderTabContent(finishedBets, "No resolved bets found")}
      </TabsContent>
      <TabsContent value="won" className="min-h-[300px]">
      {renderTabContent(wonBets, "No won bets found")}
      </TabsContent>
    </Tabs>
  );
};

export default BetsTabs;
