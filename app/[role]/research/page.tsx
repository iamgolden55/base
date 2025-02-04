'use client'

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
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  Brain,
  Users,
  FileText,
  TestTube,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  Microscope,
  ClipboardList,
  BookOpen,
  Beaker,
  UserCheck,
  BarChart2,
  Share2,
  AlertTriangle,
  Settings,
  Database,
  TrendingUp,
  BookOpenCheck,
  FileCode2,
  Globe2
} from 'lucide-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function ResearchDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Example research metrics
  const researchMetrics = [
    { month: 'January', participants: 186, findings: 45, publications: 12 },
    { month: 'February', participants: 305, findings: 52, publications: 15 },
    { month: 'March', participants: 237, findings: 48, publications: 18 },
    { month: 'April', participants: 73, findings: 70, publications: 22 },
    { month: 'May', participants: 209, findings: 65, publications: 20 },
    { month: 'June', participants: 214, findings: 58, publications: 25 }
  ];

  const cohortDistribution = [
    { name: 'Control Group', value: 30, color: '#22c55e' },
    { name: 'Treatment A', value: 25, color: '#3b82f6' },
    { name: 'Treatment B', value: 25, color: '#6366f1' },
    { name: 'Treatment C', value: 20, color: '#ec4899' }
  ];

  const chartConfig = {
    participants: {
      label: "Participants",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Research Hub</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header Section */}
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Research Hub</h1>
              <p className="text-muted-foreground">
                Manage your research projects, cohorts, and analytics
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Brain className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* AI Research Assistant Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                AI Research Assistant
              </CardTitle>
              <CardDescription>
                AI-powered insights and analysis for your research projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <Database className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-medium">Data Analysis</p>
                    <p className="text-sm text-muted-foreground">3 new patterns identified</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <BarChart2 className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Statistical Analysis</p>
                    <p className="text-sm text-muted-foreground">2 significant correlations found</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <Share2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium">Collaboration</p>
                    <p className="text-sm text-muted-foreground">5 researchers online</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview" className="flex gap-2">
                <ClipboardList className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="cohorts" className="flex gap-2">
                <Users className="h-4 w-4" />
                Cohorts
              </TabsTrigger>
              <TabsTrigger value="data" className="flex gap-2">
                <Database className="h-4 w-4" />
                Data Analytics
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex gap-2">
                <BookOpen className="h-4 w-4" />
                Publications
              </TabsTrigger>
              <TabsTrigger value="ethics" className="flex gap-2">
                <UserCheck className="h-4 w-4" />
                Ethics & Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Research Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,854</div>
                    <p className="text-xs text-muted-foreground">
                      +180 this quarter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Publications</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">
                      +3 this year
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <TestTube className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last quarter
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Research Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Research Trends</CardTitle>
                  <CardDescription>Monthly research activity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full max-w-4xl mx-auto">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={researchMetrics}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                        height={200}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Area
                          dataKey="participants"
                          type="linear"
                          fill="var(--color-participants)"
                          fillOpacity={0.4}
                          stroke="var(--color-participants)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 15.2% this month <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-2 leading-none text-muted-foreground">
                        January - June 2024
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Active Research Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Research Projects</CardTitle>
                  <CardDescription>Your ongoing research initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Microscope className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">COVID-19 Long-term Effects Study</h3>
                          <p className="text-sm text-muted-foreground">Phase 3 - Data Collection</p>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI in Early Disease Detection</h3>
                          <p className="text-sm text-muted-foreground">Phase 2 - Model Training</p>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cohorts">
              {/* Cohort Management Content */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cohort Distribution</CardTitle>
                    <CardDescription>Current participant distribution across study groups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={cohortDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {cohortDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Progress</CardTitle>
                    <CardDescription>Participant recruitment status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Control Group</span>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Treatment Group</span>
                          <span className="text-sm text-muted-foreground">60%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-full w-3/5 bg-green-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data">
              {/* Data Analytics Content */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Query Tools</CardTitle>
                    <CardDescription>Search and filter research data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input placeholder="Enter SQL or natural language query..." className="flex-1" />
                        <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">
                          <Search className="h-4 w-4 mr-2 text-white" />
                          Search
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recent Queries</p>
                        <div className="space-y-2">
                          <div className="p-2 bg-muted rounded-lg text-sm">
                            SELECT patient_id, diagnosis FROM clinical_data WHERE age {'>'} 50
                          </div>
                          <div className="p-2 bg-muted rounded-lg text-sm">
                            Find all patients with diabetes and hypertension
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Sources</CardTitle>
                    <CardDescription>Connected data sources and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-500" />
                          <span>Electronic Health Records</span>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-green-500" />
                          <span>Clinical Trial Data</span>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-red-500" />
                          <span>Genomic Database</span>
                        </div>
                        <Badge variant="outline">Disconnected</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Data Integration Section */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Integrated Data Sources</CardTitle>
                  <CardDescription>Multi-source data integration status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCode2 className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">IoT/Wearable Data</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Real-time patient vitals and activity metrics</p>
                      <Badge variant="secondary" className="mt-2">Active</Badge>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe2 className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Public Health Data</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Population health statistics and trends</p>
                      <Badge variant="secondary" className="mt-2">Active</Badge>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpenCheck className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Literature Database</span>
                      </div>
                      <p className="text-sm text-muted-foreground">PubMed and journal integrations</p>
                      <Badge variant="secondary" className="mt-2">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publications">
              {/* Publications Content */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Publications</CardTitle>
                    <CardDescription>Latest research papers and findings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Impact of AI on Early Disease Detection</h3>
                          <Badge variant="secondary">Published</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Journal of Medical AI, 2024
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Citations: 12</span>
                          <span>•</span>
                          <span>Downloads: 245</span>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Long-term COVID-19 Effects: A Comprehensive Study</h3>
                          <Badge variant="secondary">In Review</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Medical Research Journal, 2024
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Pre-print Available</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Literature Integration Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Literature & Evidence</CardTitle>
                    <CardDescription>Related research and clinical guidelines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search PubMed and journals..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-1">Related Publications</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <span>Latest treatment protocols (2024)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <span>Clinical guidelines update</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-1">Evidence Framework</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Research methodology standards</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Data collection protocols</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ethics">
              {/* Ethics & Compliance Content */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                    <CardDescription>Research ethics and regulatory compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-green-500" />
                          <span>IRB Approval</span>
                        </div>
                        <Badge variant="secondary">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>HIPAA Compliance</span>
                        </div>
                        <Badge variant="outline">Review Required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-blue-500" />
                          <span>Data Protection</span>
                        </div>
                        <Badge variant="secondary">Compliant</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Reviews</CardTitle>
                    <CardDescription>Scheduled ethics and compliance reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Annual IRB Review</h3>
                          <Badge>Due in 30 days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive review of research protocols and participant safety
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Data Security Audit</h3>
                          <Badge>Due in 45 days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Review of data handling procedures and security measures
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
