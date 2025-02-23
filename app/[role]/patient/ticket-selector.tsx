'use client'

import { useState } from "react"
import { ChevronUp, Timer, Users } from 'lucide-react'
import { Drawer } from "vaul"
import { Button } from '@/components/ui/button'
import { TicketDetail } from '@/app/components/patients-dashboard/ticket-detail'
import Link from 'next/link'
import Image from 'next/image'

interface TicketOption {
  id: string
  type: string
  name: string
  price: number
  time: string
  capacity: number
  description?: string
  isPopular?: boolean
  from: string
  to: string
  fromCity: string
  toCity: string
  departureTime: string
  arrivalTime: string
  date: string
  fromTerminal: string
  fromGate: string
  toTerminal: string
  toGate: string
  flightNumber: string
}

const ticketOptions: TicketOption[] = [
  {
    id: 'standard',
    type: 'economy',
    name: 'Standard',
    price: 49.99,
    time: '10:30 AM',
    capacity: 1,
    isPopular: true,
    from: 'LHR',
    to: 'ABI',
    fromCity: 'London',
    toCity: 'New York',
    departureTime: '10:15 AM',
    arrivalTime: '1:05 PM',
    date: 'Fri. 25 Sep',
    fromTerminal: '6',
    fromGate: 'B47',
    toTerminal: '5',
    toGate: 'B4',
    flightNumber: 'AR715'
  },
  {
    id: 'premium',
    type: 'economy',
    name: 'Premium',
    price: 79.99,
    time: '11:00 AM',
    capacity: 2,
    from: 'LHR',
    to: 'JFK',
    fromCity: 'London',
    toCity: 'New York',
    departureTime: '11:15 AM',
    arrivalTime: '2:05 PM',
    date: 'Fri. 25 Sep',
    fromTerminal: '5',
    fromGate: 'A47',
    toTerminal: '4',
    toGate: 'A4',
    flightNumber: 'AR716'
  },
  {
    id: 'vip',
    type: 'economy',
    name: 'VIP Experience',
    price: 149.99,
    time: '11:30 AM',
    capacity: 4,
    description: 'Exclusive access',
    from: 'LHR',
    to: 'LAX',
    fromCity: 'London',
    toCity: 'Los Angeles',
    departureTime: '11:45 AM',
    arrivalTime: '3:05 PM',
    date: 'Fri. 25 Sep',
    fromTerminal: '4',
    fromGate: 'C47',
    toTerminal: '3',
    toGate: 'C4',
    flightNumber: 'AR717'
  }
]

export default function TicketSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [showTicketDetail, setShowTicketDetail] = useState(false)

  const selectedTicketData = ticketOptions.find(t => t.id === selectedTicket)

  return (
    <div className="w-full">
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger asChild>
          <div className="w-full cursor-pointer">
            <div className="aspect-video w-full bg-muted rounded-lg mb-4">
              <Image 
                src="/images/11050878_4626033.svg"
                alt="Gift concept illustration" 
                width={350}
                height={350}
                className="w-full h-full object-cover rounded-lg"
                style={{ objectPosition: '0 -32px' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Share the Gift of Health 🎉</h4>
                <p  className="text-5l font-light tracking-tight">
                Give your loved ones the ultimate care package with a PHB Health Card. Perfect for friends and family, this thoughtful gift ensures access to essential healthcare services. Choose from three flexible options and show them you care in the best way possible.
              <Link href="#" className="text-blue-500 ml-1">read guidelines</Link>
            </p>
              </div>
              <ChevronUp className="text-muted-foreground" />
            </div>
          </div>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 bg-background flex flex-col rounded-t-[20px]">
            <div className="p-4 bg-background rounded-t-[20px]">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
              <h2 className="text-xl font-bold mb-4">Choose a ticket</h2>
              
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {ticketOptions.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer
                      ${selectedTicket === ticket.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }`}
                    onClick={() => {
                      setSelectedTicket(ticket.id)
                      setShowTicketDetail(true)
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.name}</h3>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            {ticket.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {ticket.capacity}
                          </div>
                        </div>
                      </div>
                      <span className="text-xl font-bold">£{ticket.price}</span>
                    </div>
                    {ticket.description && (
                      <p className="text-sm text-muted-foreground">{ticket.description}</p>
                    )}
                    {ticket.isPopular && (
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mt-2">
                        Popular
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!selectedTicket}
                >
                  Continue with {selectedTicket ? ticketOptions.find(t => t.id === selectedTicket)?.name : 'selection'}
                </Button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {selectedTicketData && (
        <TicketDetail
          isOpen={showTicketDetail}
          onClose={() => setShowTicketDetail(false)}
          ticket={selectedTicketData}
        />
      )}
    </div>
  )
}
