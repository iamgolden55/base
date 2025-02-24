'use client';

import { cn } from "@/lib/utils"
import axiosInstance from "@/lib/axios"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner, Checkbox } from "@nextui-org/react"
import { useState } from "react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { PasswordInput } from "@/components/password-input"
import { PhoneInputComponent } from "@/components/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface RegisterFormData {
  fullName: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  date_of_birth: string;
  country: string;
  state: string;
  city: string;
  nin?: string;
  consents: {
    terms: boolean;
    hipaa: boolean;
    dataProcessing: boolean;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

interface ApiError {
  status: string;
  message: string;
  errors?: ValidationErrors;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string>('');
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    date_of_birth: '',
    country: '',
    state: '',
    city: '',
    consents: {
      terms: false,
      hipaa: false,
      dataProcessing: false
    }
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNIN, setShowNIN] = useState(false);

  const validateStep1 = () => {
    const validationErrors: ValidationErrors = {};
    
    if (!formData.fullName?.trim()) {
      validationErrors.full_name = 'Full name is required';
    }
    
    if (!formData.email?.trim()) {
      validationErrors.email = 'Email is required';
    }
    
    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }
    
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    
    if (formData.password !== confirmPassword) {
      validationErrors.confirm_password = 'Passwords do not match';
    }
    
    return validationErrors;
  };

  const validateStep2 = () => {
    const validationErrors: ValidationErrors = {};
    
    if (!formData.date_of_birth) {
      validationErrors.date_of_birth = 'Date of birth is required';
    }
    
    if (!formData.country?.trim()) {
      validationErrors.country = 'Country is required';
    }
    
    if (!formData.state?.trim()) {
      validationErrors.state = 'State is required';
    }
    
    if (!formData.city?.trim()) {
      validationErrors.city = 'City is required';
    }
    
    if (formData.country?.toLowerCase().trim() === 'nigeria') {
      if (!formData.nin) {
        validationErrors.nin = 'NIN is required for Nigerian residents';
      } else if (formData.nin.length !== 11) {
        validationErrors.nin = 'NIN must be exactly 11 digits';
      }
    }
    
    return validationErrors;
  };

  const goToNextStep = () => {
    setErrors({});
    setApiError('');
    
    let validationErrors: ValidationErrors = {};
    
    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 2) {
      validationErrors = validateStep2();
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the validation errors before continuing');
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setErrors({});
    setApiError('');
    setStep(prev => prev - 1);
  };

  const handleInputChange = (field: keyof RegisterFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConsentChange = (consentType: keyof typeof formData.consents, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      consents: {
        ...prev.consents,
        [consentType]: value
      }
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      handleInputChange('date_of_birth', formattedDate);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setApiError('');

    // Basic frontend validation
    const validationErrors: ValidationErrors = {};
    
    if (!formData.fullName?.trim()) {
      validationErrors.full_name = 'Full name is required';
    }
    
    if (!formData.email?.trim()) {
      validationErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    
    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }
    
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    
    if (!formData.date_of_birth) {
      validationErrors.date_of_birth = 'Date of birth is required';
    }
    
    if (!formData.country?.trim()) {
      validationErrors.country = 'Country is required';
    }
    
    if (!formData.state?.trim()) {
      validationErrors.state = 'State is required';
    }
    
    if (!formData.city?.trim()) {
      validationErrors.city = 'City is required';
    }
    
    if (formData.country?.toLowerCase().trim() === 'nigeria') {
      if (!formData.nin) {
        validationErrors.nin = 'NIN is required for Nigerian residents';
      } else if (formData.nin.length !== 11) {
        validationErrors.nin = 'NIN must be exactly 11 digits';
      }
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    try {
      // Prepare the data for the backend
      const { fullName, ...rest } = formData;
      const registrationData = {
        ...rest,
        full_name: fullName.trim(),
      };
      
      console.log('Sending registration data:', registrationData);
      const response = await axiosInstance.post('/api/registration/', registrationData);
      console.log('Registration response:', response);

      if (response.data) {
        if (response.data.access && response.data.refresh) {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
        }
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'string') {
          setApiError(errorData);
          toast.error(errorData);
        } else if (errorData.error) {
          setApiError(errorData.error);
          toast.error(errorData.error);
        } else if (errorData.message) {
          setApiError(errorData.message);
          toast.error(errorData.message);
        } else if (errorData.errors) {
          setErrors(errorData.errors);
          toast.error('Please fix the validation errors');
        } else {
          // Handle validation errors from the backend
          const backendErrors: ValidationErrors = {};
          Object.entries(errorData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              backendErrors[key] = value[0];
            } else if (typeof value === 'string') {
              backendErrors[key] = value;
            }
          });
          
          if (Object.keys(backendErrors).length > 0) {
            setErrors(backendErrors);
            toast.error('Please fix the validation errors');
          } else {
            const errorMessage = 'An error occurred during registration. Please try again.';
            setApiError(errorMessage);
            toast.error(errorMessage);
          }
        }
        
        // If there's a NIN error and country is Nigeria, show NIN field
        if (errorData.nin || errorData.errors?.nin) {
          setShowNIN(true);
        }
      } else {
        const errorMessage = 'Network error. Please check your connection and try again.';
        setApiError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const renderStep1 = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          required
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={cn(errors.full_name && "border-red-500 focus:ring-red-500")}
        />
        {errors.full_name && (
          <p className="text-sm text-red-500">{errors.full_name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={cn(errors.email && "border-red-500 focus:ring-red-500")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label>Gender</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={cn(
                "h-4 w-4 text-primary border-gray-300 focus:ring-primary",
                errors.gender && "border-red-500 focus:ring-red-500"
              )}
              required
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={cn(
                "h-4 w-4 text-primary border-gray-300 focus:ring-primary",
                errors.gender && "border-red-500 focus:ring-red-500"
              )}
              required
            />
            <span>Female</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={cn(
                "h-4 w-4 text-primary border-gray-300 focus:ring-primary",
                errors.gender && "border-red-500 focus:ring-red-500"
              )}
              required
            />
            <span>Other</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <PhoneInputComponent
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
          required
          label="Phone Number"
          defaultCountry="NG"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
      <div className="grid gap-2">
        <PasswordInput
          value={formData.password}
          onChange={(e) => handleInputChange('password', e)}
          required
          showStrengthIndicator={true}
          className={cn(errors.password && "border-red-500 focus:ring-red-500")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={cn(
              confirmPassword && formData.password !== confirmPassword && "border-red-500 focus:ring-red-500"
            )}
          />
          {confirmPassword && formData.password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>
      </div>
      <Button 
        type="button" 
        className="w-full bg-blue-500 hover:bg-blue-600"
        onClick={goToNextStep}
        disabled={!formData.password || !confirmPassword || formData.password !== confirmPassword}
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
        <Input
          id="dob"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          min="1900-01-01"
          required
          className={cn("w-full", errors.date_of_birth && "border-red-500 focus:ring-red-500")}
          value={formData.date_of_birth}
          onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
        />
        {errors.date_of_birth && (
          <p className="text-sm text-red-500">{errors.date_of_birth}</p>
        )}
        {formData.date_of_birth && (
          <p className="text-xs text-muted-foreground">
            Age: {calculateAge(formData.date_of_birth)} years old
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
        <Input
          id="country"
          placeholder="Nigeria"
          required
          value={formData.country}
          className={cn(errors.country && "border-red-500 focus:ring-red-500")}
          onChange={(e) => {
            const inputValue = e.target.value;
            handleInputChange('country', inputValue);
            setShowNIN(inputValue.trim().toLowerCase() === 'nigeria');
          }}
        />
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="state">State/Province <span className="text-red-500">*</span></Label>
        <Input
          id="state"
          required
          placeholder="Lagos"
          value={formData.state}
          className={cn(errors.state && "border-red-500 focus:ring-red-500")}
          onChange={(e) => handleInputChange('state', e.target.value)}
        />
        {errors.state && (
          <p className="text-sm text-red-500">{errors.state}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Ikeja"
          required
          value={formData.city}
          className={cn(errors.city && "border-red-500 focus:ring-red-500")}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city}</p>
        )}
      </div>
      {showNIN && (
        <div className="grid gap-2">
          <Label htmlFor="nin">NIN (National Identity Number) <span className="text-red-500">*</span></Label>
          <Input
            id="nin"
            placeholder="Enter your 11-digit NIN"
            required
            pattern="[0-9]{11}"
            maxLength={11}
            minLength={11}
            title="Please enter a valid 11-digit NIN number"
            value={formData.nin}
            className={cn(errors.nin && "border-red-500 focus:ring-red-500")}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
              handleInputChange('nin', value);
            }}
          />
          {errors.nin && (
            <p className="text-sm text-red-500">{errors.nin}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Your NIN is a unique 11-digit number assigned by NIMC
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 bg-blue-500 hover:bg-blue-600 w-full"
          onClick={goToNextStep}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid gap-4">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            isRequired
            isSelected={formData.consents.terms}
            onValueChange={(checked) => handleConsentChange('terms', checked)}
            className={cn(errors.terms && "border-red-500")}
          >
            <div className="grid gap-1.5 leading-none">
              <span className="text-sm font-medium flex items-center">
                Accept terms and conditions
                <span className="text-red-500 ml-1">*</span>
              </span>
              <p className="text-xs text-muted-foreground">
                I agree to the terms of service and privacy policy
              </p>
            </div>
          </Checkbox>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms}</p>
          )}
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            isRequired
            isSelected={formData.consents.hipaa}
            onValueChange={(checked) => handleConsentChange('hipaa', checked)}
            className={cn(errors.hipaa && "border-red-500")}
          >
            <div className="grid gap-1.5 leading-none">
              <span className="text-sm font-medium flex items-center">
                HIPAA Acknowledgment
                <span className="text-red-500 ml-1">*</span>
              </span>
              <p className="text-xs text-muted-foreground">
                I acknowledge that my health information will be handled in accordance with HIPAA regulations
              </p>
            </div>
          </Checkbox>
          {errors.hipaa && (
            <p className="text-sm text-red-500">{errors.hipaa}</p>
          )}
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            isRequired
            isSelected={formData.consents.dataProcessing}
            onValueChange={(checked) => handleConsentChange('dataProcessing', checked)}
            className={cn(errors.data_processing && "border-red-500")}
          >
            <div className="grid gap-1.5 leading-none">
              <span className="text-sm font-medium flex items-center">
                Data Processing Consent
                <span className="text-red-500 ml-1">*</span>
              </span>
              <p className="text-xs text-muted-foreground">
                I consent to the processing of my personal data as described in the privacy policy
              </p>
            </div>
          </Checkbox>
          {errors.data_processing && (
            <p className="text-sm text-red-500">{errors.data_processing}</p>
          )}
        </div>
      </div>
      {!Object.values(formData.consents).every(Boolean) && (
        <p className="text-sm text-red-500">
          * All agreements are required to create an account
        </p>
      )}
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-blue-500 hover:bg-blue-600 w-full"
          disabled={isLoading || !Object.values(formData.consents).every(Boolean)}
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading && <Spinner size="sm" color="white" />}
            <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Join our healthcare platform in a few easy steps
          </CardDescription>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              Login
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                {apiError}
              </div>
            )}
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}