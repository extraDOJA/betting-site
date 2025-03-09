import AddBalanceForm from "@/components/organisms/forms/AddBalanceForm";
import Navbar from "@/components/organisms/navigation/Navbar";
import React from "react";

const BalancePage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[50px] container mx-auto">
        <h1 className="text-center text-2xl font-bold py-3">Add Balance</h1>
        <div className="flex justify-center px-4">
          <div className="bg-white shadow rounded-lg p-6 max-w-[600px] w-full">
            <AddBalanceForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default BalancePage;
