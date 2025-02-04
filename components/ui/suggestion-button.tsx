import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SuggestionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  children: React.ReactNode
}

export const SuggestionButton = React.forwardRef<HTMLButtonElement, SuggestionButtonProps>(
  ({ className, icon: Icon, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      className={cn("rounded-full h-auto py-2 px-4 text-sm flex items-center gap-2", className)}
      {...props}
    >
      <Icon className="h-4 w-4 text-primary" />
      <span>{children}</span>
    </Button>
  )
)

SuggestionButton.displayName = "SuggestionButton" 