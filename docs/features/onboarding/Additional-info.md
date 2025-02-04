# Backend Integration Guide

## Database Schema
Add onboarding status to your user model:

```prisma
// schema.prisma
model User {
  id                    String   @id @default(cuid())
  hasCompletedOnboarding Boolean  @default(false)
  // ... other user fields
}
```

## API Routes Implementation

### Status Check Endpoint
is implemented in the `app/api/auth/route.ts` file

### Complete Onboarding Endpoint
```typescript
// app/api/onboarding/complete/route.ts
export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { hasCompletedOnboarding: true }
  })

  return new Response(JSON.stringify({ success: true }))
}
```



# Customization Guide

## Adding New Onboarding Steps

### Step Configuration
```typescript
// app/components/onboarding/onboarding-flow.tsx
const ONBOARDING_STEPS = [
  {
    title: "Welcome to TripWell!",
    description: "Your journey begins here...",
    imageSrc: "/images/welcome.svg",
    imageAlt: "Welcome illustration"
  },
  // Add more steps here
]
```

## Styling Modifications

### Card Styling
```typescript
// app/components/onboarding/onboarding-card.tsx
<div className="custom-card-class">
  <Image
    src={imageSrc}
    alt={imageAlt}
    className="w-[200px] sm:w-[300px] md:w-[400px] h-auto"
  />
</div>
```

### Progress Indicators
```typescript
// app/components/onboarding/progress-dots.tsx
<div className="flex gap-2 justify-center">
  {Array.from({ length: total }).map((_, i) => (
    <div
      key={i}
      className={`h-2 w-2 rounded-full ${
        i === current ? 'bg-primary-solid' : 'bg-gray-200'
      }`}
    />
  ))}
</div>
```



# Security Considerations

## Authentication Protection

### Client-Side Protection
```typescript
// app/hooks/useOnboardingStatus.ts
import { useSession } from 'next-auth/react'

export const useOnboardingStatus = () => {
  const { data: session } = useSession()
  
  // Prevent unauthorized access
  if (!session) {
    return {
      hasCompletedOnboarding: false,
      isLoading: false,
      completeOnboarding: () => {}
    }
  }
  // ... rest of the hook
}
```

### Server-Side Protection
- Always verify session in API routes
- Validate user permissions
- Sanitize user inputs
- Implement rate limiting
- Use CSRF protection

## Best Practices
1. Never store sensitive data in localStorage
2. Implement proper error handling
3. Log security-relevant events
4. Regular security audits
5. Keep dependencies updated



# Troubleshooting Guide

## Common Issues

### Onboarding Shows Repeatedly
**Problem**: Users see onboarding flow multiple times
**Solution**:
```typescript
// Check localStorage persistence
console.log(localStorage.getItem('hasCompletedOnboarding'))

// Verify completion function
const completeOnboarding = () => {
  localStorage.setItem('hasCompletedOnboarding', 'true')
  setHasCompletedOnboarding(true)
}
```

### Navigation Issues
**Problem**: Back/Next buttons not working correctly
**Solution**:
```typescript
// Implement proper state management
const [currentStep, setCurrentStep] = useState(0)

const handleNext = () => {
  if (currentStep < ONBOARDING_STEPS.length - 1) {
    setCurrentStep(prev => prev + 1)
  }
}

const handlePrevious = () => {
  if (currentStep > 0) {
    setCurrentStep(prev => prev - 1)
  }
}
```

### Mobile Responsiveness
**Problem**: Layout issues on mobile devices
**Solution**:
```typescript
// Add proper responsive classes
<div className="w-full px-4 sm:px-6 md:px-8">
  <div className="max-w-md mx-auto sm:max-w-lg md:max-w-xl">
    {/* Content */}
  </div>
</div>
```

## Debug Checklist
1. Check browser console for errors
2. Verify localStorage state
3. Confirm API responses
4. Test on multiple devices
5. Clear browser cache
6. Check network requests
```

This documentation structure provides:
1. Clear organization of information
2. Easy-to-follow implementation guides
3. Security considerations
4. Troubleshooting steps
5. Customization options
6. Backend integration details

