import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

interface RegisterFormData {
  email: string;
  password: string;
  fullName: string;
  gender?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  state?: string;
  city?: string;
  nin?: string;
  consents: {
    terms: boolean;
    hipaa: boolean;
    dataProcessing: boolean;
  };
}

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
    const data: RegisterFormData = await request.json();

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
      const [result] = await connection.execute(
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