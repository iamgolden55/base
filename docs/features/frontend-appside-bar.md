# Patient Dashboard Documentation

## Overview
This documentation covers the implementation of the patient dashboard, including the sidebar navigation system, role-based routing, and guidelines for adding backend features.

## Table of Contents
1. [Architecture](#architecture)
2. [Frontend Implementation](#frontend-implementation)
3. [Role-Based Routing](#role-based-routing)
4. [State Management](#state-management)
5. [Backend Integration](#backend-integration)
6. [Adding New Features](#adding-new-features)

## Architecture

### Directory Structure
```plaintext
app/
  [role]/
    patient/
      page.tsx              # Main dashboard
      overview/
        page.tsx           # Overview page
      health-stats/
        page.tsx           # Health stats page
      appointments/
        page.tsx           # Appointments page
      medical-records/
        page.tsx           # Medical records page
hooks/
  useRole.ts              # Role management hook
  useActiveMenu.ts        # Active menu state hook
components/
  patients-dashboard/
    app-sidebar.tsx       # Main sidebar component
    nav-main.tsx         # Main navigation component
    nav-secondary.tsx    # Secondary navigation
    nav-user.tsx         # User navigation
```

## Frontend Implementation

### Role Hook
The `useRole` hook provides access to the current role from URL parameters:

```typescript
// hooks/useRole.ts
"use client"

import { useParams } from 'next/navigation'

export const useRole = () => {
  const params = useParams()
  return params.role as string
}
```

### Active Menu State
The `useActiveMenu` hook manages the active menu state:

```typescript
// hooks/useActiveMenu.ts
import { create } from 'zustand'

type ActiveMenuState = {
  activeMenu: string
  setActiveMenu: (menu: string) => void
}

export const useActiveMenu = create<ActiveMenuState>((set) => ({
  activeMenu: 'dashboard',
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}))
```

### Sidebar Navigation
Example of implementing a navigation item:

```typescript
const navigationItem = {
  title: "Dashboard",
  url: `/${role}/patient`,
  icon: Footprints,
  id: "dashboard",
  items: [
    {
      title: "Overview",
      url: `/${role}/patient/overview`,
      id: "dashboard-overview"
    }
  ]
}
```

## Backend Integration

### API Routes
Create API routes for each feature under the `app/api` directory:

```typescript
// app/api/patient/appointments/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: request.headers.get('userId')
      }
    })
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
```

### Data Fetching
Example of fetching data in a page component:

```typescript
// app/[role]/patient/appointments/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { useRole } from '@/hooks/useRole'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const role = useRole()

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/patient/appointments')
      const data = await response.json()
      setAppointments(data)
    }
    fetchAppointments()
  }, [])

  return (
    <div>
      {/* Render appointments */}
    </div>
  )
}
```

## Adding New Features

### 1. Create API Endpoint
First, create the necessary API endpoint:

```typescript
// app/api/patient/medical-records/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // Fetch medical records
}

export async function POST(request: Request) {
  // Create new medical record
}
```

### 2. Add Navigation Item
Add the new feature to the sidebar navigation:

```typescript
// components/patients-dashboard/app-sidebar.tsx
{
  title: "Medical Records",
  url: `/${role}/patient/medical-records`,
  icon: FileText,
  id: "medical-records",
  items: [
    {
      title: "View Records",
      url: `/${role}/patient/medical-records/view`,
      id: "view-records"
    }
  ]
}
```

### 3. Create Page Component
Create the page component with data fetching:

```typescript
// app/[role]/patient/medical-records/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { useRole } from '@/hooks/useRole'

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState([])
  const role = useRole()

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('/api/patient/medical-records')
      const data = await response.json()
      setRecords(data)
    }
    fetchRecords()
  }, [])

  return (
    <div>
      {/* Render medical records */}
    </div>
  )
}
```

## Best Practices

### 1. Role-Based Access Control
Implement role checks in both frontend and backend:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const role = request.nextUrl.pathname.split('/')[1]
  const userRole = request.headers.get('role')

  if (role !== userRole) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}
```

### 2. Error Handling
Implement consistent error handling:

```typescript
// utils/api-helpers.ts
export async function fetchData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error) 
    throw error
  }
}
```

### 3. Loading States
Handle loading states consistently:

```typescript
// components/LoadingState.tsx
export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner />
    </div>
  )
}
```

## Security Considerations

1. Always validate role access on both client and server
2. Implement proper authentication checks
3. Sanitize all user inputs
4. Use HTTPS for all API calls
5. Implement rate limiting for API routes
6. Handle sensitive data appropriately

## Testing

### Unit Tests
Example of testing a component:

```typescript
// __tests__/components/nav-main.test.tsx
import { render, screen } from '@testing-library/react'
import { NavMain } from '@/components/patients-dashboard/nav-main'

describe('NavMain', () => {
  it('renders navigation items correctly', () => {
    render(<NavMain items={mockItems} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
```

## Deployment

1. Ensure all environment variables are set
2. Configure proper CORS settings
3. Set up proper database connections
4. Configure proper caching strategies
5. Set up monitoring and logging

## Maintenance

1. Regularly update dependencies
2. Monitor error logs
3. Implement proper backup strategies
4. Document all changes and updates
5. Maintain test coverage

```

