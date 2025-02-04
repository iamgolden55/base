'use client';

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Spinner, Checkbox } from "@nextui-org/react"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/src/components/ui/calendar"
import type { DropdownNavProps, DropdownProps } from "react-day-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { PasswordInput } from "@/src/components/ui/password-input"
import { PhoneInputComponent } from "@/src/components/ui/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

interface RegisterFormData {
  // Step 1 data
  fullName: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  
  // Step 2 data
  dateOfBirth: string;
  country: string;
  state: string;
  city: string;
  nin?: string; // Optional, only for Nigerian users
  
  // Step 3 data
  consents: {
    terms: boolean;
    hipaa: boolean;
    dataProcessing: boolean;
  };
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [dateInput, setDateInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [consents, setConsents] = useState({
    terms: false,
    hipaa: false,
    dataProcessing: false
  });
  const [country, setCountry] = useState("");
  const [showNIN, setShowNIN] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all consents are accepted
    if (!Object.values(consents).every(Boolean)) {
      alert("Please accept all required agreements to continue");
      return;
    }

    setIsLoading(true);

    try {
      const formData: RegisterFormData = {
        // Step 1 data
        fullName: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        gender: gender,
        phone: phone,
        password: password,
        
        // Step 2 data
        dateOfBirth: date ? date.toISOString().split('T')[0] : '',
        country: country,
        state: (document.getElementById('state') as HTMLInputElement).value,
        city: (document.getElementById('city') as HTMLInputElement).value,
        ...(showNIN && { nin: (document.getElementById('nin') as HTMLInputElement).value }),
        
        // Step 3 data
        consents: consents
      };

      // Send data to backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      // Handle successful registration
      // For example, redirect to login page or dashboard
      window.location.href = '/auth/login';

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
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
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>Gender</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              required
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              required
            />
            <span>Female</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              required
            />
            <span>Other</span>
          </label>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <PhoneInputComponent
          value={phone}
          onChange={setPhone}
          required
          label="Phone Number"
          defaultCountry="NG"
          placeholder="Enter phone number"
        />
      </div>
      <div className="grid gap-2">
        <PasswordInput
          value={password}
          onChange={setPassword}
          required
          showStrengthIndicator={true}
        />
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
              confirmPassword && password !== confirmPassword && "border-red-500 focus:ring-red-500"
            )}
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>
      </div>
      <Button 
        type="button" 
        className="w-full"
        onClick={() => setStep(2)}
        disabled={!password || !confirmPassword || password !== confirmPassword}
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
          className="w-full"
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
        />
        {date && (
          <p className="text-xs text-muted-foreground">
            Age: {calculateAge(date)} years old
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
        <Input
          id="country"
          placeholder="Nigeria"
          required
          value={country}
          onChange={(e) => {
            const inputValue = e.target.value;
            console.log('Country input:', inputValue); // Debug log
            setCountry(inputValue);
            const isNigeria = inputValue.trim().toLowerCase() === 'nigeria';
            console.log('Is Nigeria:', isNigeria); // Debug log
            setShowNIN(isNigeria);
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="state">State/Province <span className="text-red-500">*</span></Label>
        <Input
          id="state"
          required
          placeholder="Lagos"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Ikeja"
          required
        />
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
            onChange={(e) => {
              // Only allow numbers
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              // Limit to 11 digits
              if (e.target.value.length > 11) {
                e.target.value = e.target.value.slice(0, 11);
              }
            }}
          />
          <p className="text-xs text-muted-foreground">
            Your NIN is a unique 11-digit number assigned by NIMC
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1"
          onClick={() => setStep(3)}
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
            isSelected={consents.terms}
            onValueChange={(checked) => setConsents(prev => ({ ...prev, terms: checked }))}
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
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            isRequired
            isSelected={consents.hipaa}
            onValueChange={(checked) => setConsents(prev => ({ ...prev, hipaa: checked }))}
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
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            isRequired
            isSelected={consents.dataProcessing}
            onValueChange={(checked) => setConsents(prev => ({ ...prev, dataProcessing: checked }))}
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
        </div>
      </div>
      {!Object.values(consents).every(Boolean) && (
        <p className="text-sm text-red-500">
          * All agreements are required to create an account
        </p>
      )}
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isLoading || !Object.values(consents).every(Boolean)}
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
  )
}
