"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/otp-input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@nextui-org/react"

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Here you would typically verify the OTP with your backend
      // If verification is successful, redirect to the dashboard
      window.location.href = "/role/patient"
    } catch (error) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          <CardDescription>
            Enter the 4-digit code sent to your email/phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
              className="justify-center"
            />
            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}
            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={otp.length !== 4 || isLoading}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading && <Spinner size="sm" color="white" />}
                <span>{isLoading ? "Verifying..." : "Verify"}</span>
              </div>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={() => {
                  // Handle resend logic here
                }}
                className="text-primary hover:underline"
                disabled={isLoading}
              >
                Resend
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 