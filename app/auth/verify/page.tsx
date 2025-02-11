"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/otp-input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@nextui-org/react"
import axiosInstance from "@/lib/axios"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants"
import axios from "axios"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  user?: {
    has_completed_onboarding: boolean;
    // ... other user properties
  };
  exp: number;
  iat: number;
  // ... other JWT standard fields
}

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    const email = sessionStorage.getItem("userEmail");
    console.log("Verifying OTP for email:", email);
  
    try {
      const response = await axiosInstance.post('/api/verify-login-otp/', {
        email: email,
        otp: otp
      });
      
      console.log('OTP verification response:', response.data);
      console.log('Full response:', response.data);
      console.log('User data:', response.data.user_data);

      const decodedToken = jwtDecode<DecodedToken>(response.data.tokens.access);
      console.log('Decoded token:', decodedToken);
      console.log('Decoded token after OTP:', decodedToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.tokens.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.tokens.refresh);
  
      // Set onboarding status
      if (decodedToken.user?.has_completed_onboarding) {
        localStorage.setItem('hasCompletedOnboarding', 'true');
      } else {
        localStorage.setItem('hasCompletedOnboarding', 'false');
      }
  
      // Redirect based on onboarding status
      window.location.href = decodedToken.user?.has_completed_onboarding 
        ? "/role/patient" 
        : "/role/patient/onboarding";
  
    } catch (error: any) {
      console.error("Verification failed:", error.response || error);
      setError(error.response?.data?.message || error.response?.data?.error || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };  
  

  const handleResend = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.post('/api/login/', {  // Use login endpoint instead
        email: sessionStorage.getItem('userEmail'),
        password: sessionStorage.getItem('userPassword'),  // You'll need to store this temporarily
        resend: true  // Optional flag to indicate resend
      })
      toast.success('New OTP sent!')
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to resend OTP")
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
            Enter the 6-digit code sent to your email/phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
              className="justify-center"
              length={6}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}
            <Button
              className="bg-blue-500 hover:bg-blue-600 w-full"
              onClick={handleVerify}
              disabled={otp.length !== 6 || isLoading}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading && <Spinner size="sm" color="white" />}
                <span>{isLoading ? "Verifying..." : "Verify"}</span>
              </div>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the code?{" "}
              <button onClick={handleResend} className="text-primary hover:underline">
                Resend
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
} 