"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const privacyFormSchema = z.object({
  profileVisibility: z.string({
    required_error: "Please select a profile visibility option.",
  }),
  researchPrivacy: z.string({
    required_error: "Please select a research privacy option.",
  }),
  twoFactorAuth: z.boolean(),
  dataSharing: z.boolean(),
  activityLog: z.boolean(),
  anonymousAnalytics: z.boolean(),
})

type PrivacyFormValues = z.infer<typeof privacyFormSchema>

export function PrivacyForm() {
  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: "public",
      researchPrivacy: "private",
      twoFactorAuth: false,
      dataSharing: true,
      activityLog: true,
      anonymousAnalytics: true,
    },
  })

  function onSubmit(data: PrivacyFormValues) {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileVisibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profile visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="researchers">Researchers Only</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Control who can view your research profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="researchPrivacy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Research Privacy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select research privacy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="team">Team Only</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Control who can access your research data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twoFactorAuth"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                <FormDescription>
                  Add an extra layer of security to your account
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataSharing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Data Sharing</FormLabel>
                <FormDescription>
                  Allow sharing of research data with verified researchers
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activityLog"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Activity Log</FormLabel>
                <FormDescription>
                  Keep a log of all activities on your account
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anonymousAnalytics"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Anonymous Analytics</FormLabel>
                <FormDescription>
                  Share anonymous usage data to help improve the platform
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Save settings</Button>
      </form>
    </Form>
  )
} 