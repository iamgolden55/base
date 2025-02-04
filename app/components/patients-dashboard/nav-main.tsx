"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, type LucideIcon, Loader2 } from "lucide-react"
import { useActiveMenu } from '@/app/hooks/useActiveMenu'
import { useRole } from '@/hooks/useRole'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  onNavigate,
  currentPath,
  isLoading
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    id: string
    isActive?: boolean
    items?: {
      title: string
      url: string
      id: string
    }[]
  }[]
  onNavigate: (url: string) => void
  currentPath: string
  isLoading: string | null
}) {
  const pathname = usePathname()
  const { setActiveMenu } = useActiveMenu()
  const role = useRole()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                className={pathname === item.url ? "bg-accent" : ""}
              >
                <Link
                  href={item.url}
                  onClick={() => onNavigate(item.url)}
                  prefetch={true}
                  className={`relative flex items-center ${
                    currentPath === item.url ? "text-primary" : ""
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                  {isLoading === item.url && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Link>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild
                            className={pathname === subItem.url ? "bg-accent" : ""}
                          >
                            <Link
                              href={subItem.url}
                              onClick={() => onNavigate(subItem.url)}
                              prefetch={true}
                              className={`relative flex items-center ${
                                currentPath === subItem.url ? "text-primary" : ""
                              }`}
                            >
                              <span>{subItem.title}</span>
                              {isLoading === subItem.url && (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
