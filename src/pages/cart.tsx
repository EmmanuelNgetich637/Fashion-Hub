"use client"

import { Link } from "react-router-dom"
import { useCart } from "../contexts/cart-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
}

export function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded shadow p-8 text-center">
            <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link to="/shop" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            className="text-sm px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item: CartItem) => (
              <div key={item.id} className="bg-white rounded shadow p-4 flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded shadow p-6 space-y-4">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
              <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="block text-center border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
