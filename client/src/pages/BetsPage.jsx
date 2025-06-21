import BetsTabs from "@/components/organisms/bet/BetsTabs";
import Navbar from "@/components/organisms/navigation/Navbar";

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
