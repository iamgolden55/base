import React, { useState } from 'react'
import { motion } from "framer-motion"
import { 
  FileText, 
  Filter, 
  Download, 
  Calendar,
  Search,
  Share2,
  Printer,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileBarChart,
  FileImage,
  FileClock,
  FileCheck,
  Plus,
  ChevronDown
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DateRangePicker from "@/app/components/custom-date-picker"
import { Input, Button, Select, SelectItem } from "@nextui-org/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem 
  } from "@nextui-org/react"

interface Report {
  id: string
  title: string
  type: 'Lab' | 'Imaging' | 'Clinical' | 'Surgery' | 'Progress'
  date: string
  doctor: string
  status: 'complete' | 'pending' | 'in-review'
  priority: 'routine' | 'urgent' | 'critical'
  category: string
}

// Mock data for demonstration
const recentReports: Report[] = [
  {
    id: "REP-2024-001",
    title: "Complete Blood Count Analysis",
    type: "Lab",
    date: "2024-03-15",
    doctor: "Dr. Sarah Chen",
    status: "complete",
    priority: "routine",
    category: "Hematology"
  },
  {
    id: "REP-2024-002",
    title: "Chest X-Ray Examination",
    type: "Imaging",
    date: "2024-03-14",
    doctor: "Dr. Michael Brown",
    status: "complete",
    priority: "urgent",
    category: "Radiology"
  },
  {
    id: "REP-2024-003",
    title: "Post-Surgery Follow-up",
    type: "Surgery",
    date: "2024-03-13",
    doctor: "Dr. James Wilson",
    status: "in-review",
    priority: "critical",
    category: "Orthopedics"
  },
  {
    id: "REP-2024-004",
    title: "Cardiac Stress Test Results",
    type: "Clinical",
    date: "2024-03-12",
    doctor: "Dr. Emily Johnson",
    status: "pending",
    priority: "urgent",
    category: "Cardiology"
  }
]

export default function MedicalReports() {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  })

  // Get status badge styling
  const getStatusBadge = (status: Report['status']) => {
    const styles = {
      complete: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "in-review": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
    return styles[status]
  }

  // Get priority badge styling
  const getPriorityBadge = (priority: Report['priority']) => {
    const styles = {
      routine: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      urgent: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }
    return styles[priority]
  }

  // Get icon for report type
  const getReportTypeIcon = (type: Report['type']) => {
    const icons = {
      Lab: FileBarChart,
      Imaging: FileImage,
      Clinical: FileText,
      Surgery: FileCheck,
      Progress: FileClock
    }
    return icons[type]
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Medical Reports</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Access and manage all medical reports in one place
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="light" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">2,842</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 text-muted-foreground">
              <FileText className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              4 urgent reviews needed
            </p>
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 text-yellow-500">
              <Clock className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Critical Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention required
            </p>
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 text-red-500">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              All reviews up to date
            </p>
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Report Filters</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Refine your report view using the filters below
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium">Search Reports</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, title, or doctor..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Report Type Select */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium">Report Type</label>
              <Select
                placeholder="Select type"
                selectedKeys={[selectedType]}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <SelectItem key="all" value="all">All Types</SelectItem>
                <SelectItem key="lab" value="lab">Laboratory</SelectItem>
                <SelectItem key="imaging" value="imaging">Imaging</SelectItem>
                <SelectItem key="clinical" value="clinical">Clinical</SelectItem>
                <SelectItem key="surgery" value="surgery">Surgery</SelectItem>
              </Select>
            </div>

            {/* Status Select */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium">Status</label>
              <Select
                placeholder="Select status"
                selectedKeys={[selectedStatus]}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <SelectItem key="all" value="all">All Status</SelectItem>
                <SelectItem key="complete" value="complete">Complete</SelectItem>
                <SelectItem key="pending" value="pending">Pending</SelectItem>
                <SelectItem key="in-review" value="in-review">In Review</SelectItem>
              </Select>
            </div>

            {/* Date Range */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium">Date Range</label>
              <DateRangePicker
                date={dateRange}
                onChange={(date) => setDateRange(date)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Recent Reports</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            View and manage your most recent medical reports
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px] sm:w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Priority</TableHead>
                  <TableHead className="w-[60px] sm:w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => {
                  const TypeIcon = getReportTypeIcon(report.type)
                  return (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium text-xs sm:text-sm">
                        {report.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs sm:text-sm line-clamp-1">
                            {report.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                        {report.type}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                        {new Date(report.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                        {report.doctor}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadge(report.status)} text-xs`}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className={`${getPriorityBadge(report.priority)} text-xs`}>
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button 
                              variant="light" 
                              isIconOnly
                              size="sm"
                              className="h-8 w-8"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Report actions">
                            <DropdownItem
                              key="view"
                              startContent={<Eye className="h-4 w-4" />}
                            >
                              View
                            </DropdownItem>
                            <DropdownItem
                              key="download"
                              startContent={<Download className="h-4 w-4" />}
                            >
                              Download
                            </DropdownItem>
                            <DropdownItem
                              key="share"
                              startContent={<Share2 className="h-4 w-4" />}
                            >
                              Share
                            </DropdownItem>
                            <DropdownItem
                              key="print"
                              startContent={<Printer className="h-4 w-4" />}
                            >
                              Print
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}