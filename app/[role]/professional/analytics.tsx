// app/[role]/professional/analytics.tsx

"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import DateRangePicker from "@/app/components/custom-date-picker"
import { addDays, format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Activity,
  Brain,
  Calendar,
  HeartPulse,
  LineChart as ChartIcon,
  PieChart as PieChartIcon,
  Stethoscope,
  Users,
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  BadgeCheck,
  FileText,
  Filter,
  Loader2
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  PatientAnalytics,
  ClinicalOutcomes,
  PracticeEfficiency
} from './components/analytics'  // Import the new components


// Types
interface DateRange {
  from: Date
  to?: Date
}

interface PatientMetric {
  month: string
  newPatients: number
  followUps: number
  referrals: number
}

interface HealthOutcome {
  name: string
  value: number
  color: string
}

interface QuickStatCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
  trend?: 'up' | 'down'
}

type MetricType = 'all' | 'patients' | 'outcomes' | 'revenue'

// Mock data
const patientTrendData: PatientMetric[] = [
  { month: 'Jan', newPatients: 45, followUps: 120, referrals: 25 },
  { month: 'Feb', newPatients: 52, followUps: 115, referrals: 30 },
  { month: 'Mar', newPatients: 48, followUps: 125, referrals: 28 },
  { month: 'Apr', newPatients: 70, followUps: 140, referrals: 35 },
  { month: 'May', newPatients: 65, followUps: 135, referrals: 32 },
  { month: 'Jun', newPatients: 58, followUps: 130, referrals: 29 }
]

const healthOutcomesData: HealthOutcome[] = [
  { name: 'Improved', value: 65, color: '#22c55e' },
  { name: 'Stable', value: 25, color: '#3b82f6' },
  { name: 'Needs Attention', value: 10, color: '#ef4444' }
]

// Helper Components
const QuickStatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = 'up' 
}: QuickStatCardProps) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500'
  const trendIcon = trend === 'up' ? '↑' : '↓'

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium truncate">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor} flex items-center gap-1`}>
          <span>{trendIcon}</span>
          {change} from last period
        </p>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsDashboard() {
  // State
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30)
  })
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("all")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Handlers
  const handleDateRangeChange = async (range: DateRange | undefined) => {
    if (!range) return

    setIsLoading(true)
    try {
      setDateRange(range)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Date range updated",
        description: `Data refreshed for ${format(range.from, 'PP')} - ${range.to ? format(range.to, 'PP') : 'present'}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update date range. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMetricChange = (value: MetricType) => {
    setSelectedMetric(value)
    toast({
      title: "Metric filter updated",
      description: `Showing ${value === 'all' ? 'all metrics' : value} data`,
    })
  }

  const handleExport = async () => {
    setIsLoading(true)
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        title: "Report exported",
        description: "The analytics report has been exported successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Could not export report. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-6">
      {/* Header and Filters */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Comprehensive analysis of patient care and practice metrics
          </p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <DateRangePicker
              date={dateRange}
              onChange={handleDateRangeChange}
              className="w-full"
            />
            
            <Select
              defaultValue="all"
              onValueChange={(value: MetricType) => handleMetricChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="patients">Patients</SelectItem>
                <SelectItem value="outcomes">Outcomes</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleExport}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Exporting...</span>
                  <span className="sm:hidden">Export</span>
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Export Report</span>
                  <span className="sm:hidden">Export</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
            <Brain className="h-5 w-5 text-blue-500" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Real-time analysis and predictions based on your practice data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-lg bg-white p-3 sm:p-4 shadow-sm dark:bg-gray-800">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              <div>
                <p className="text-sm sm:text-base font-medium">Patient Risk Analysis</p>
                <p className="text-xs sm:text-sm text-muted-foreground">3 high-risk patients identified</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-lg bg-white p-3 sm:p-4 shadow-sm dark:bg-gray-800">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
              <div>
                <p className="text-sm sm:text-base font-medium">Treatment Optimization</p>
                <p className="text-xs sm:text-sm text-muted-foreground">2 care plan suggestions available</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-lg bg-white p-3 sm:p-4 shadow-sm dark:bg-gray-800">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              <div>
                <p className="text-sm sm:text-base font-medium">Predictive Analytics</p>
                <p className="text-xs sm:text-sm text-muted-foreground">85% accuracy in readmission predictions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="w-full overflow-x-auto">
          <TabsList className="w-full sm:w-auto inline-flex whitespace-nowrap">
            <TabsTrigger value="overview" className="flex gap-2">
              <Activity className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex gap-2">
              <Users className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Patient Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="clinical" className="flex gap-2">
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Clinical Outcomes</span>
            </TabsTrigger>
            <TabsTrigger value="efficiency" className="flex gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Practice Efficiency</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4">
            <QuickStatCard
              title="Total Patients"
              value="1,284"
              change="+180"
              icon={Users}
              trend="up"
            />
            <QuickStatCard
              title="Patient Satisfaction"
              value="94.2%"
              change="+2.1%"
              icon={HeartPulse}
              trend="up"
            />
            <QuickStatCard
              title="Avg. Wait Time"
              value="12min"
              change="-3min"
              icon={Clock}
              trend="down"
            />
            <QuickStatCard
              title="Treatment Success"
              value="88%"
              change="+5%"
              icon={BadgeCheck}
              trend="up"
            />
          </div>

          {/* Charts */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Patient Trends</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Monthly patient visit distribution</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="h-[250px] sm:h-[300px] w-full p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patientTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="newPatients" 
                        stroke="#3b82f6" 
                        name="New Patients"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="followUps" 
                        stroke="#22c55e" 
                        name="Follow-ups"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="referrals" 
                        stroke="#f59e0b" 
                        name="Referrals"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Health Outcomes</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Treatment effectiveness analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="h-[250px] sm:h-[300px] w-full p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthOutcomesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {healthOutcomesData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients">
        <PatientAnalytics />
        </TabsContent>

        <TabsContent value="clinical">
        <ClinicalOutcomes />
        </TabsContent>

        <TabsContent value="efficiency">
        <PracticeEfficiency />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for quick stats