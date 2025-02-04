

```plaintext
app/[role]/professional/
├── analytics/
│   └── AnalyticsForm.tsx
├── appointments/
│   └── AppointmentForm.tsx
├── patients/
│   └── PatientForm.tsx
├── resources/
│   └── ResourceForm.tsx
├── settings/
│   ├── ProfileSettings.tsx
│   ├── PracticeSettings.tsx
│   └── SecuritySettings.tsx
└── reports/
    └── ReportForm.tsx
```

# Professional Dashboard API Routes Documentation

## Overview
This document outlines the mapping between frontend forms and their corresponding API routes in the professional dashboard.

## Form to API Route Mappings

### 1. Profile Settings
- **Form Location**: `/app/[role]/professional/settings/ProfileSettings.tsx`
- **API Route**: `/api/professional/profile/route.ts`
- **HTTP Methods**: 
  - GET: Fetch profile data
  - PUT: Update profile data
- **Data Structure**:
```typescript
interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
}
```

### 2. Security Settings
- **Form Location**: `/app/[role]/professional/settings/SecuritySettings.tsx`
- **API Route**: `/api/professional/security/route.ts`
- **HTTP Methods**: 
  - PUT: Update security settings
- **Data Structure**:
```typescript
interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  twoFactorEnabled: boolean;
  recoveryEmail: string;
}
```

### 3. Practice Settings
- **Form Location**: `/app/[role]/professional/settings/PracticeSettings.tsx`
- **API Route**: `/api/professional/practice/route.ts`
- **HTTP Methods**: 
  - GET: Fetch practice data
  - PUT: Update practice data
- **Data Structure**:
```typescript
interface PracticeFormData {
  licenseInfo: {
    number: string;
    expirationDate: string;
    state: string;
  };
  specialization: {
    primary: string;
    subspecialties: string[];
    yearsExperience: number;
  };
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}
```

### 4. Resource Management
- **Form Location**: `/app/[role]/professional/resources/ResourceForm.tsx`
- **API Route**: `/api/professional/resources/route.ts`
- **HTTP Methods**: 
  - GET: Fetch resources
  - POST: Submit new resource
- **Data Structure**:
```typescript
interface ResourceFormData {
  title: string;
  description: string;
  category: string;
  specialty: string;
  type: string;
  url?: string;
}
```

### 5. Analytics Dashboard
- **Form Location**: `/app/[role]/professional/analytics/AnalyticsForm.tsx`
- **API Route**: `/api/professional/analytics/route.ts`
- **HTTP Methods**: 
  - GET: Fetch analytics data
- **Query Parameters**:
```typescript
interface AnalyticsParams {
  dateRange: {
    start: string;
    end: string;
  };
  metrics: string[];
  groupBy?: string;
}
```

### 6. Patient Management
- **Form Location**: `/app/[role]/professional/patients/PatientForm.tsx`
- **API Route**: `/api/professional/patients/route.ts`
- **HTTP Methods**: 
  - GET: Fetch patient list
  - POST: Add new patient
  - PUT: Update patient
- **Data Structure**:
```typescript
interface PatientFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  medicalHistory: string;
  status: string;
}
```

## Implementation Guide

### Frontend Implementation
1. Import necessary components:
```typescript
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
```

2. Create form state:
```typescript
const [formData, setFormData] = useState<FormDataType>(initialState);
const [isLoading, setIsLoading] = useState(false);
```

3. Implement form submission:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/professional/[endpoint]', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('API request failed');

    toast({
      title: "Success",
      description: "Operation completed successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Operation failed",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
```

### Backend Implementation
1. Create API route file:
```typescript
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const connection = await pool.getConnection();

    try {
      // Implement database operations
      return NextResponse.json(
        { message: 'Success' },
        { status: 200 }
      );
    } finally {
      connection.release();
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Error Handling
- Implement try-catch blocks in all API calls
- Use toast notifications for user feedback
- Log errors on the server side
- Return appropriate HTTP status codes

## Security Considerations
1. Implement authentication middleware
2. Validate all input data
3. Use CSRF protection
4. Implement rate limiting
5. Secure sensitive data

## Database Schema
Each API route corresponds to specific database tables. Ensure proper table structure and relationships are maintained.
