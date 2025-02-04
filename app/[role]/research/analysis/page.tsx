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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartBar,
  Brain,
  LineChart,
  PieChart,
  Table2,
  FileSpreadsheet,
  Sigma,
  Microscope,
  Share2,
  Download,
  Upload,
  Plus,
  Settings,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AnalysisToolsPage() {
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
                <BreadcrumbPage>Analysis Tools</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Analysis Tools</h2>
              <p className="text-muted-foreground">
                Powerful tools for research data analysis and visualization
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Analysis
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Analysis
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
                  <CardTitle className="text-sm font-medium">Statistical Analysis</CardTitle>
                  <Sigma className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    Active analyses running
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
                  <CardTitle className="text-sm font-medium">ML Models</CardTitle>
                  <Brain className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Trained models available
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
                  <CardTitle className="text-sm font-medium">Visualizations</CardTitle>
                  <ChartBar className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">
                    Generated this month
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
                  <CardTitle className="text-sm font-medium">Data Sets</CardTitle>
                  <Table2 className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">
                    Available for analysis
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs defaultValue="tools" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Analysis Tools
              </TabsTrigger>
              <TabsTrigger value="visualizations" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Visualizations
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Machine Learning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistical Analysis</CardTitle>
                      <CardDescription>
                        Perform advanced statistical analysis on your research data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select analysis type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regression">Regression Analysis</SelectItem>
                            <SelectItem value="anova">ANOVA</SelectItem>
                            <SelectItem value="ttest">T-Test</SelectItem>
                            <SelectItem value="correlation">Correlation Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button>Run Analysis</Button>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Recent Analyses</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <span className="text-sm">Regression Analysis - Trial Data</span>
                            <Badge>Completed</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <span className="text-sm">ANOVA - Patient Groups</span>
                            <Badge variant="secondary">Running</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Preprocessing</CardTitle>
                      <CardDescription>
                        Clean and prepare your data for analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preprocessing task" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cleaning">Data Cleaning</SelectItem>
                            <SelectItem value="normalization">Normalization</SelectItem>
                            <SelectItem value="transformation">Data Transformation</SelectItem>
                            <SelectItem value="feature">Feature Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button>Process Data</Button>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Processing Queue</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <span className="text-sm">Data Cleaning - New Dataset</span>
                            <Badge>In Progress</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <span className="text-sm">Feature Engineering</span>
                            <Badge variant="outline">Queued</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="visualizations" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Data Visualization</CardTitle>
                        <CardDescription>
                          Create interactive visualizations of your research data
                        </CardDescription>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Visualization
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <LineChart className="h-8 w-8 mb-2 text-blue-500" />
                        <h4 className="font-medium">Time Series</h4>
                        <p className="text-sm text-muted-foreground">
                          Analyze temporal patterns
                        </p>
                      </Card>
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <PieChart className="h-8 w-8 mb-2 text-purple-500" />
                        <h4 className="font-medium">Distribution</h4>
                        <p className="text-sm text-muted-foreground">
                          View data distributions
                        </p>
                      </Card>
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <ChartBar className="h-8 w-8 mb-2 text-green-500" />
                        <h4 className="font-medium">Comparisons</h4>
                        <p className="text-sm text-muted-foreground">
                          Compare data sets
                        </p>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="ml" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Machine Learning Models</CardTitle>
                        <CardDescription>
                          Train and deploy machine learning models
                        </CardDescription>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Model
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">Disease Prediction Model</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Accuracy: 94.5% | Last trained: 2 days ago
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retrain
                          </Button>
                          <Button size="sm">Deploy</Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Patient Risk Assessment</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Accuracy: 91.2% | Last trained: 5 days ago
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retrain
                          </Button>
                          <Button size="sm">Deploy</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 