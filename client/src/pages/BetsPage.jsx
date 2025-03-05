import BetsTabs from "@/components/organisms/BetsTabs";
import Navbar from "@/components/organisms/Navbar";
import React, { useEffect, useState } from "react";

const BetsPage = () => {  
  return (
    <>
      <Navbar />
      <main className="pt-[50px]">
        <BetsTabs />
      </main>
    </>
  );
};

export default BetsPage;
