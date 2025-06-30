"use client"

import { useParams, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCart } from "../contexts/cart-context"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart,  Minus, Plus } from "lucide-react"

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/fashion-images")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.id === id)
        setProduct(found)
      })
  }, [id])

  if (!product) return <Navigate to="/shop" replace />

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.url}
                  alt={product.description}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Badge variant="secondary">Fashion</Badge>
            <h1 className="text-3xl font-bold">{product.description}</h1>
            <p className="text-gray-600">Photo by {product.photographer}</p>
            <p className="text-4xl font-bold text-green-600">
              ${Math.floor(Math.random() * 80 + 30)}
            </p>

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
