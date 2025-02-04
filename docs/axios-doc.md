# Axios Configuration Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Setup](#basic-setup)
3. [JWT Authentication](#jwt-authentication)
4. [Interceptors](#interceptors)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)

## Introduction

This document explains our Axios configuration setup that handles API requests, JWT (JSON Web Token) authentication, and automatic token refresh functionality. The configuration is designed to provide a robust and secure way to communicate with our backend API.

### What is Axios?
Axios is a popular HTTP client library that makes it easy to send asynchronous HTTP requests to REST endpoints. It provides a simple and elegant way to make HTTP requests from both browser and Node.js environments.

### What is JWT?
JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. In our application, we use JWTs for authentication and authorization.

## Basic Setup

Let's break down the initial setup of our Axios instance:

```typescript
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Explanation:
- `axios.create()` creates a new instance of Axios with custom configuration
- `baseURL`: Sets the base URL for all requests (loaded from environment variables)
- `headers`: Sets default headers for all requests
- `ACCESS_TOKEN_KEY` and `REFRESH_TOKEN_KEY`: Constants for consistent token key naming

## JWT Authentication

Our authentication system uses two types of tokens:
1. **Access Token**: Short-lived token used for API requests
2. **Refresh Token**: Long-lived token used to get new access tokens

### Token Storage
We store both tokens in localStorage using consistent key names:
```typescript
localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
```

### Token Decoding
We use `jwt-decode` to decode and check token expiration:
```typescript
const decodedToken: any = jwtDecode(token);
const currentTime = Date.now() / 1000;
if (decodedToken.exp < currentTime) {
  // Token is expired
}
```

## Interceptors

Interceptors are powerful features in Axios that allow us to intercept requests or responses before they are handled.

### Request Interceptor
```typescript
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Token validation and refresh logic
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

#### What Request Interceptor Does:
1. Checks if a token exists
2. Validates token expiration
3. Refreshes token if expired
4. Adds token to request headers

### Response Interceptor
```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
```

#### What Response Interceptor Does:
1. Handles unauthorized (401) responses
2. Clears local storage on authentication failures
3. Redirects to login page when needed

## Error Handling

Our configuration includes comprehensive error handling:

### Token Refresh Errors
```typescript
try {
  const refreshToken = localStorage.getItem('refresh');
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`,
    {
      refresh: refreshToken
    }
  );
} catch (error) {
  localStorage.clear();
  window.location.href = '/auth/login';
}
```

### Authentication Errors
- Handles 401 (Unauthorized) responses
- Automatically redirects to login page
- Clears invalid tokens from storage

## Usage Examples

### Basic GET Request
```typescript
import axiosInstance from '@/lib/axios';

const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('/api/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
```

### POST Request with Data
```typescript
const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post('/api/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
```

### Making Authenticated Requests
The configuration automatically handles authentication, so you don't need to manually add tokens to your requests:

```typescript
// Token is automatically added by the interceptor
const getProtectedData = async () => {
  const response = await axiosInstance.get('/api/protected-route');
  return response.data;
};
```

## Best Practices

1. **Error Handling**: Always wrap Axios calls in try-catch blocks
   ```typescript
   try {
     const response = await axiosInstance.get('/api/data');
   } catch (error) {
     // Handle error appropriately
   }
   ```

2. **Type Safety**: Use TypeScript interfaces for API responses
   ```typescript
   interface UserData {
     id: number;
     name: string;
     email: string;
   }

   const getUser = async (): Promise<UserData> => {
     const response = await axiosInstance.get<UserData>('/api/user');
     return response.data;
   };
   ```

3. **Environment Variables**: Always use environment variables for sensitive data
   ```typescript
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
   ```

## Security Considerations

1. **Token Storage**: 
   - Tokens are stored in localStorage for simplicity
   - For higher security, consider using HTTP-only cookies

2. **Token Refresh**:
   - Automatic refresh happens before token expiration
   - Failed refreshes trigger logout

3. **Error Handling**:
   - Authentication errors clear all tokens
   - Users are redirected to login page

## Conclusion

This Axios configuration provides a robust foundation for handling API requests in your application. It automatically manages:
- Authentication tokens
- Token refresh
- Error handling
- Request/response interceptors

By using this configuration, you can focus on building features rather than managing API authentication and token handling.

Remember to:
- Handle errors appropriately in your components
- Use TypeScript types for better type safety
- Follow security best practices
- Keep your tokens secure

For any questions or issues, please refer to the Axios documentation or contact the development team.

