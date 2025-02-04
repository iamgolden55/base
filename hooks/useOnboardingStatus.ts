import { useState, useEffect } from 'react'

export const useOnboardingStatus = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true) // Default to true to prevent flash
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage when component mounts
    const onboardingStatus = localStorage.getItem('hasCompletedOnboarding')
    setHasCompletedOnboarding(onboardingStatus === 'true')
    setIsLoading(false)
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true')
    setHasCompletedOnboarding(true)
  }

  return {
    hasCompletedOnboarding,
    isLoading,
    completeOnboarding
  }
} 