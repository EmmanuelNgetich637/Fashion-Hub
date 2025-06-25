"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import { Eye, EyeOff } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")

  const { login, resetPassword, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      navigate("/")
    } else {
      setError("Invalid email or password. Try user@example.com / password")
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMessage("")

    const success = await resetPassword(resetEmail)
    if (success) {
      setResetMessage("Password reset instructions have been sent to your email.")
      setShowResetForm(false)
    } else {
      setResetMessage("Failed to send reset instructions. Please try again.")
    }
  }

  if (showResetForm) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--color-grey-50)" }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="card-header">
            <h1 className="card-title">Reset Password</h1>
            <p className="card-description">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
          <div className="card-content">
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label" htmlFor="reset-email">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  className="form-input"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {resetMessage && <div className="alert alert-info">{resetMessage}</div>}

              <div className="flex flex-col gap-2">
                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </button>
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowResetForm(false)}>
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-grey-50)" }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-header">
          <h1 className="card-title">Sign In</h1>
          <p className="card-description">Enter your credentials to access your account</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none", color: "var(--color-grey-500)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button type="submit" className="btn btn-primary w-full mb-4" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <button
              className="btn btn-outline mb-2"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-grey-600)",
                textDecoration: "underline",
              }}
              onClick={() => setShowResetForm(true)}
            >
              Forgot your password?
            </button>
            <p style={{ fontSize: "0.875rem", color: "var(--color-grey-600)" }}>
              {"Don't have an account? "}
              <Link to="/register" style={{ color: "var(--color-grey-800)", textDecoration: "underline" }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
