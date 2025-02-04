# Onboarding File Structure

## Directory Organization
```

app/
├── [role]/
│   └── patient/
│       └── page.tsx         # Main dashboard with onboarding check
│   └── researcher/
│       └── page.tsx         # Main dashboard with onboarding check
└── components/
|    └── onboarding/
|        ├── onboarding-flow.tsx    # Main onboarding component
|        ├── onboarding-card.tsx    # Individual slide component
|        └── progress-dots.tsx      # Navigation indicator
└── hooks/
|    └── useOnboardingStatus.ts   # Onboarding state management
```

## Component Responsibilities

### page.tsx
- Controls when to show onboarding
- Manages dashboard display
- Handles loading states

### onboarding-flow.tsx
- Manages onboarding steps
- Handles navigation logic
- Controls step progression

### onboarding-card.tsx
- Renders individual slides
- Handles slide content display
- Manages slide transitions

### progress-dots.tsx
- Shows progress indication
- Provides visual feedback
- Tracks current step 