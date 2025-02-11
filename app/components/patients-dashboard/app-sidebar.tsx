"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Footprints,
  Calendar,
  TvMinimalPlay,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Card, CardFooter, Button } from "@nextui-org/react"
import NextImage from 'next/image'
import { useRole } from '@/hooks/useRole'
import { useCustomToast } from "../custom-toast"
import { NavUser } from "./nav-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = useRole()
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const handleNavigation = useCallback(
    ({ section, subsection, url }: { section: string; subsection: string; url: string }) => {
      // Set the active tab for styling/logic
      setActiveTab(subsection.toLowerCase())

      // (Optional) Update a breadcrumb in your header if desired.
      const headerElement = document.querySelector('header .bp-breadcrumb')
      if (headerElement) {
        const breadcrumbList = headerElement.querySelector('.bp-breadcrumb-list')
        if (breadcrumbList) {
          breadcrumbList.innerHTML = `
            <li><a href="#">${section}</a></li>
            <li class="separator">/</li>
            <li>${subsection}</li>
          `
        }
      }

      // Only navigate if the URL is set and not just a placeholder.
      if (url && url !== "#") {
        router.push(url)
      }
    },
    [router]
  )

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: `/${role}/patient/`, // Actual route for the Dashboard page
        icon: Footprints,
      },
      {
        title: "Appointments",
        url: `/${role}/patient/appointments`, // Add leading slash
        icon: Calendar,
      },
      {
        title: "Models",
        url: `/${role}/patient/models`,
        icon: Bot,
        items: [
          { title: "Genesis", url: `/${role}/patient/models` },
          { title: "Explorer", url: `/${role}/patient/models/explorer` },
          { title: "Quantum", url: `/${role}/patient/models/quantum` },
        ],
      },
      {
        title: "Videos",
        url: `/${role}/patient/videos`,
        icon: TvMinimalPlay,
        items: [
          { title: "Exclusive to PHB", url: `/${role}/patient/videos` },
          { title: "Public", url: "#" },
        ],
      },
      {
        title: "Settings",
        url: `/${role}/patient/settings`,
        icon: Settings2,
        items: [
          { title: "Profile", url: `/${role}/patient/settings` },
          { title: "Preferences", url: `/${role}/patient/settings?tab=security` },
          { title: "Notifications", url: `/${role}/patient/settings?tab=notifications` },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
          { title: "Changelog", url: "#" },
        ],
      },
    ],
    navSecondary: [
      { title: "Help & Support", url: "#", icon: LifeBuoy },
      { title: "Send Feedback", url: "#", icon: Send },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: Frame },
      { name: "Sales & Marketing", url: "#", icon: PieChart },
      { name: "Travel", url: "#", icon: Map },
    ],
  }

  return (
    <Sidebar className="top-[--header-height] !h-[calc(100svh-var(--header-height))]" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PHB Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() =>
                  handleNavigation({
                    section: item.title,
                    subsection: item.items?.[0]?.title || item.title,
                    url: item.url,
                  })
                }
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
              {item.items && (
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        onClick={() =>
                          handleNavigation({
                            section: item.title,
                            subsection: subItem.title,
                            url: subItem.url,
                          })
                        }
                      >
                        {subItem.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Card isFooterBlurred className="border-none" radius="sm">
          <NextImage
            alt="Woman listing to music"
            className="object-cover"
            src="/images/43193621_9029914.svg"
            width={250}
            height={200}
            layout="responsive"
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <code className="text-tiny text-black/80">Available soon.</code>
            <Button className="text-tiny text-white bg-black/20" color="default" radius="lg" size="sm" variant="flat">
              Notify me
            </Button>
          </CardFooter>
        </Card>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}