"use client"

import withAuth from "../components/withAuth";
import { useEffect, useState } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the validation schema for the form
const formSchema = z.object({
  stockSymbol: z.string().min(1, "Stock symbol is required"), // Add validation for stock symbol
  quantity: z.number().min(1, "Quantity must be at least 1"), // Validate quantity
  action: z.enum(["buy", "sell"]), // Ensure action is either 'buy' or 'sell'
});

function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]); // Start with an empty array

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockSymbol: "",
      quantity: 1,
      action: "buy",
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the JWT token in local storage
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.data); // Adjust based on the structure of your response
      } catch (error) {
        toast.error("Error fetching orders: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once when the component mounts

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/orders', { // Make sure this is the correct endpoint for your POST request
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the JWT token in local storage
        },
        body: JSON.stringify({
          symbol: values.stockSymbol.toUpperCase(), // Send stock symbol in uppercase
          quantity: values.quantity,
          order_type: values.action.toLowerCase(), // Send order type as 'buy' or 'sell'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const orderData = await response.json();
      const newOrder = {
        symbol: orderData.order.symbol,
        quantity: orderData.order.quantity,
        type: orderData.order.order_type, // Ensure this matches your backend
        date: orderData.order.date_of_order, // Use the createdAt from backend
      };

      setOrders([newOrder, ...orders]); // Update local state with new order
      toast.success(`${values.action === "buy" ? "Bought" : "Sold"} ${values.quantity} shares of ${values.stockSymbol}`);
      reset();
    } catch (error) {
      console.error("Error Executing Trade:", error);
      toast.error("There was a problem executing your trade. Please try again.");
    } finally {
      setIsLoading(false);
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
                            value={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="buy" className="border-[#4ac1ff] text-[#4ac1ff]" />
                              </FormControl>
                              <label>Buy</label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sell" className="border-[#4ac1ff] text-[#4ac1ff]" />
                              </FormControl>
                              <label>Sell</label>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="bg-[#4ac1ff] hover:bg-[#0093db]">
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#4ac1ff]">Order History</CardTitle>
              <CardDescription className="text-gray-300">Your recent trades will be displayed here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading orders...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#4ac1ff]">Stock Symbol</TableHead>
                      <TableHead className="text-[#4ac1ff]">Quantity</TableHead>
                      <TableHead className="text-[#4ac1ff]">Type</TableHead>
                      <TableHead className="text-[#4ac1ff]">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.symbol}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.type || "N/A"}</TableCell>
                          <TableCell>
                          {order.date_of_order ? new Date(order.date_of_order).toLocaleString() : "Invalid Date"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No orders found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(OrdersPage);
