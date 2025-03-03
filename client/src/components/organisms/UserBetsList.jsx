import React from "react";
import { Skeleton } from "../ui/skeleton";
import UserBetCard from "./UserBetCard";

const UserBetsList = ({ bets, isLoading, emptyMessage }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 mt-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="p-4 mt-4 text-center text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {bets.map((bet) => (
        <UserBetCard key={bet.id} bet={bet} />
      ))}
    </div>
  );
};

export default UserBetsList;
