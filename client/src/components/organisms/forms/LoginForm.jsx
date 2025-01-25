import React from 'react';
import { z } from 'zod';
import DynamicForm from './DynamicForm';

const LoginFormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

const LoginForm = () => {
  const fields = [
    { name: 'username', label: 'Username', placeholder: 'Login', type: 'text', autoComplete: 'username' },
    { name: 'password', label: 'Password', placeholder: 'Password', type: 'password', autoComplete: 'current-password' },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return <DynamicForm schema={LoginFormSchema} fields={fields} onSubmit={onSubmit} submitBtnText='Login' />;
};

export default LoginForm;
