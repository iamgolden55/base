"use client"

import { useState } from "react"
import { Drawer } from "vaul"
import { Calendar, Button, ButtonGroup, Radio, RadioGroup } from "@heroui/react"
import { Icons } from "@/app/components/ui/icons"
import { Spinner } from "@nextui-org/react"
import { today, getLocalTimeZone, startOfWeek, startOfMonth } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"
import { cn } from "@/lib/utils"

interface RescheduleDrawerProps {
  isOpen: boolean
  onClose: () => void
  appointmentId: string
  currentDate: Date
}

export function RescheduleDrawer({ isOpen, onClose, appointmentId, currentDate }: RescheduleDrawerProps) {
  const defaultDate = today(getLocalTimeZone())
  const [selectedDate, setSelectedDate] = useState(defaultDate)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { locale } = useLocale()

  const now = today(getLocalTimeZone())
  const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale)
  const nextMonth = startOfMonth(now.add({ months: 1 }))

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ]

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return
    
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      onClose()
    } catch (error) {
      console.error("Failed to reschedule:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 bg-background flex flex-col rounded-t-[20px]">
          <div className="p-4 bg-background rounded-t-[20px]">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
            
            <div className="space-y-3 max-w-[500px] mx-auto w-full">
              <Calendar
                aria-label="Appointment Date"
                className="w-full"
                classNames={{
                  content: "w-full",
                  grid: "w-full grid-cols-7 gap-0",
                  gridWrapper: "w-full",
                  headerWrapper: "w-full",
                  cell: cn(
                    "aspect-square w-full flex items-center justify-center",
                    "aria-selected:bg-green-500/30 aria-selected:text-green-600 aria-selected:font-medium rounded-full",
                    "is-today:bg-green-700/5 is-today:text-green-700 is-today:font-medium",
                    "[&:has(>button[aria-selected])]:bg-green-500/10",
                    "[&>button[aria-selected]]:text-green-700 [&>button[aria-selected]]:font-semibold"
                  ),
                  gridHeader: "w-full grid grid-cols",
                  gridHeaderCell: "w-full h-5 flex items-center justify-center text-muted-foreground",
                  gridHeaderRow: "w-full"
                }}
                focusedValue={selectedDate}
                value={selectedDate}
                onChange={setSelectedDate}
                onFocusChange={setSelectedDate}
                topContent={
                  <ButtonGroup
                    className="w-full p-2 gap-2"
                  >
                    <Button 
                      variant="solid" 
                      className="flex-1"
                      onClick={() => setSelectedDate(now)}
                    >
                      Today
                    </Button>
                    <Button 
                      variant="flat"
                      className="flex-1"
                      onClick={() => setSelectedDate(nextWeek)}
                    >
                      Next week
                    </Button>
                    <Button 
                      variant="solid"
                      className="flex-1"
                      onClick={() => setSelectedDate(nextMonth)}
                    >
                      Next month
                    </Button>
                  </ButtonGroup>
                }
                isDateUnavailable={(date) => {
                  const currentDate = today(getLocalTimeZone());
                  return (
                    date.compare(currentDate) < 0 || // Past dates (including today)
                    date.toDate().getDay() === 0 || // Sunday
                    date.toDate().getDay() === 6    // Saturday
                  );
                }}
              />

              {selectedDate && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Icons.clock className="h-4 w-4" />
                    Available Time Slots
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "solid" : "flat"}
                        className={cn(
                          "w-full",
                          selectedTime === time && "bg-green-500/30 text-green-800 border-green-700"
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  variant="flat"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReschedule}
                  disabled={!selectedDate || !selectedTime || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2 text-blue-500" />
                      Rescheduling...
                    </>
                  ) : (
                    <>
                      <Icons.calendarClock className="mr-2 h-4 w-4" />
                      Confirm Reschedule
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
} 