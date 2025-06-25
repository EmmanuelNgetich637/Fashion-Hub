import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/index.css"

// If you use context providers (wrap App here)
import { AuthProvider } from "./contexts/auth-context"
import { CartProvider } from "./contexts/cart-context"

const rootElement = document.getElementById("root")

if (!rootElement) throw new Error("Root element not found!")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
