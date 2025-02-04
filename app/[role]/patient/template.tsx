"use client"

import { SiteHeader } from "@/app/components/patients-dashboard/site-header"
import { AppSidebar } from "@/app/components/patients-dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'

export default function PatientTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // For onboarding, render without layout but with same wrapper for hydration
  if (pathname.includes('/onboarding')) {
    return <div className="min-h-screen w-full">{children}</div>
  }

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
} 