import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthContext from "@/context/authContext";
import { showSuccessToast } from "@/services/toastService";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { userAdapter } from "@/services/api";

const balanceSchema = z.object({
  amount: z.number({ invalid_type_error: "The amount must be a number" }).min(1, "The amount must be greater than 0"),
});

const AddBalanceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(balanceSchema),
    defaultValues: { amount: 0 },
  });

  const { handleSetBalance } = useContext(AuthContext);
  const { toast } = useToast();
  const { handleFormError } = useErrorHandler();

  const onSubmit = useCallback(
    async (data) => {
      try {
        const result = await userAdapter.addBalance(data);
        handleSetBalance(result.balance);
        showSuccessToast(toast, result.message);
      } catch (err) {
        handleFormError(err, setError, "amount");
      }
    },
    [handleSetBalance, toast]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="relative mt-2">
          <Input id="amount" type="number" {...register("amount", { valueAsNumber: true })} className="p-6 block w-full pr-12 text-2xl" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-xl">$</span>
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600 italic font-semibold">{errors.amount.message}</p>}
      </div>
      <hr />
      <Button type="submit" className="w-full">
        Add balance
      </Button>
    </form>
  );
};

export default AddBalanceForm;
