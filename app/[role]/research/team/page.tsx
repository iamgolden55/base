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
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  Award,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Microscope,
} from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Principal Investigator",
    department: "Neuroscience",
    email: "sarah.johnson@research.org",
    projects: 5,
    publications: 23,
    avatar: "/avatars/sarah.jpg",
    status: "Active",
    expertise: ["Neural Networks", "Brain Imaging", "Clinical Trials"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Senior Researcher",
    department: "Data Science",
    email: "michael.chen@research.org",
    projects: 4,
    publications: 15,
    avatar: "/avatars/michael.jpg",
    status: "Active",
    expertise: ["Machine Learning", "Statistical Analysis", "Data Visualization"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Research Associate",
    department: "Molecular Biology",
    email: "emily.rodriguez@research.org",
    projects: 3,
    publications: 8,
    avatar: "/avatars/emily.jpg",
    status: "On Leave",
    expertise: ["Gene Sequencing", "Protein Analysis", "Lab Techniques"],
  },
]

export default function TeamPage() {
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
                <BreadcrumbPage>Team Members</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Research Team</h2>
              <p className="text-muted-foreground">
                Manage and collaborate with your research team members
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
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
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +4 new this month
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
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Star className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    3 starting next month
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
                  <CardTitle className="text-sm font-medium">Publications</CardTitle>
                  <Award className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    +23 this year
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
                  <CardTitle className="text-sm font-medium">Research Impact</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4k</div>
                  <p className="text-xs text-muted-foreground">
                    Citations this year
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
                  <Input placeholder="Search team members..." className="pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All Members
              </TabsTrigger>
              <TabsTrigger value="researchers" className="flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Researchers
              </TabsTrigger>
              <TabsTrigger value="collaborators" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                External Collaborators
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="mr-2 h-4 w-4" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              {member.department}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="font-medium">{member.projects}</span> Projects
                            </div>
                            <div>
                              <span className="font-medium">{member.publications}</span> Publications
                            </div>
                            <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                              {member.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="researchers">
              <Card>
                <CardHeader>
                  <CardTitle>Research Staff</CardTitle>
                  <CardDescription>
                    View and manage research staff members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Research staff content */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaborators">
              <Card>
                <CardHeader>
                  <CardTitle>External Collaborators</CardTitle>
                  <CardDescription>
                    Manage external research collaborators and partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Collaborators content */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 