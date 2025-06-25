"use client"

import { useParams, Navigate } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../contexts/cart-context"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Star, Minus, Plus } from "lucide-react"

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.",
    features: ["Noise Cancellation", "30-hour Battery", "Bluetooth 5.0", "Quick Charge"],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    description: "Advanced smartwatch with health monitoring, GPS, and smartphone integration.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Tracking"],
    rating: 4.3,
    reviews: 89,
  },
  // Add more detailed products as needed
]

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-green-600 mb-6">${product.price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <Button size="lg" onClick={handleAddToCart} className="w-full flex items-center justify-center space-x-2">
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
