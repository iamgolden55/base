"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Phone } from "lucide-react";
import React, { forwardRef, useId } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: RPNInput.Country;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

export function PhoneInputComponent({
  value,
  onChange,
  defaultCountry = "US",
  placeholder = "Enter phone number",
  required = false,
  label = "Phone number"
}: PhoneInputProps) {
  const id = useId();

  return (
    <div className="space-y-2" dir="ltr">
      <Label htmlFor={id}>{label}</Label>
      <RPNInput.default
        className="flex rounded-lg shadow-sm shadow-black/5"
        international
        defaultCountry={defaultCountry}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={PhoneInput}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(newValue) => onChange(newValue ?? "")}
        required={required}
      />
    </div>
  );
}

// Also export the base component for more flexibility
export const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn("-ms-px rounded-s-none shadow-none focus-visible:z-10", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="relative inline-flex items-center self-stretch rounded-s-lg border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground transition-shadow focus-within:z-10 focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? <Flag title={countryName} /> : <Phone size={16} aria-hidden="true" />}
    </span>
  );
}; 