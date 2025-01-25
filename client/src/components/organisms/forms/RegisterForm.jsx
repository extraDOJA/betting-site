import React from "react";
import { z } from 'zod';
import DynamicForm from "./DynamicForm";

const RegisterFormSchema = z.object({
  email: z.string().email(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  repeatPassword: z.string().nonempty(),
});

const RegisterForm = () => {
  const fields = [
    { name: "email", label: "Email", placeholder: "Email", type: "email", autoComplete: "email" },
    { name: "username", label: "Username", placeholder: "Login", type: "text", autoComplete: "username" },
    { name: "password", label: "Password", placeholder: "Password", type: "password", autoComplete: "password" },
    { name: "repeatPassword", label: "Repeat Password", placeholder: "Password", type: "password", autoComplete: "repeat-password" },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return <DynamicForm schema={RegisterFormSchema} fields={fields} onSubmit={onSubmit} submitBtnText="Register" />;
};

export default RegisterForm;
