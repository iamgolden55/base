"use client"

import { AppSidebar } from "@/app/components/researcher-dashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Users,
  MessagesSquare,
  Heart,
  Reply,
  Pin,
  Tag,
  Clock,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"

const discussions = [
  {
    id: 1,
    title: "Latest findings in gene expression analysis",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "Principal Investigator"
    },
    category: "Research Discussion",
    replies: 23,
    views: 156,
    likes: 45,
    isPinned: true,
    lastActivity: "2 hours ago",
    tags: ["Genomics", "Data Analysis", "Methods"],
  },
  {
    id: 2,
    title: "Collaboration opportunity: Clinical trial data analysis",
    author: {
      name: "Dr. Michael Chen",
      avatar: "/avatars/michael.jpg",
      role: "Senior Researcher"
    },
    category: "Collaboration",
    replies: 15,
    views: 89,
    likes: 12,
    isPinned: false,
    lastActivity: "5 hours ago",
    tags: ["Clinical Trials", "Statistics", "Collaboration"],
  },
  {
    id: 3,
    title: "New machine learning model for drug discovery",
    author: {
      name: "Dr. Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
      role: "Research Associate"
    },
    category: "Methods & Tools",
    replies: 34,
    views: 245,
    likes: 67,
    isPinned: true,
    lastActivity: "1 day ago",
    tags: ["Machine Learning", "Drug Discovery", "AI"],
  },
]

export default function ForumPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/role/research">Research Hub</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Discussion Forum</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Discussion Forum</h2>
              <p className="text-muted-foreground">
                Engage in research discussions and collaborations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
                  <MessagesSquare className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86</div>
                  <p className="text-xs text-muted-foreground">
                    +12 new this week
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    Currently online
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <MessageSquare className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    Across all topics
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                  <Heart className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">
                    Response rate
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search discussions..." className="pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="methods">Methods & Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:bg-accent transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                              <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                {discussion.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                                <CardTitle className="text-base">{discussion.title}</CardTitle>
                              </div>
                              <CardDescription>
                                by {discussion.author.name} · {discussion.author.role}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">{discussion.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Reply className="mr-1 h-4 w-4" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-4 w-4" />
                              {discussion.views} views
                            </div>
                            <div className="flex items-center">
                              <Heart className="mr-1 h-4 w-4" />
                              {discussion.likes} likes
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {discussion.lastActivity}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="flex items-center">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research">
              <Card>
                <CardHeader>
                  <CardTitle>Research Discussions</CardTitle>
                  <CardDescription>
                    View and participate in research-focused discussions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Research discussions content */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration">
              <Card>
                <CardHeader>
                  <CardTitle>Collaboration Opportunities</CardTitle>
                  <CardDescription>
                    Find and discuss research collaboration opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Collaboration content */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methods">
              <Card>
                <CardHeader>
                  <CardTitle>Methods & Tools</CardTitle>
                  <CardDescription>
                    Discuss research methods and tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Methods content */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 