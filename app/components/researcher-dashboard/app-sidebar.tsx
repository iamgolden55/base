import * as React from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface MenuItem {
  title: string
  url: string
}

interface NavItem {
  title: string
  url: string
  items: MenuItem[]
}

// This is sample data.
const data = {
  versions: ["2024", "2023", "2022"],
  navMain: [
    {
      title: "Getting Started",
      url: "/research/getting-started",
      items: [
        {
          title: "Overview",
          url: "/research/getting-started/overview",
        },
        {
          title: "Research Guidelines",
          url: "/research/getting-started/guidelines",
        }
      ],
    },
    {
      title: "Research Management",
      url: "/research/management",
      items: [
        {
          title: "Projects",
          url: "/research/projects",
        },
        {
          title: "Publications",
          url: "/research/publications",
        },
        {
          title: "Data Collection",
          url: "/research/data-collection",
        },
        {
          title: "Analysis Tools",
          url: "/research/analysis",
        }
      ],
    },
    {
      title: "Collaboration",
      url: "/research/collaboration",
      items: [
        {
          title: "Team Members",
          url: "/research/collaboration/team",
        },
        {
          title: "Shared Resources",
          url: "/research/collaboration/resources",
        },
        {
          title: "Discussion Forum",
          url: "/research/collaboration/forum",
        }
      ],
    },
    {
      title: "Resources",
      url: "/research/resources",
      items: [
        {
          title: "Literature Database",
          url: "/research/resources/literature",
        },
        {
          title: "Research Tools",
          url: "/research/resources/tools",
        },
        {
          title: "Templates",
          url: "/research/resources/templates",
        }
      ],
    },
    {
      title: "Settings",
      url: "/research/settings",
      items: [
        {
          title: "Profile Settings",
          url: "/research/settings/profile",
        },
        {
          title: "Notifications",
          url: "/research/settings/notifications",
        },
        {
          title: "Privacy & Security",
          url: "/research/settings/privacy",
        }
      ],
    }
  ] as NavItem[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild isActive={pathname === subItem.url}>
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
