"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Package, Eye } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.97,
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 99.99 },
      { name: "Smart Watch", quantity: 1, price: 199.99 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 79.99,
    items: [{ name: "Running Shoes", quantity: 1, price: 79.99 }],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 149.99,
    items: [{ name: "Coffee Maker", quantity: 1, price: 149.99 }],
  },
]

export function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {mockOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">When you place orders, they'll appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order {order.id}</CardTitle>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      >
                        <Eye size={16} className="mr-2" />
                        {selectedOrder === order.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>

                    {selectedOrder === order.id && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-2 border-b last:border-b-0"
                            >
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600 ml-2">x{item.quantity}</span>
                              </div>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
