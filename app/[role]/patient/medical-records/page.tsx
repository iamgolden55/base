"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/app/utils/format-date"
import { useRole } from "@/hooks/useRole"

const medications = [
  { name: "Lisinopril 10mg", dosage: "Once daily", condition: "Hypertension" },
  { name: "Metformin 500mg", dosage: "Twice daily", condition: "Diabetes" },
]

interface VitalChartData {
  date: string;
  systolic: number;
  diastolic: number;
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

export default function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState("overview")


  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
      <PatientHeader />
      <EmergencyContact />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mb-4 sm:mb-6 gap-2">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="appointments" className="text-xs sm:text-sm">
            Appointments
          </TabsTrigger>
          <TabsTrigger value="medications" className="text-xs sm:text-sm">
            Medications
          </TabsTrigger>
          <TabsTrigger value="labresults" className="text-xs sm:text-sm">
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="immunizations" className="text-xs sm:text-sm">
            Immunizations
          </TabsTrigger>
          <TabsTrigger value="treatments" className="text-xs sm:text-sm">
            Treatments
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs sm:text-sm">
            Billing
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm">
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewDashboard />
        </TabsContent>
        <TabsContent value="appointments">
          <AppointmentsSection />
        </TabsContent>
        <TabsContent value="medications">
          <MedicationsSection />
        </TabsContent>
        <TabsContent value="labresults">
          <LabResultsSection />
        </TabsContent>
        <TabsContent value="immunizations">
          <ImmunizationsSection />
        </TabsContent>
        <TabsContent value="treatments">
          <TreatmentsSection />
        </TabsContent>
        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsSection />
        </TabsContent>
      </Tabs>
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

function OverviewDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <DashboardPanel
        icon={<Pill className="w-6 h-6 text-blue-500" />}
        title="Active Medications"
        badge={`${medications.length} prescriptions`}
      >
        <MedicationList medications={medications} />
      </DashboardPanel>

      <DashboardPanel icon={<HeartPulse className="w-6 h-6 text-red-500" />} title="Vital Trends" badge="Last 30 days">
        <VitalChart data={vitalData} />
      </DashboardPanel>

      <DashboardPanel icon={<NutOff className="w-6 h-6 text-yellow-500" />} title="Allergy Profile" badge="High Risk">
        <AllergySeverity allergies={allergies} />
      </DashboardPanel>

      <DashboardPanel
        icon={<Calendar className="w-6 h-6 text-green-500" />}
        title="Upcoming Appointments"
        badge="Next 7 days"
      >
        <UpcomingAppointments />
      </DashboardPanel>

      <DashboardPanel icon={<Target className="w-6 h-6 text-purple-500" />} title="Health Goals" badge="In Progress">
        <HealthGoals />
      </DashboardPanel>

      <DashboardPanel
        icon={<MessageSquare className="w-6 h-6 text-indigo-500" />}
        title="Secure Messages"
        badge="1 unread"
      >
        <SecureMessaging />
      </DashboardPanel>
    </div>
  )
}

function AppointmentsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage your upcoming and past appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <UpcomingAppointments />
        <div className="mt-4">
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function MedicationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medications</CardTitle>
        <CardDescription>Your current prescriptions and medication history</CardDescription>
      </CardHeader>
      <CardContent>
        <MedicationList medications={medications} />
        <div className="mt-4">
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Request Refill
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LabResultsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lab Results</CardTitle>
        <CardDescription>View and track your lab test results over time</CardDescription>
      </CardHeader>
      <CardContent>
        <LabResultsTable />
      </CardContent>
    </Card>
  )
}

function ImmunizationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Immunization Records</CardTitle>
        <CardDescription>Your vaccination history and upcoming immunizations</CardDescription>
      </CardHeader>
      <CardContent>
        <ImmunizationList />
      </CardContent>
    </Card>
  )
}

function TreatmentsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Plans</CardTitle>
        <CardDescription>Current and past treatment plans for your conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <TreatmentPlanList />
      </CardContent>
    </Card>
  )
}

function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Insurance</CardTitle>
        <CardDescription>Manage your bills, payments, and insurance information</CardDescription>
      </CardHeader>
      <CardContent>
        <BillingOverview />
        <div className="mt-4">
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            Make a Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents & Records</CardTitle>
        <CardDescription>Access and upload important medical documents</CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentList />
        <div className="mt-4">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Document
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardPanelProps {
  icon: React.ReactNode
  title: string
  badge: string
  children: React.ReactNode
}

function DashboardPanel({ icon, title, badge, children }: DashboardPanelProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <Badge variant="secondary" className="text-xs sm:text-sm">
          {badge}
        </Badge>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

interface Medication {
  name?: string;
  dosage?: string;
  frequency?: string;
  // Add other medication properties as needed
}

function MedicationList({ medications }: { medications: Medication[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {medications.map((medication, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md"
        >
          <p className="font-medium">{medication.name}</p>
          <p className="text-xs text-muted-foreground">
            {medication.dosage} • {medication.frequency}
          </p>
        </motion.li>
      ))}
    </ul>
  )
}

function VitalChart({ data }: { data: VitalChartData[] }) {
  // Implement chart using a library like recharts or react-chartjs-2
  return (
    <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
      <p className="text-muted-foreground">Chart placeholder</p>
    </div>
  )
}

function AllergySeverity({ allergies }: { allergies: Allergy[] }) {
  return (
    <ul className="space-y-2">
      {allergies.map((allergy, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-red-50 rounded-md"
        >
          <p className="font-medium text-red-700">{allergy.name}</p>
          <p className="text-sm text-red-600">
            Severity: {allergy.severity} • Reaction: {allergy.reaction}
          </p>
        </motion.li>
      ))}
    </ul>
  )
}

function UpcomingAppointments() {
  const appointments = [
    { date: "2024-03-15", time: "10:00 AM", doctor: "Dr. Emily Wilson", type: "Check-up" },
    { date: "2024-03-22", time: "2:30 PM", doctor: "Dr. Michael Chen", type: "Cardiology" },
  ]

  return (
    <ul className="space-y-2">
      {appointments.map((appointment, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
        >
          <div>
            <p className="font-medium text-sm">
              {appointment.type} with {appointment.doctor}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(appointment.date)} at {appointment.time}
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Video className="w-4 h-4 mr-2" />
            Join
          </Button>
        </motion.li>
      ))}
    </ul>
  )
}

function HealthGoals() {
  const goals = [
    { goal: "Lose 10 lbs", progress: 60, target: "by June 1st" },
    { goal: "Lower blood pressure", progress: 40, target: "to 120/80" },
  ]

  return (
    <ul className="space-y-2">
      {goals.map((goal, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-2 bg-gray-50 rounded-md"
        >
          <p className="font-medium">{goal.goal}</p>
          <p className="text-sm text-muted-foreground">Target: {goal.target}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

function SecureMessaging() {
  const messages = [
    { from: "Dr. Emily Wilson", subject: "Follow-up on recent lab results", date: "2024-03-10", unread: true },
    { from: "Nurse Practitioner Johnson", subject: "Medication adjustment", date: "2024-03-08", unread: false },
  ]

  return (
    <ul className="space-y-2">
      {messages.map((message, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-2 rounded-md flex justify-between items-center ${message.unread ? "bg-blue-50" : "bg-gray-50"}`}
        >
          <div>
            <p className={`font-medium ${message.unread ? "text-blue-600" : ""}`}>{message.subject}</p>
            <p className="text-sm text-muted-foreground">
              From: {message.from} • {formatDate(message.date)}
            </p>
          </div>
          {message.unread && <Badge>New</Badge>}
        </motion.li>
      ))}
    </ul>
  )
}

function LabResultsTable() {
  const labResults = [
    { test: "Complete Blood Count", result: "Normal", date: "2024-01-15" },
    { test: "Lipid Panel", result: "Elevated LDL", date: "2024-01-15" },
    { test: "HbA1c", result: "5.7%", date: "2024-01-15" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Test</th>
            <th className="text-left p-2">Result</th>
            <th className="text-left p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {labResults.map((result, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b last:border-b-0"
            >
              <td className="p-2">{result.test}</td>
              <td className="p-2">{result.result}</td>
              <td className="p-2">{formatDate(result.date)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
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
