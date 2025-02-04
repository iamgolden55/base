"use client"

import { useState, useEffect, useId } from "react"
import { format } from "date-fns"
import { Alert, Button } from "@nextui-org/react"
import { MapModal } from "./components/map-modal"

export default function Appointments() {
  const id = useId()
  const today = new Date()
  const [month, setMonth] = useState(today)
  const [date, setDate] = useState<Date | undefined>(today)
  const [inputValue, setInputValue] = useState("")
  const [showMap, setShowMap] = useState(false)

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("")
      setDate(undefined)
    } else {
      setDate(date)
      setMonth(date)
      setInputValue(format(date, "yyyy-MM-dd"))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value) {
      const parsedDate = new Date(value)
      setDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setDate(undefined)
    }
  }

  useEffect(() => {
    setInputValue(format(today, "yyyy-MM-dd"))
  }, [today]) // Added today to dependencies

  return (
    <>
      <div className="flex-1 flex flex-col w-full">
        <div className="border-b p-4 flex items-center justify-between">
          <Alert
            color="warning"
            description="You have not been registered with any Health Provider yet."
            endContent={
              <Button color="warning" size="sm" variant="flat" onPress={() => setShowMap(true)}>
                Register
              </Button>
            }
            title="Register with a Health Provider"
            variant="faded"
          />
        </div>

        {/* Rest of your existing component code */}

        <MapModal open={showMap} onOpenChange={setShowMap} />
      </div>
    </>
  )
}

