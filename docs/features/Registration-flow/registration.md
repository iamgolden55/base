# Patient Registration Flow

## Overview
This document explains how new patients register for an account in our healthcare system. The process is designed to be simple, secure, and compliant with healthcare regulations.

## Step-by-Step Registration Process

### 1. Starting the Registration
- Visit the registration page by clicking "Sign Up" on the homepage
- You'll see a form asking for your personal information

### 2. Required Information
You'll need to provide:
- **Full Name**: Your complete legal name
- **Email Address**: Used for account verification and communication
- **Password**: Must be strong and include:
  - At least 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
- **Phone Number**: For important medical notifications
- **Date of Birth**: To verify your age and maintain accurate records
- **Location Details**:
  - Country
  - State
  - City
- **National ID Number** (Optional): For identity verification

### 3. Security Features
- Password strength indicator shows how secure your password is
- Real-time validation ensures all information is entered correctly
- Phone number verification ensures accurate contact details

### 4. Consent and Agreements
You must review and accept:
- **Terms of Service**: General usage terms
- **HIPAA Agreement**: Healthcare privacy regulations
- **Data Processing Agreement**: How we handle your information

### 5. Account Verification
After submitting the form:
1. A 4-digit verification code is sent to your email
2. Enter this code on the verification page
3. Your account is activated once the code is confirmed

### 6. What Happens Next?
After successful verification:
1. You're redirected to your patient dashboard
2. You can start booking appointments
3. Access your medical records
4. Update your profile information

## Privacy & Security
- All data is encrypted during transmission
- Information is stored securely following healthcare regulations
- Access to your data is strictly controlled
- Regular security audits ensure data protection

## Need Help?
If you encounter any issues:
- Click the "Need Help?" button
- Use the "Resend Code" option if you don't receive the verification code
- Contact our support team at support@healthcare.com

## Important Notes
- Keep your login credentials secure
- Update your contact information if it changes
- Enable two-factor authentication for extra security
- Report any suspicious activity immediately

## Technical Support
For technical assistance:
- Email: tech.support@healthcare.com
- Phone: 1-800-HEALTH-TECH
- Live Chat: Available 24/7 through the website

Here's an updated explanation including the purpose and use case of `route.ts`:


# Registration Flow

## Overview

The registration flow is designed to collect user information across multiple steps and submit it to a backend server for processing and storage. This document outlines the frontend flow and provides guidance on setting up the backend.

## Frontend Flow

### Step 1: User Information
- **Fields**: Full Name, Email, Gender, Phone, Password, Confirm Password
- **Validation**: Ensure all fields are filled, passwords match

### Step 2: Additional Details
- **Fields**: Date of Birth, Country, State, City, NIN (if Country is Nigeria)
- **Validation**: Ensure all fields are filled, NIN is 11 digits for Nigerian users

### Step 3: Consents
- **Fields**: Terms and Conditions, HIPAA Acknowledgment, Data Processing Consent
- **Validation**: Ensure all consents are accepted

### Form Submission
- **Endpoint**: `/api/auth/register`
- **Method**: POST
- **Payload**: JSON object containing all collected data

## Backend Setup

### Purpose of `route.ts`

The `route.ts` file is a server-side script that handles incoming HTTP requests to the `/api/auth/register` endpoint. It processes the registration data, interacts with the database, and returns appropriate responses. This file is crucial for:

- Validating incoming data
- Checking for existing users
- Hashing passwords securely
- Storing user data in the database
- Sending success or error responses

### Database Schema

#### Using MySQL
Create a `users` table with the following structure:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    nin VARCHAR(11),
    terms_accepted BOOLEAN DEFAULT false,
    hipaa_accepted BOOLEAN DEFAULT false,
    data_processing_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### API Endpoint

#### Route: `/api/auth/register`

- **Method**: POST
- **Request Body**: JSON object with user data
- **Response**: JSON object indicating success or failure

#### Example Implementation

```typescript
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate data
    if (!data.email || !data.password || !data.fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    try {
      // Check if user exists
      const [existingUsers] = await connection.execute(
        'SELECT email FROM users WHERE email = ?',
        [data.email]
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Insert user
      await connection.execute(
        `INSERT INTO users (
          full_name, email, gender, phone, password, 
          date_of_birth, country, state, city, nin,
          terms_accepted, hipaa_accepted, data_processing_accepted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.fullName,
          data.email,
          data.gender,
          data.phone,
          hashedPassword,
          data.dateOfBirth,
          data.country,
          data.state,
          data.city,
          data.nin || null,
          data.consents.terms,
          data.consents.hipaa,
          data.consents.dataProcessing
        ]
      );

      return NextResponse.json(
        { message: 'Registration successful' },
        { status: 201 }
      );

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Environment Variables

Ensure the following environment variables are set:

```env
MYSQL_HOST=your_host
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
```

## Conclusion

This document outlines the registration flow and provides a template for connecting the frontend to a MySQL backend. Adjust the database schema and API logic as needed to fit your specific requirements.
```

This document now includes an explanation of the `route.ts` file and how it interacts with the database.
