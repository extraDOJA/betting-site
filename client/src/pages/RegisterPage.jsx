import RegisterForm from "@/components/organisms/forms/RegisterForm";
import AuthTemplate from "@/components/templates/AuthTemplate";
import React from "react";
import { Link } from "react-router";

const RegisterPage = () => {
  return (
    <div className="w-100 min-h-[100vh] bg-black px-6 py-6">
      <AuthTemplate title="Register">
        <RegisterForm />
      </AuthTemplate>
      <div className="w-full text-center mt-3 text-xl">
        <Link to="/login" className="text-white text-center mt-3">
          Do you already have an account? <br /> <strong>Login</strong>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
