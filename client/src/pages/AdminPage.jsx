import Navbar from "@/components/organisms/navigation/Navbar";
import AuthContext from "@/context/authContext";
import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.is_superuser) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-100 p-4 mt-[50px]">
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/sports" className="font-bold">
              Sports
            </NavLink>
            <NavLink to="/admin/leagues" className="font-bold">
              Leagues
            </NavLink>
            <NavLink to="/admin/matches" className="font-bold">
              Matches
            </NavLink>
            <NavLink to="/admin/odds" className="font-bold">
              Odds
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto"></main>
      </div>
    </>
  );
};

export default AdminPage;
