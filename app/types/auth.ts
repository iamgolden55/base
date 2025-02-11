// app/types/auth.ts

export interface Location {
    country: string;
    state: string;
    city: string;
  }
  
  export interface HealthInfo {
    hpn: string;
    primary_hospital: string | null;
    current_gp: string | null;
  }
  
  export interface Verification {
    is_email_verified: boolean;
    otp_required: boolean;
  }
  
  export interface UserData {
    id: number;
    email: string;
    full_name: string;
    phone: string;
    role: string;
    location: Location;
    health_info: HealthInfo;
    verification: Verification;
    has_completed_onboarding: boolean;
  }
  
  export interface DecodedToken {
    user_data: {
      basic_info: {
        full_name: string;
        email: string;
        has_completed_onboarding: boolean;
        role: string;
        hpn: string;
        state: string | null;      // Added
        city: string | null;
        country: string | null;
        phone: string | null;
        gender: string | null;
        date_of_birth: string | null;
      };
      medical_info: {
        blood_type: string | null;
        allergies: string | null;
        chronic_conditions: string | null;
        is_high_risk: boolean;
        last_visit_date: string | null;
      };
      hospital_info: {
        primary_hospital: string | null;
        current_gp: string | null;
        practice: string | null;
      };
    };
    exp: number;
    iat: number;
}