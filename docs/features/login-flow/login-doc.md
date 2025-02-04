# Login System Documentation (v2)

## Overview
The login system implements a secure authentication flow using JWT tokens with automatic refresh capabilities. The system provides email/password authentication along with social login options (Google and Apple), proper form state management, and comprehensive error handling.


## Component Implementation

### LoginForm Component
Located at `app/components/login-form.tsx`, this component handles all authentication flows.

### State Management
```typescript
// Form state
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

// Loading state
const [isLoading, setIsLoading] = useState(false);
```

### Core Authentication Functions

#### 1. Email/Password Login
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post('/api/token/', {
      email: formData.email,
      password: formData.password
    });

    // Store tokens
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);

    // Redirect to dashboard
    window.location.href = '/dashboard';
  } catch (error: any) {
    handleAuthError(error);
  } finally {
    setIsLoading(false);
  }
};
```

#### 2. Social Authentication
```typescript
const handleSocialLogin = async (provider: 'google' | 'apple') => {
  setIsLoading(true);
  try {
    const response = await axios.post(`/api/social/${provider}/`);
    window.location.href = '/dashboard';
  } catch (error) {
    toast.error(`${provider} login failed. Please try again.`);
  } finally {
    setIsLoading(false);
  }
};
```

## Form Features

### 1. Input Handling
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
};
```

### 2. Form States
- **Loading State**: Disables all inputs and buttons
- **Error State**: Displays validation and API errors
- **Success State**: Handles successful authentication and redirect

## Error Handling

### API Error Handling
```typescript
if (error.response?.status === 401) {
  toast.error('Invalid email or password');
} else if (!error.response) {
  toast.error('Network error. Please try again.');
} else {
  toast.error('An error occurred. Please try again.');
}
```

### Error Types Handled
1. Invalid credentials (401)
2. Network errors
3. Server errors
4. Validation errors

## Security Implementation

### Token Management
- Tokens stored in localStorage
- Automatic token refresh through axios interceptor
- Secure token handling in requests

### Form Security
- Input validation
- Loading state protection
- CSRF protection
- Rate limiting support

## UI Components Used

### 1. Core Components
- `Button`: Primary actions and social login
- `Card`: Main form container
- `Input`: Form fields
- `Label`: Input labels
- `Spinner`: Loading indicator

### 2. Layout Structure
```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent>
    <form>
      {/* Social Login Buttons */}
      {/* Email/Password Fields */}
      {/* Submit Button */}
    </form>
  </CardContent>
</Card>
```

## User Flow

### 1. Standard Login Flow
1. User enters email and password
2. Form validates inputs
3. Submit button shows loading state
4. API call is made
5. Success: Store tokens and redirect
6. Error: Display error message

### 2. Social Login Flow
1. User clicks social login button
2. Social provider authentication
3. API validates social token
4. Success: Store tokens and redirect
5. Error: Display error message

## Dependencies

### Required Packages
```json
{
  "@nextui-org/react": "^latest",
  "axios": "^latest",
  "sonner": "^latest",
  "jwt-decode": "^latest"
}
```

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
NEXTAUTH_SECRET=your_secret
```

## Best Practices Implemented

### 1. State Management
- Centralized form state
- Controlled inputs
- Loading state management

### 2. Error Handling
- Comprehensive error messages
- Toast notifications
- Network error handling

### 3. Security
- Input validation
- Loading state protection
- Secure token storage
- Protected API calls

### 4. Accessibility
- Proper ARIA labels
- Keyboard navigation
- Loading state indicators
- Error message announcements

## Component Props

```typescript
interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}
```

## Usage Example

```tsx
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
```

## Testing Considerations

### Unit Tests
1. Form validation
2. Error handling
3. Loading states
4. Input changes

### Integration Tests
1. API communication
2. Token storage
3. Social login flows
4. Error scenarios

## Future Enhancements

1. Remember me functionality
2. Biometric authentication
3. Enhanced password requirements
4. Login attempt tracking
5. Progressive enhancement
6. Additional social providers
7. Analytics integration

## Troubleshooting

### Common Issues
1. Token refresh failures
2. Social login popup blocked
3. Network connectivity issues
4. Invalid credentials handling

### Solutions
1. Clear local storage and re-login
2. Check popup blocker settings
3. Verify network connection
4. Verify credentials format

## Maintenance

### Regular Tasks
1. Update dependencies
2. Review security practices
3. Monitor error rates
4. Update documentation

### Performance Monitoring
1. Login success rate
2. API response times
3. Error frequency
4. User feedback

This updated documentation reflects all the changes made to the login form implementation, including:
- Proper state management
- Enhanced error handling
- Social login implementation
- Security considerations
- Accessibility improvements
- Testing considerations
- Maintenance guidelines


