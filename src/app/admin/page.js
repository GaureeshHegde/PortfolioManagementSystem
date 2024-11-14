"use client"

import { useState, useEffect } from "react"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orderHistory, setOrderHistory] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true)
      try {
        // Replace this with your actual API call
        const response = await fetch("/api/admin/users")
        if (!response.ok) throw new Error("Failed to fetch users data.")
        const data = await response.json()
        setUsers(data.users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Function to fetch order history
  async function fetchOrderHistory(userId) {
    try {
      const response = await fetch(`/api/admin/userOrderHistory?user_id=${userId}`)
      if (!response.ok) throw new Error("Failed to fetch order history.")
      const data = await response.json()
      setOrderHistory(data.orders)
    } catch (error) {
      console.error("Error fetching order history:", error)
    }
  }

  // Function to handle clicking on a username
  const handleUserClick = (user) => {
    setSelectedUser(user)
    fetchOrderHistory(user.user_id)
    setIsModalOpen(true)
  }

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false)
    setOrderHistory([])
    setSelectedUser(null)
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001f3f] to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#4ac1ff]">Admin Dashboard</h1>

        <div className="w-full bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl mb-8 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#4ac1ff] text-xl font-semibold">User Management</h2>
          </div>
          {isLoading ? (
            <p className="text-center text-white">Loading users...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-[#4ac1ff] text-left px-4 py-2">User ID</th>
                  <th className="text-[#4ac1ff] text-left px-4 py-2">Username</th>
                  <th className="text-[#4ac1ff] text-left px-4 py-2">Email</th>
                  <th className="text-[#4ac1ff] text-left px-4 py-2">Account Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="cursor-pointer" onClick={() => handleUserClick(user)}>
                    <td className="text-white px-4 py-2">{user.user_id}</td>
                    <td className="text-white px-4 py-2">{user.username}</td>
                    <td className="text-white px-4 py-2">{user.email}</td>
                    <td className="text-white px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal for Order History */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#0a2a4d] p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
              <h3 className="text-[#4ac1ff] text-lg font-semibold mb-4">
                Order History for {selectedUser?.username}
              </h3>
              {orderHistory.length > 0 ? (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-[#4ac1ff] text-left px-4 py-2">User ID</th>
                      <th className="text-[#4ac1ff] text-left px-4 py-2">Symbol</th>
                      <th className="text-[#4ac1ff] text-left px-4 py-2">Quantity</th>
                      <th className="text-[#4ac1ff] text-left px-4 py-2">Type</th>
                      <th className="text-[#4ac1ff] text-left px-4 py-2">Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.order_id}>
                        <td className="text-white px-4 py-2">{order.user_id}</td>
                        <td className="text-white px-4 py-2">{order.symbol}</td>
                        <td className="text-white px-4 py-2">{order.quantity}</td>
                        <td className="text-white px-4 py-2">{order.type}</td>
                        <td className="text-white px-4 py-2">
                          {new Date(order.date_of_order).toLocaleDateString()}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-white">No order history found for this user.</p>
              )}
              <button className="mt-4 btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

