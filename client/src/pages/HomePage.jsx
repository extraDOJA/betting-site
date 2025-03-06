import HomeContent from "@/components/organisms/HomeContent";
import LeftPanel from "@/components/organisms/panels/LeftPanel";
import Navbar from "@/components/organisms/navigation/Navbar";
import RightPanel from "@/components/organisms/panels/RightPanel";
import { BetsProvider } from "@/context/betsContext";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <BetsProvider>
      <main className="min-w-[1024px] h-full w-full pt-[75px] grid grid-cols-8 md:grid-cols-9 ">
        <section className="col-span-2">
          <LeftPanel />
        </section>
        <section className="col-span-4 md:col-span-5">
          <HomeContent />
        </section>
        <section className="col-span-2">
          <RightPanel />
        </section>
      </main>
      </BetsProvider>
    </div>
  );
};

export default HomePage;
