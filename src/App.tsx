import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/navigation'
import { ProtectedRoute } from './components/protected-route'

// Pages
import { HomePage } from './pages/home'
import { ShopPage } from './pages/shop'
import { ProductDetailsPage } from './pages/product-details'
import { CartPage } from './pages/cart'
import { OrdersPage } from './pages/orders'
import Dashboard from './pages/dashboard'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'
import ForgotPassword from './pages/forgot-password'

// Components
import { Footer } from './components/footer'
import SearchBar from './components/search-bar'

export function App() {
  const [query, setQuery] = useState('')

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar query={query} onChange={(value: string) => setQuery(value)} />
              <HomePage />
            </>
          }
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
