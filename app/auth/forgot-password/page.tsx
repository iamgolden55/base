'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from '@/lib/axios'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@nextui-org/react'
import { MoveLeft } from 'lucide-react'
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await axios.post('/api/password/reset/', {
        email: values.email,
      })
      
      toast.success('Password reset link has been sent to your email')
      // Optionally redirect to login or stay on the same page
      // router.push('/auth/login')
    } catch (error: any) {
      console.error('Error requesting password reset:', error)
      toast.error(
        error.response?.data?.message || 
        'Failed to send reset link. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 w-full" 
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading && <Spinner size="sm" color="white" />}
                    <span>{isLoading ? "Sending..." : "Send Reset Link"}</span>
                  </div>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary flex items-center gap-2">
                    <MoveLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
            and <a href="/privacy">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
