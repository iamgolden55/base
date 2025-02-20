"use client"
import { useState, useEffect } from "react"
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
  const [verificationTimer, setVerificationTimer] = useState<NodeJS.Timeout | null>(null)

  const verifyOtp = async (otpValue: string) => {
    setIsLoading(true);
    setError("");
  
    const email = sessionStorage.getItem("userEmail");
    console.log("Verifying OTP for email:", email);
  
    try {
      const response = await axiosInstance.post('/api/verify-login-otp/', {
        email: email,
        otp: otpValue
      });
      
      const decodedToken = jwtDecode<DecodedToken>(response.data.tokens.access);
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.tokens.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.tokens.refresh);
  
      if (decodedToken.user?.has_completed_onboarding) {
        localStorage.setItem('hasCompletedOnboarding', 'true');
      } else {
        localStorage.setItem('hasCompletedOnboarding', 'false');
      }
  
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

  const handleOtpChange = (value: string) => {
    setOtp(value);
    
    // Clear any existing timer
    if (verificationTimer) {
      clearTimeout(verificationTimer);
    }

    if (value.length === 6) {
      // Set loading state immediately to show user something is happening
      setIsLoading(true);
      
      // Start a new timer for 500ms
      const timer = setTimeout(() => {
        verifyOtp(value);
      }, 500); // Half second delay
      
      setVerificationTimer(timer);
    }
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (verificationTimer) {
        clearTimeout(verificationTimer);
      }
    };
  }, [verificationTimer]);

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
    <div className="container relative flex min-h-screen w-full flex-col items-center justify-center py-12">
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
              onChange={handleOtpChange}
              disabled={isLoading}
              className="justify-center"
              length={6}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}
            {isLoading && (
              <div className="flex justify-center">
                <Spinner size="sm" color="primary" />
              </div>
            )}
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the code?{" "}
              <button onClick={handleResend} className="text-primary hover:underline">
                Resend
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
} 