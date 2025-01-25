import LoginForm from "@/components/organisms/forms/LoginForm";
import AuthTemplate from "@/components/templates/AuthTemplate";
import React from "react";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="w-100 min-h-[100vh] bg-black px-6 py-6">
      <AuthTemplate title="Login">
        <LoginForm />
      </AuthTemplate>
      <div className="w-full text-center mt-3 text-xl">
        <Link to="/register" className="text-white text-center mt-3">
          Don't have an account? <br /> <strong>Register</strong>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
