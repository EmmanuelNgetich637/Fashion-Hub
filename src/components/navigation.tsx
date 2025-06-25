"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import { useCart } from "../contexts/cart-context"
import { ShoppingCart, User, LogOut, Home, Store } from "lucide-react"

export function Navigation() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const location = useLocation()

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          ShopApp
        </Link>

        <div className="flex items-center gap-8">
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                <Home size={16} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className={`nav-link ${isActive("/shop") ? "active" : ""}`}>
                <Store size={16} />
                <span>Shop</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/cart" className="nav-link relative">
                <ShoppingCart size={16} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link to="/orders" className={`nav-link ${isActive("/orders") ? "active" : ""}`}>
                Orders
              </Link>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
                <User size={16} />
                <span>Dashboard</span>
              </Link>
              <button onClick={logout} className="btn btn-outline btn-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
