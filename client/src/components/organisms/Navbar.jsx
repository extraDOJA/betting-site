import AuthContext from "@/context/authContext";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import UserNavigationMenu from "../molecules/UserNavigationMenu";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderAuthBtn = () => {
    return !user ? (
      <Link to="/login" className="w-[90vw] md:w-[auto]">
        <Button className="w-[100%]">Login</Button>
      </Link>
    ) : (
      <Button onClick={logout} className="w-[90vw] md:w-[auto]">
        Logout
      </Button>
    );
  };

  return (
    <nav className="fixed top-0 h-[50px] w-full bg-black">
      <div className="container mx-auto h-full sm:px-5 px-3">
        <div className="flex justify-between items-center h-full">
          <div className="text-white">
            <Link to="/">
              <h1 className="text-2xl mb-1 font-semibold italic">BET-SITE</h1>
            </Link>
          </div>
          <div className="flex items-center text-white gap-7">
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              &#9776;
            </button>
            <div className={`hidden md:flex items-center gap-5`}>
              {user && <Button onClick={() => navigate("#")}>{user.balance} $</Button>}
              {user && <UserNavigationMenu user={user} />}
              {renderAuthBtn()}
            </div>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden absolute top-[50px] left-0 w-full bg-black flex-col sm:flex-row items-center`}>
        <div className="container mx-auto sm:px-5 px-3 py-5">
          <div className="flex flex-col items-center gap-3">
            {user && (
              <Button onClick={() => navigate("#")} className="w-[90vw] md:w-[auto]">
                {user.balance} $
              </Button>
            )}
            {user && <UserNavigationMenu user={user} />}
            {renderAuthBtn()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
