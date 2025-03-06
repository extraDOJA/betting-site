import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import AuthContext from "@/context/authContext";
import { loginRequest } from "@/services/authService";
import { useLocation, useNavigate } from "react-router";
import { useErrorHandler } from "@/hooks/useErrorHandler";

const LoginFormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

const fields = [
  { name: "username", label: "Username", placeholder: "Login", type: "text", autoComplete: "username" },
  { name: "password", label: "Password", placeholder: "Password", type: "password", autoComplete: "current-password" },
];


const LoginForm = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { handleFormError } = useErrorHandler();

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  const onSubmit = async (data, setError) => {
    try {
      const result = await loginRequest(data);
      const accessToken = result.access;
      login(accessToken);
    } catch (err) {
      handleFormError(err, setError, "password");
    }
  };

  return (
    <div>
      <DynamicForm schema={LoginFormSchema} fields={fields} onSubmit={onSubmit} submitBtnText="Login" />
    </div>
  );
};

export default LoginForm;
