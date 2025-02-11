'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRole } from '@/hooks/useRole'
import axiosInstance from '@/lib/axios'
import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { Spinner } from '@nextui-org/react'


const REFRESH_TOKEN_KEY = 'refresh_token';

const profileFormSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  country: z.string({
    required_error: 'Please select a country.',
  }),
  state: z.string({
    required_error: 'Please select a state.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { basic_info, refresh } = useRole();
  const [isLoading, setIsLoading] = useState(false)

  // Split the full name into first and last name
  const nameParts = basic_info?.full_name?.split(' ') || ['', '']
  const [firstName, ...lastNameParts] = nameParts
  const lastName = lastNameParts.join(' ')

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
    },
  })

  // Update form values when userData is available
  useEffect(() => {
    if (basic_info) {
      form.reset({
        first_name: firstName || '',
        last_name: lastName || '',
        email: basic_info.email || '',
        phone: basic_info.phone || '',
        country: basic_info.country || '',
        state: basic_info.state || '',
        city: basic_info.city || ''
      })
    }
  }, [basic_info, firstName, lastName, form])

  // Add this function to refresh the token after successful profile update
  const refreshUserData = async () => {
    try {
      // First, get fresh user data
      const profileResponse = await axiosInstance.get('api/profile/');
      console.log('Fresh profile data:', profileResponse.data);
  
      // Then refresh the token
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const tokenResponse = await axiosInstance.post('api/token/refresh/', {
        refresh: refreshToken
      });
      
      if (tokenResponse.data.access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.data.access);
        // Add a small delay before triggering the refresh
        await new Promise(resolve => setTimeout(resolve, 100));
        refresh();
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      console.log('Data being sent to server:', data);  // Debug log 🔍
      
      // Only include fields that have values
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== '')
      );
      
      console.log('Filtered data:', filteredData);  // Debug log 🔍
      
      await axiosInstance.patch('api/profile/', filteredData);
      await refresh();
      
      toast.success('Profile updated successfully! 🎉');
    } catch (error: any) {
      console.error('Error details:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile 😢');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

         <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600" 
            disabled={isLoading}
        >
          <div className="flex items-center justify-center gap-2">
                {isLoading && <Spinner size="sm" color="white" />}
            <span>{isLoading ? "Updating profile..." : "Update profile"}</span>
          </div>
        </Button>
      </form>
    </Form>
  )
} 