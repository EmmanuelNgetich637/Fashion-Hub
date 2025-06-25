import React, { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}
interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={cn('bg-white shadow rounded p-4', className)}>{children}</div>
}
export function CardHeader({ children, className = '' }: CardSectionProps) {
  return <div className={cn('border-b pb-2 mb-4', className)}>{children}</div>
}
export function CardTitle({ children, className = '' }: CardSectionProps) {
  return <h2 className={cn('text-lg font-semibold text-gray-800', className)}>{children}</h2>
}
export function CardDescription({ children, className = '' }: CardSectionProps) {
  return <p className={cn('text-sm text-gray-500', className)}>{children}</p>
}
export function CardContent({ children, className = '' }: CardSectionProps) {
  return <div className={cn('mt-2 text-gray-700', className)}>{children}</div>
}

