'use client'

<<<<<<< HEAD
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// Mock data for order history
const initialOrders = [
  { id: 1, symbol: "AAPL", quantity: 10, type: "Buy", date: "2023-06-01T10:30:00Z" },
  { id: 2, symbol: "GOOGL", quantity: 5, type: "Sell", date: "2023-06-02T14:45:00Z" },
  { id: 3, symbol: "MSFT", quantity: 15, type: "Buy", date: "2023-06-03T09:15:00Z" },
];

export default function BuySellPage() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [orders, setOrders] = useState(initialOrders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
=======
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
})

const mockTradeStock = async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    message: `Successfully ${values.action === "buy" ? "bought" : "sold"} ${values.quantity} shares of ${values.stockSymbol}`,
    transaction: {
      stockSymbol: values.stockSymbol,
      quantity: values.quantity,
      action: values.action,
      price: 150.25,
    },
  }
}

export default function BuySellPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockSymbol: "",
      quantity: 1,
      action: "buy",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const result = await mockTradeStock(values)
      if (result.success) {
        toast.success(result.message)
        form.reset()
      } else {
        throw new Error("Trade failed")
      }
    } catch (error) {
      toast.error("There was a problem executing your trade. Please try again.")
    } finally {
      setIsLoading(false)
>>>>>>> e664addef1b926778d109fe5803c7ea6b19549f1
    }

    const newOrder = {
      id: orders.length + 1,
      symbol: symbol.toUpperCase(),
      quantity: parseInt(quantity),
      type: action === "buy" ? "Buy" : "Sell",
      date: new Date().toISOString(),
    };

    setOrders([newOrder, ...orders]);
    toast({
      title: "Order Placed",
      description: `${action === "buy" ? "Bought" : "Sold"} ${quantity} shares of ${symbol.toUpperCase()}`,
    });

    // Reset form
    setSymbol("");
    setQuantity("");
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Buy/Sell Stocks</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Place Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="symbol" className="label">
                  <span className="label-text">Stock Symbol</span>
                </label>
                <input
                  id="symbol"
                  className="input input-bordered w-full"
                  placeholder="e.g., AAPL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="label-text">Action</label>
                <div className="flex space-x-4">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      className="radio"
                      value="buy"
                      checked={action === "buy"}
                      onChange={() => setAction("buy")}
                    />
                    <span className="ml-2">Buy</span>
                  </label>
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      className="radio"
                      value="sell"
                      checked={action === "sell"}
                      onChange={() => setAction("sell")}
                    />
                    <span className="ml-2">Sell</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Place Order
              </button>
            </form>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Order History</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-bold">{order.symbol}</td>
                      <td>{order.quantity}</td>
                      <td>{order.type}</td>
                      <td>{new Date(order.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
=======
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001f3f] to-black text-white">
      <main className="flex-1 container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto bg-[#0a2a4d] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#4ac1ff]">Buy/Sell Stocks</CardTitle>
            <CardDescription className="text-gray-300">Enter the details of your trade below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="stockSymbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Stock Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="AAPL" {...field} className="bg-[#001f3f] text-white border-[#4ac1ff]" />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Please enter the exact stock symbol.
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="bg-[#001f3f] text-white border-[#4ac1ff]"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Enter the number of shares you want to trade
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-white">Action</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="buy" className="text-[#4ac1ff]" />
                            </FormControl>
                            <FormLabel className="font-normal text-white">
                              <ArrowUpIcon className="h-4 w-4 inline-block mr-1 text-green-400" />
                              Buy
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sell" className="text-[#4ac1ff]" />
                            </FormControl>
                            <FormLabel className="font-normal text-white">
                              <ArrowDownIcon className="h-4 w-4 inline-block mr-1 text-red-400" />
                              Sell
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#4ac1ff] hover:bg-[#39a0e5] text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Execute Trade"}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </main>
>>>>>>> e664addef1b926778d109fe5803c7ea6b19549f1
    </div>
  )
}
