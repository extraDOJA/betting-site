import React from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { authAdapter } from "@/services/api";

const RegisterFormSchema = z
  .object({
    email: z.string().email().max(254),
    username: z
      .string()
      .nonempty()
      .max(150)
      .regex(/^[\w.@+-]+$/, { message: "Letters, digits and @/./+/-/_ only." }),
    password: z.string().nonempty().max(128),
    repeatPassword: z.string().nonempty().max(128),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

const fields = [
  { name: "email", label: "Email", placeholder: "Email", type: "email", autoComplete: "email" },
  { name: "username", label: "Username", placeholder: "Login", type: "text", autoComplete: "username" },
  { name: "password", label: "Password", placeholder: "Password", type: "password", autoComplete: "password" },
  { name: "repeatPassword", label: "Repeat Password", placeholder: "Password", type: "password", autoComplete: "repeat-password" },
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleFormError } = useErrorHandler();

  const onSubmit = async (data, setError) => {
    try {
      await authAdapter.register(data);
      toast({ title: "Success", description: "Account created successfully" });
      navigate("/login");
    } catch (err) {
      handleFormError(err, setError, "repeatPassword");
    }
  };

  return <DynamicForm schema={RegisterFormSchema} fields={fields} onSubmit={onSubmit} submitBtnText="Register" />;
};

export default RegisterForm;
