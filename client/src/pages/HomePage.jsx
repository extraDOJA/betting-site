import LeftPanel from "@/components/organisms/LeftPanel";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="min-w-[1024px] h-full w-full pt-[75px] grid grid-cols-8 md:grid-cols-9 ">
        <div className="col-span-2">
          <LeftPanel />
        </div>
        <div className="col-span-4 md:col-span-5">
          <h1 className="text-4xl font-semibold">Home Page</h1>
        </div>
        <div className="col-span-2">
        </div>
      </div>
    </div>
  );
};

export default HomePage;
