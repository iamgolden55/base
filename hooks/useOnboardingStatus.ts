import { useState, useEffect } from 'react'

export const useOnboardingStatus = () => {
  // Initialize with false to ensure onboarding shows by default
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
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