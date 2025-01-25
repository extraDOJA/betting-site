import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DynamicForm = ({ schema, fields, onSubmit, submitBtnText = "Submit" }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(fields.map((field) => [field.name, ""])),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-[400px] mx-auto py-5">
        {fields.map((customField) => (
          <Controller
            key={customField.name}
            control={form.control}
            name={customField.name}
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel htmlFor={field.id} className="capitalize">
                  {customField.label}
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder={customField.placeholder}
                    {...field}
                    type={customField.type}
                    autoComplete={customField.autoComplete}
                  />
                </FormControl>
                {error && <FormMessage>{error.message}</FormMessage>}
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full">{submitBtnText}</Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
