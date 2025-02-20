import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {children}
    </div>
  )
} 