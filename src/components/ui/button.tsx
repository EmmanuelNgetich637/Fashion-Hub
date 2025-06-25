import React from 'react'
import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}