import AuthContext from "@/context/authContext";
import React, { useContext } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const renderAuthBtn = () => {
    return !user ? (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    ) : (
      <Button onClick={logout}>Logout</Button>
    );
  };

  const renderUser = () => {
    return user ? (
      <Link to="#" className="text-md font-semibold capitalize">
        &#128274;
        <span>{user.username}</span>
      </Link>
    ) : null;
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
            {renderUser()}
            {renderAuthBtn()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
