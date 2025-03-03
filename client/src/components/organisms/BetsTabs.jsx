import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useUserBets from "@/hooks/useUserBets";
import UserBetsList from "./UserBetsList";
import { motion } from "framer-motion";

const BetsTabs = () => {
  const { groupedBets, loading, changeFilter } = useUserBets();
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

  return (
    <Tabs defaultValue="open" className="max-w-[600px] mx-auto my-7" onValueChange={handleTabChange}>
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="open">Open Bets</TabsTrigger>
        <TabsTrigger value="resolved">Resolved Bets</TabsTrigger>
        <TabsTrigger value="won">Won Bets</TabsTrigger>
      </TabsList>
      <hr />
      <TabsContent value="open" className="min-h-[300px]">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} key={`open-${loading}`}>
          <UserBetsList bets={openBets} isLoading={loading} />
        </motion.div>
      </TabsContent>
      <TabsContent value="resolved" className="min-h-[300px]">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} key={`open-${loading}`}>
          <UserBetsList bets={finishedBets} isLoading={loading} />
        </motion.div>
      </TabsContent>
      <TabsContent value="won" className="min-h-[300px]">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} key={`open-${loading}`}>
          <UserBetsList bets={wonBets} isLoading={loading} />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default BetsTabs;
