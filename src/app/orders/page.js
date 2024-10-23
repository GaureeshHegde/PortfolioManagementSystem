"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify"; // Using react-toastify for toast notifications

// Zod Schema for form validation
const formSchema = z.object({
  stockSymbol: z
    .string()
    .min(1, { message: "Stock symbol is required" })
    .max(5, { message: "Stock symbol must be 5 characters or less" })
    .toUpperCase(),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .max(10000, { message: "Quantity must be 10,000 or less" }),
  action: z.enum(["buy", "sell"], {
    required_error: "You need to select an action",
  }),
});

// Mock function to simulate API call
const mockTradeStock = async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    success: true,
    message: `Successfully ${values.action === "buy" ? "bought" : "sold"} ${values.quantity} shares of ${values.stockSymbol}`,
    transaction: {
      stockSymbol: values.stockSymbol,
      quantity: values.quantity,
      action: values.action,
      price: 150.25, // Mock price
    },
  };
};

export default function BuySellPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockSymbol: "",
      quantity: 1,
      action: "buy",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const result = await mockTradeStock(values);
      if (result.success) {
        toast.success(result.message); // Show success toast
        reset();
      } else {
        throw new Error("Trade failed");
      }
    } catch (error) {
      toast.error("There was a problem executing your trade. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card max-w-md mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Buy/Sell Stocks</h2>
          <p>Enter the details of your trade below.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Stock Symbol */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock Symbol</span>
              </label>
              <input
                type="text"
                placeholder="AAPL"
                className="input input-bordered"
                {...register("stockSymbol")}
              />
              {errors.stockSymbol && (
                <p className="text-red-500">{errors.stockSymbol.message}</p>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Please enter the exact stock symbol.
                </span>
              </label>
            </div>

            {/* Quantity */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="1"
                className="input input-bordered"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity.message}</p>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Enter the number of shares you want to trade
                </span>
              </label>
            </div>

            {/* Buy/Sell Radio Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Action</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="buy"
                    className="radio radio-success"
                    {...register("action")}
                    defaultChecked
                  />
                  <span>Buy</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="sell"
                    className="radio radio-error"
                    {...register("action")}
                  />
                  <span>Sell</span>
                </label>
              </div>
              {errors.action && (
                <p className="text-red-500">{errors.action.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Execute Trade"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
