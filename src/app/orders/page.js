"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const initialOrders = [
  { id: 1, symbol: "AAPL", quantity: 10, type: "Buy", date: "2023-06-01T10:30:00Z" },
  { id: 2, symbol: "GOOGL", quantity: 5, type: "Sell", date: "2023-06-02T14:45:00Z" },
  { id: 3, symbol: "MSFT", quantity: 15, type: "Buy", date: "2023-06-03T09:15:00Z" },
]

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState(initialOrders)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockSymbol: "",
      quantity: 1,
      action: "buy",
    },
  })

  const { control, handleSubmit, formState: { errors }, reset } = form

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const newOrder = {
        id: orders.length + 1,
        symbol: values.stockSymbol,
        quantity: values.quantity,
        type: values.action === "buy" ? "Buy" : "Sell",
        date: new Date().toISOString(),
      }
      setOrders([newOrder, ...orders])
      toast.success(`${values.action === "buy" ? "Bought" : "Sold"} ${values.quantity} shares of ${values.stockSymbol}`)
      reset()
    } catch (error) {
      console.error("Error Executing Trade:", error)
      toast.error("There was a problem executing your trade. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001f3f] to-black text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#4ac1ff] mb-6">Buy/Sell Stocks</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#4ac1ff]">Place Order</CardTitle>
              <CardDescription className="text-gray-300">Enter the details of your trade below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={control}
                    name="stockSymbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4ac1ff]">Stock Symbol</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="AAPL" 
                            {...field} 
                            className="bg-[#001f3f] text-white border-[#4ac1ff] placeholder-gray-400"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Please enter the exact stock symbol.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4ac1ff]">Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-[#001f3f] text-white border-[#4ac1ff] placeholder-gray-400" 
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
                    control={control}
                    name="action"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-[#4ac1ff]">Action</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="buy" className="border-[#4ac1ff] text-[#4ac1ff]" />
                              </FormControl>
                              <FormLabel className="font-normal text-white">Buy</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sell" className="border-[#4ac1ff] text-[#4ac1ff]" />
                              </FormControl>
                              <FormLabel className="font-normal text-white">Sell</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#4ac1ff] text-[#001f3f] hover:bg-[#39a0e5]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#4ac1ff]">Order History</CardTitle>
              <CardDescription className="text-gray-300">Your recent trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#4ac1ff]">Symbol</TableHead>
                    <TableHead className="text-[#4ac1ff]">Quantity</TableHead>
                    <TableHead className="text-[#4ac1ff]">Type</TableHead>
                    <TableHead className="text-[#4ac1ff]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.symbol}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
