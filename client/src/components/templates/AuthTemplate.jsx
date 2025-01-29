import React from "react";
import { Link } from "react-router";

const AuthTemplate = ({ title = "Login", children }) => {
  return (
    <>
      <Link to="/" className="font-bold text-white ml-5 mt-6 top-5 left-2">
        &#10005;
      </Link>
      <div className="flex justify-center items-center flex-col gap-5 mt-[25px]">
        <h1 className="font-bold text-white text-5xl italic">BET-SITE</h1>
        <div className="form-wrapper shadow-xl bg-white py-6 px-10 rounded-lg container max-w-[400px]">
          <h2 className="text-2xl text-center font-bold my-3">{title}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthTemplate;
