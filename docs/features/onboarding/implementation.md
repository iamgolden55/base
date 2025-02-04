# Onboarding Implementation

## Core Components

### useOnboardingStatus Hook
Located in `/app/hooks/useOnboardingStatus.ts`, this hook manages the onboarding state:
```typescript
export const useOnboardingStatus = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const status = localStorage.getItem('hasCompletedOnboarding')
    setHasCompletedOnboarding(status === 'true')
    setIsLoading(false)
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true')
    setHasCompletedOnboarding(true)
  }

  return { hasCompletedOnboarding, isLoading, completeOnboarding }
}
```

### Integration in Dashboard
The dashboard page (`app/[role]/patient/page.tsx`) controls the onboarding flow:
```typescript
export default function DashboardPage() {
  const { hasCompletedOnboarding, isLoading } = useOnboardingStatus()

  if (isLoading) return <Spinner />
  if (!hasCompletedOnboarding) return <OnboardingFlow />
  
  return <DashboardContent />
}
``` 