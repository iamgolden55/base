"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/app/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RescheduleDrawer } from "@/app/components/appointments/reschedule-drawer"
import {Avatar} from "@heroui/react";
import { Pagination } from "@heroui/react"
import { cn } from "@/lib/utils"

export default function AppointmentPage() {
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Mock past appointments data (in real app, this would come from an API)
  const pastAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Gynecologist",
      date: "Feb 15, 2024",
      time: "10:00 AM",
      status: "completed",
      type: "Online Consultation",
      rating: 5
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "Feb 10, 2024",
      time: "2:30 PM",
      status: "cancelled",
      type: "In-Person Visit",
      rating: null
    },
    {
      id: "3",
      doctor: "Dr. Sarah Johnson",
      specialty: "Surgeon ",
      date: "Feb 15, 2024",
      time: "10:00 AM",
      status: "cancelled",
      type: "In-Person Visit",
      rating: null
    },
    {
      id: "4",
      doctor: "Dr. Sarah Johnson",
      specialty: "Surgeon",
      date: "Feb 15, 2024",
      time: "10:00 AM",
      status: "completed",
      type: "In-Person Visit",  
      rating: 4.5
    },
    {
      id: "5",
      doctor: "Dr. Sarah Johnson",
      specialty: "Surgeon",
      date: "Feb 15, 2024",
      time: "10:00 AM",
      status: "completed",
      type: "In-Person Visit",
      rating: 4.5
    },
    {
      id: "6",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Feb 17, 2024",
      time: "10:00 AM",
      status: "completed",
      type: "In-Person Visit",
      rating: 4.5
    },
    {
      id: "7",
      doctor: "Dr. Sarah Johnson",
      specialty: "Neurologist",
      date: "Feb 18, 2024", 
      time: "10:00 AM",
      status: "cancelled",
      type: "Online Consultation",
      rating: 4.5
    },
  ]

  const itemsPerPage = 4
  const totalPages = Math.ceil(pastAppointments.length / itemsPerPage)
  const currentItems = pastAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 ">
      <Tabs defaultValue="upcoming">
        {/* Enhanced Header Section */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <Icons.medical className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">My Appointments</h1>
            </div>
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-[200px] grid-cols-2 rounded-full p-1">
                <TabsTrigger value="upcoming" className="rounded-full">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="rounded-full">Past</TabsTrigger>
              </TabsList>
              <Button size="sm" className="bg-primary rounded-full hover:bg-primary/90">
                <Icons.calendar className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Book New</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="container">
          <TabsContent value="upcoming" className="space-y-4">
            {/* Enhanced Appointment Card */}
            <Card className="overflow-hidden rounded-2xl border-2 border-primary/10 shadow-lg">
              {/* Status Bar */}
              <div className="bg-primary/10 px-4 py-3 border-b border-primary/10">
                <Badge variant="secondary" className="w-full justify-center md:w-auto rounded-full font-medium">
                  <Icons.clock className="mr-2 h-4 w-4 text-primary" />
                  Check-in opens in 15 mins
                </Badge>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-6">
                {/* Doctor Info */}
                <div className="flex gap-4">
                <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold tracking-tight">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Gynecologist</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Icons.star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(120+ reviews)</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-fit rounded-full border-2 bg-primary/5">
                    <Icons.video className="mr-2 h-4 w-4 text-primary" />
                    Online Consultation
                  </Badge>
                </div>

                {/* Appointment Details */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/40">
                  <div className="flex items-center gap-2 text-primary">
                    <Icons.calendar className="h-5 w-5" />
                    <p className="text-base font-semibold">Wed, March 20, 2024</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icons.clock className="h-4 w-4" />
                    <p className="text-sm">10:00 AM - 10:30 AM</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-500">
                    <Icons.medical className="h-4 w-4" />
                    <p className="text-sm font-medium">HPN: #12345678</p>
                  </div>
                </div>

                {/* Pre-Appointment Checklist */}
                <div className="space-y-3 rounded-xl border-2 border-primary/10 p-4">
                  <h4 className="text-sm font-bold tracking-tight flex items-center gap-2">
                    <Icons.clipboard className="h-4 w-4 text-primary" />
                    Pre-Appointment Checklist
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Health questionnaire completed</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10">
                      <Icons.alert className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Test video and audio</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 md:flex-row md:justify-end pt-2">
                  <Button 
                    variant="link"
                    size="lg" 
                    className="underline"
                    onClick={() => setIsRescheduleModalOpen(true)}
                  >
                    <Icons.calendar className="mr-2 h-4 w-4" />
                    Reschedule
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="rounded-full bg-red-50 hover:bg-red-100/90 text-red-600"
                  >
                    <Icons.cancel className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="rounded-full bg-blue-500/90 hover:bg-blue-600/90 text-white"
                    onClick={() => window.open("https://zoom.us/j/9189898989", "_blank")}
                  >
                    <Icons.video className="mr-2 h-4 w-4" />
                    Join Call
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {currentItems.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden rounded-2xl border shadow-sm">
                <div className={cn(
                  "px-4 py-3 border-b",
                  appointment.status === "completed" ? "bg-green-500/10 border-green-500/10" : "bg-red-500/10 border-red-500/10"
                )}>
                  <Badge 
                    variant= "secondary" 
                    className={cn(
                      "w-full justify-center md:w-auto rounded-full font-medium",
                      appointment.status === "completed" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    )}
                  >
                    {appointment.status === "completed" ? (
                      <>
                        <Icons.check className="mr-2 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Icons.cancel className="mr-2 h-4 w-4" />
                        Cancelled
                      </>
                    )}
                  </Badge>
                </div>

                <div className="p-6 space-y-6">
                  {/* Doctor Info */}
                  <div className="flex gap-4">
                    <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight">{appointment.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      {appointment.status === "completed" && appointment.rating && (
                        <div className="flex items-center gap-2 mt-2">
                          <Icons.star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{appointment.rating}.0</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="h-fit rounded-full border-2 bg-primary/5">
                      <Icons.medical className="mr-2 h-4 w-4 text-primary" />
                      {appointment.type}
                    </Badge>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/40">
                    <div className="flex items-center gap-2 text-primary">
                      <Icons.calendar className="h-5 w-5" />
                      <p className="text-base font-semibold">{appointment.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.clock className="h-4 w-4" />
                      <p className="text-sm">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={setCurrentPage}
                  variant="flat"
                  size="lg"
                  radius="full"
                  classNames={{
                    item: "rounded-full",
                    cursor: "bg-primary text-white"
                  }}
                />
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      <RescheduleDrawer
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        appointmentId="123"
        currentDate={new Date("2024-03-20")}
      />
    </div>
  )
}

