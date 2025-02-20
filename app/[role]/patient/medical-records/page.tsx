"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  CalendarDays,
  Droplet,
  Scale,
  Stethoscope,
  AlertTriangle,
  Phone,
  Pill,
  HeartPulse,
  NutOff,
  Calendar,
  RefreshCcw,
  MessageSquare,
  Target,
  CreditCard,
  Upload,
  Video,
  FileText,
  ChevronUp,
  ChevronDown,
  Minus,
  Activity,
  Thermometer,
  AudioWaveform,
  HeartHandshake,
  Bandage,
  Microscope,
  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    getKeyValue,
  } from "@heroui/react";
  import useSWR from "swr";
  
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/app/utils/format-date"
import {User} from "@heroui/react";
import { useRole } from "@/hooks/useRole"
import { Icons } from "@/app/components/ui/icons"
import { cn } from "@/lib/utils"

const medications = [
  { name: "Lisinopril 10mg", dosage: "Once daily", condition: "Hypertension" },
  { name: "Metformin 500mg", dosage: "Twice daily", condition: "Diabetes" },
]

const fetcher = (...args: [RequestInfo | URL, RequestInit?]) => fetch(...args).then((res) => res.json());

interface VitalChartData {
  date: string;
  systolic: number;
  diastolic: number;
}

interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

const vitalData: VitalChartData[] = [
  { date: "2024-01-01", systolic: 120, diastolic: 80 },
  { date: "2024-02-01", systolic: 118, diastolic: 78 },
]

interface Allergy {
  name: string;
  severity: string;
  reaction: string;
}

const allergies: Allergy[] = [{ name: "Penicillin", severity: "High", reaction: "Anaphylaxis" }]

interface VitalItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const medicalHistory = [
  {
    title: "Appendectomy",
    date: "2024-01-15",
    location: "City General Hospital",
    description: "Laparoscopic appendectomy performed under general anesthesia. No complications."
  },
  {
    title: "Annual Physical",
    date: "2023-12-01",
    location: "Family Care Clinic",
    description: "Routine checkup. All vitals normal. Recommended lifestyle modifications."
  },
  // Add more history items as needed
]

const labResults = [
  {
    name: "Complete Blood Count",
    value: "5.2",
    range: "4.5-5.5",
    date: "2024-02-15",
    status: "normal"
  },
  {
    name: "Cholesterol",
    value: "220",
    range: "125-200",
    date: "2024-02-15",
    status: "high"
  },
  // Add more lab results as needed
]

const documents = [
  {
    name: "Annual Physical Report",
    date: "2024-02-15",
    type: "PDF",
    size: "2.4 MB"
  },
  {
    name: "Chest X-Ray",
    date: "2024-01-20",
    type: "DICOM",
    size: "15.8 MB"
  },
  // Add more documents as needed
]

export default function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Enhanced Header Section */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">Medical Records</h1>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-[600px] grid-cols-4 rounded-full p-1">
                <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
                <TabsTrigger value="history" className="rounded-full">History</TabsTrigger>
                <TabsTrigger value="tests" className="rounded-full">Tests</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-full">Documents</TabsTrigger>
              </TabsList>
              <Button size="sm" className="bg-primary rounded-full hover:bg-primary/90">
                <Icons.upload className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Upload Record</span>
              </Button>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container p-4">
        <PatientHeader />
       <br />
        <EmergencyContact />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Vitals Card */}
              <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
                <div className="bg-blue-500/10 px-4 py-3 border-b border-blue-500/10">
                  <Badge variant="secondary" className="rounded-full font-medium bg-blue-500/10 text-blue-700">
                    <Activity className="mr-2 h-4 w-4" />
                    Latest Vitals
                  </Badge>
                </div>
                <div className="p-4 space-y-4">
                  <VitalItem icon={<HeartPulse />} label="Blood Pressure" value="120/80" unit="mmHg" trend="stable" />
                  <VitalItem icon={<Thermometer />} label="Temperature" value="98.6" unit="°F" trend="up" />
                  <VitalItem icon={<AudioWaveform />} label="Oxygen Level" value="98" unit="%" trend="stable" />
                  <VitalItem icon={<HeartHandshake />} label="Heart Rate" value="72" unit="bpm" trend="down" />
                </div>
              </Card>

              {/* Medications Card */}
              <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
                <div className="bg-green-500/10 px-4 py-3 border-b border-green-500/10">
                  <Badge variant="secondary" className="rounded-full font-medium bg-green-500/10 text-green-700">
                    <Bandage className="mr-2 h-4 w-4" />
                    Current Medications
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40">
                      <Icons.medical className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">{med.dosage} • {med.condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Allergies Card */}
              <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
                <div className="bg-red-500/10 px-4 py-3 border-b border-red-500/10">
                  <Badge variant="secondary" className="rounded-full font-medium bg-red-500/10 text-red-700">
                    <Icons.alert className="mr-2 h-4 w-4" />
                    Allergies & Alerts
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  {allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-red-50">
                      <Icons.alert className="h-5 w-5 text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-red-700">{allergy.name}</p>
                        <p className="text-sm text-red-600/80">Severity: {allergy.severity} • {allergy.reaction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
              <div className="bg-purple-500/10 px-4 py-3 border-b border-purple-500/10">
                <Badge variant="secondary" className="rounded-full font-medium bg-purple-500/10 text-purple-700">
                  <Icons.clock className="mr-2 h-4 w-4" />
                  Medical History Timeline
                </Badge>
              </div>
              <div className="p-4 space-y-4">
                {medicalHistory.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      {index < medicalHistory.length - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                        <Badge variant="outline" className="rounded-full">
                          {event.date}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
              <div className="bg-blue-500/10 px-4 py-3 border-b border-blue-500/10">
                <Badge variant="secondary" className="rounded-full font-medium bg-blue-500/10 text-blue-700">
                  <Microscope className="mr-2 h-4 w-4" />
                  Laboratory Results
                </Badge>
              </div>
              <div className="p-4">
                <Table
                  aria-label="Lab Results"
                  classNames={{
                    wrapper: "rounded-xl border-2 border-primary/10",
                    th: "bg-secondary/40 text-foreground font-medium",
                    td: "text-muted-foreground"
                  }}
                >
                  <TableHeader>
                    <TableColumn>TEST NAME</TableColumn>
                    <TableColumn>RESULT</TableColumn>
                    <TableColumn>REFERENCE RANGE</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {labResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.value}</TableCell>
                        <TableCell>{result.range}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "rounded-full",
                              result.status === "normal" ? "bg-green-500/10 text-green-700" :
                              result.status === "high" ? "bg-red-500/10 text-red-700" :
                              "bg-yellow-500/10 text-yellow-700"
                            )}
                          >
                            {result.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border-2 border-primary/10">
              <div className="bg-green-500/10 px-4 py-3 border-b border-green-500/10">
                <Badge variant="secondary" className="rounded-full font-medium bg-green-500/10 text-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Medical Documents
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-secondary/40">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        doc.type === "PDF" ? "bg-red-500/10" :
                        doc.type === "DICOM" ? "bg-blue-500/10" :
                        "bg-purple-500/10"
                      )}>
                        <FileText className={cn(
                          "h-5 w-5",
                          doc.type === "PDF" ? "text-red-500" :
                          doc.type === "DICOM" ? "text-blue-500" :
                          "text-purple-500"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.date} • {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PatientHeader() {
  const userData = useRole();

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Sarah Johnson" />
            <AvatarFallback>{userData?.basic_info?.full_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl font-light">{userData?.basic_info?.full_name}</h1>
              <Badge variant="outline" className="text-sm">
                <CheckCircle className="w-4 h-4 mr-1" /> Active Patient
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2">
                <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span>DOB: {userData?.basic_info?.date_of_birth}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Droplet className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                <span>Blood Type: A+</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span>BMI: 24.2</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>PCP: Dr. Emily Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmergencyContact() {
  return (
    <Card className="bg-red-50 border-l-4 border-red-500">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-red-800 flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5" />
            Emergency Contacts
          </CardTitle>
          <CardDescription className="text-red-700">James Johnson (Spouse) • (617) 555-0123</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="text-red-700 w-full sm:w-auto">
          <Phone className="w-4 h-4 mr-2" />
          Emergency Protocol
        </Button>
      </CardContent>
    </Card>
  )
}

function VitalItem({ icon, label, value, unit, trend }: VitalItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40">
      <div className="text-blue-600">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">{value}</p>
          <span className="text-sm text-muted-foreground">{unit}</span>
          {trend === "up" && <ChevronUp className="h-4 w-4 text-green-500" />}
          {trend === "down" && <ChevronDown className="h-4 w-4 text-red-500" />}
          {trend === "stable" && <Minus className="h-4 w-4 text-blue-500" />}
        </div>
      </div>
    </div>
  )
}

function LabResultsTable() {
  const labResults = [
    { test: "Complete Blood Count", result: "Normal", date: "2024-01-15" },
    { test: "Lipid Panel", result: "Elevated LDL", date: "2024-01-15" },
    { test: "HbA1c", result: "5.7%", date: "2024-01-15" },
  ]

  const [page, setPage] = useState(1);

  const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

  return (
    <div className="overflow-x-auto">
      <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ?? [] as StarWarsPerson[]}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: StarWarsPerson) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  )
}

function ImmunizationList() {
  const immunizations = [
    { name: "Influenza (Flu)", date: "2023-10-15", nextDue: "2024-10" },
    { name: "Tetanus, Diphtheria, Pertussis (Tdap)", date: "2020-05-20", nextDue: "2030-05" },
    { name: "COVID-19", date: "2023-09-01", nextDue: "2024-09" },
  ]

  return (
    <ul className="space-y-2">
      {immunizations.map((immunization, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md"
        >
          <p className="font-medium">{immunization.name}</p>
          <p className="text-sm text-muted-foreground">
            Last dose: {formatDate(immunization.date)} • Next due: {immunization.nextDue}
          </p>
        </motion.li>
      ))}
    </ul>
  )
}

function TreatmentPlanList() {
  const treatmentPlans = [
    { condition: "Hypertension", plan: "Medication and lifestyle changes", lastUpdated: "2024-02-01" },
    { condition: "Type 2 Diabetes", plan: "Medication, diet, and exercise regimen", lastUpdated: "2024-01-15" },
  ]

  return (
    <ul className="space-y-2">
      {treatmentPlans.map((plan, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md"
        >
          <p className="font-medium">{plan.condition}</p>
          <p className="text-sm">{plan.plan}</p>
          <p className="text-xs text-muted-foreground">Last updated: {formatDate(plan.lastUpdated)}</p>
        </motion.li>
      ))}
    </ul>
  )
}

function BillingOverview() {
  const billingInfo = {
    nextPayment: { amount: 150, dueDate: "2024-04-01" },
    insuranceProvider: "HealthCare Plus",
    policyNumber: "HCP123456789",
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <p className="font-medium">Next Payment Due</p>
        <p className="text-2xl font-bold">${billingInfo.nextPayment.amount}</p>
        <p className="text-sm text-muted-foreground">Due on {formatDate(billingInfo.nextPayment.dueDate)}</p>
      </div>
      <div>
        <p className="font-medium">Insurance Information</p>
        <p>Provider: {billingInfo.insuranceProvider}</p>
        <p>Policy Number: {billingInfo.policyNumber}</p>
      </div>
    </div>
  )
}

function DocumentList() {
  const documents = [
    { name: "Annual Physical Results", date: "2024-01-15", type: "PDF" },
    { name: "Cardiology Consultation", date: "2023-11-30", type: "PDF" },
    { name: "X-Ray Images", date: "2023-10-22", type: "DICOM" },
  ]

  return (
    <ul className="space-y-2">
      {documents.map((doc, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{doc.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(doc.date)} • {doc.type}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            View
          </Button>
        </motion.li>
      ))}
    </ul>
  )
}

function MedicalHistoryTimeline() {
  const events = [
    { date: "2018-06-01", title: "Appendectomy", location: "Mass General Hospital" },
    { date: "2020-02-15", title: "Cataract Surgery", location: "Boston Eye Associates" },
  ]

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
          </div>
          <div>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(event.date)} • {event.location}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function FamilyPedigreeChart() {
  // Implement family pedigree chart
  return (
    <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
      <p className="text-muted-foreground">Family pedigree chart placeholder</p>
    </div>
  )
}
