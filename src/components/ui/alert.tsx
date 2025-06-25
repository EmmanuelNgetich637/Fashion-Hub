// src/components/ui/alert.tsx
import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle, Info, CheckCircle, XCircle } from "lucide-react"

export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive"

const variantIcons = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  destructive: XCircle,
}

const variantClasses: Record<AlertVariant, string> = {
  default: "bg-gray-100 text-gray-800 border border-gray-300",
  info: "bg-blue-100 text-blue-800 border border-blue-300",
  success: "bg-green-100 text-green-800 border border-green-300",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  destructive: "bg-red-100 text-red-800 border border-red-300",
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  children: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const Icon = variantIcons[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("flex items-start gap-3 rounded-md p-4 text-sm", variantClasses[variant], className)}
        {...props}
      >
        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm", className)} {...props} />
))
AlertDescription.displayName = "AlertDescription"
