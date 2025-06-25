import React, { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}
const badgeClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span className={cn('inline-block px-2 py-1 text-xs font-semibold rounded', badgeClasses[variant], className)}>
      {children}
    </span>
  )
}
