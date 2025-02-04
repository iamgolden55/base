"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  className,
  ...props
}: OTPInputProps) {
  const [focused, setFocused] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputRefs.current[idx - 1]?.focus()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target
    const newValue = target.value.slice(-1)
    const newOTPValue =
      value.slice(0, idx) + newValue + value.slice(idx + 1)

    // Only allow numbers
    if (!/^\d*$/.test(newValue) && newValue !== "") return

    onChange(newOTPValue)

    if (newValue && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length)
    if (!/^\d*$/.test(pastedData)) return
    onChange(pastedData.padEnd(length, ""))
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        focused && "group",
        className
      )}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <Input
          key={i}
          ref={(el: HTMLInputElement | null) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleInput(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "h-12 w-12 text-center text-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />
      ))}
    </div>
  )
} 