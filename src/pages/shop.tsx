"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/cart-context"
import { ShoppingCart, Search } from "lucide-react"

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  { id: "3", name: "Running Shoes", price: 79.99, image: "/placeholder.svg?height=200&width=200", category: "Sports" },
  { id: "4", name: "Coffee Maker", price: 149.99, image: "/placeholder.svg?height=200&width=200", category: "Home" },
  { id: "5", name: "Backpack", price: 49.99, image: "/placeholder.svg?height=200&width=200", category: "Fashion" },
  {
    id: "6",
    name: "Smartphone",
    price: 699.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  { id: "7", name: "Yoga Mat", price: 29.99, image: "/placeholder.svg?height=200&width=200", category: "Sports" },
  { id: "8", name: "Desk Lamp", price: 39.99, image: "/placeholder.svg?height=200&width=200", category: "Home" },
]

export function ShopPage() {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory),
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "var(--color-grey-50)" }}>
      <div className="container">
        <h1 className="mb-8" style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-grey-800)" }}>
          Shop
        </h1>

        {/* Filters */}
        <div className="card mb-8">
          <div className="card-content">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--color-grey-400)" }} />
                <input
                  className="form-input"
                  style={{ paddingLeft: "2.5rem" }}
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select className="form-input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card product-card">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="product-price">${product.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm">
                      View
                    </Link>
                    <button
                      className="btn btn-primary btn-sm flex items-center gap-1"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center p-8">
            <p style={{ color: "var(--color-grey-500)", fontSize: "1.125rem" }}>
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
