import Navbar from "@/components/organisms/Navbar";
import AuthContext from "@/context/authContext";
import React, { useContext } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <>
    <Navbar />
    <main className="pt-[50px]">
      HomePage
    </main>
    </>
  );
};

export default HomePage;
