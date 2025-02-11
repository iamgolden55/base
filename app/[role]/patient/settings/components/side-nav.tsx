'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  History,
  HelpCircle,
} from 'lucide-react'

export function SideNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  const role = useRole()
  const roleString = typeof role === 'string' ? role : 'object'

  const sidebarNavItems = [
    {
      title: 'Profile',
      href: `/${roleString}/patient/settings`,
      tab: 'profile',
      icon: User,
    },
    {
      title: 'Account',
      href: `/${roleString}/patient/settings?tab=account`,
      tab: 'account',
      icon: Settings,
    },
    {
      title: 'Notifications',
      href: `/${roleString}/patient/settings?tab=notifications`,
      tab: 'notifications',
      icon: Bell,
    },
    {
      title: 'Security',
      href: `/${roleString}/patient/settings?tab=security`,
      tab: 'security',
      icon: Shield,
    },
    {
      title: 'Billing',
      href: `/${roleString}/patient/settings?tab=billing`,
      tab: 'billing',
      icon: CreditCard,
    },
    {
      title: 'History',
      href: `/${roleString}/patient/settings?tab=history`,
      tab: 'history',
      icon: History,
    },
    {
      title: 'Help',
      href: `/${roleString}/patient/settings?tab=help`,
      tab: 'help',
      icon: HelpCircle,
    },
  ]

  return (
    <nav className="flex flex-col space-y-2">
      {sidebarNavItems.map((item) => {
        const Icon = item.icon
        const isActive = 
          (!currentTab && item.tab === 'profile') || // For the profile tab (default)
          (currentTab === item.tab) // For other tabs

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800',
              isActive
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
} 