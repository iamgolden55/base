'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './components/profile-form'
import { SecurityContent } from './components/security-content'
import { BillingContent } from './components/billing-content'
import { HistoryContent } from './components/history-content'
import { HelpContent } from './components/help-content'
import { AccountContent } from './components/account-content'
import { NotificationForm } from './components/notification-form'
import { UserNav } from './components/user-nav'
import { SideNav } from './components/side-nav'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRole } from '@/hooks/useRole'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'profile'
  const role = useRole()
  const roleString = typeof role === 'string' ? role : 'object'

  return (
    <div className="space-y-6 px-4 md:px-10 pb-16">
      {/* Mobile Menu Button and Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <div className="py-4">
                <SideNav />
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="hidden md:block lg:w-1/5">
          <SideNav />
        </aside>

        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            <Separator />
            
            {/* Render content based on tab */}
            {tab === 'profile' && <ProfileForm />}
            {tab === 'account' && <AccountContent />}
            {tab === 'notifications' && <NotificationForm />}
            {tab === 'security' && <SecurityContent />}
            {tab === 'billing' && <BillingContent />}
            {tab === 'history' && <HistoryContent />}
            {tab === 'help' && <HelpContent />}
          </div>
        </div>
      </div>
    </div>
  )
}
