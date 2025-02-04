"use client"
import { MapPin, Search, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef } from "react"

interface HealthProvider {
  id: string
  name: string
  address: string
  distance: string
  type: string
}

const healthProviders: HealthProvider[] = [
  {
    id: "1",
    name: "Central Hospital",
    address: "123 Healthcare Ave",
    distance: "2.3 miles away",
    type: "Hospital",
  },
  {
    id: "2",
    name: "City Medical Center",
    address: "456 Medical Blvd",
    distance: "3.1 miles away",
    type: "Medical Center",
  },
  {
    id: "3",
    name: "Family Care Clinic",
    address: "789 Wellness St",
    distance: "1.5 miles away",
    type: "Clinic",
  },
  {
    id: "4",
    name: "Emergency Care Unit",
    address: "321 Emergency Rd",
    distance: "4.2 miles away",
    type: "Emergency Care",
  },
]

// Use the environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

interface MapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MapModal({ open, onOpenChange }: MapModalProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!open || !mapContainer.current || !mapboxgl.accessToken) return

    // Initialize map only once
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-97.7431, 30.2672],
        zoom: 13,
        attributionControl: false,
      })

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
          visualizePitch: false,
        }),
        "top-right",
      )

      // Get user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              essential: true,
            })

            // Add user marker
            new mapboxgl.Marker({
              color: "#FF0000",
              scale: 0.8,
            })
              .setLngLat([longitude, latitude])
              .addTo(map.current)

            // Add provider markers
            healthProviders.forEach((provider) => {
              const lat = latitude + (Math.random() - 0.5) * 0.02
              const lng = longitude + (Math.random() - 0.5) * 0.02

              const popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                maxWidth: "300px",
              }).setHTML(`
                <div class="p-3">
                  <div class="font-semibold text-base mb-1">${provider.name}</div>
                  <div class="text-sm opacity-75">${provider.address}</div>
                  <div class="text-sm opacity-75 mt-1">${provider.type} • ${provider.distance}</div>
                </div>
              `)

              new mapboxgl.Marker({
                color: "#4285F4",
                scale: 0.8,
              })
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(map.current!)
            })
          }
        },
        () => {
          console.log("Using default location")
        },
      )
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] h-[85vh] flex flex-col p-0 gap-0 rounded-lg overflow-hidden">
        <div className="relative flex-1 min-h-[60vh]">
          <div
            ref={mapContainer}
            className="absolute inset-0 [&_.mapboxgl-ctrl-top-right]:top-20 [&_.mapboxgl-ctrl-top-right]:right-4 [&_.mapboxgl-ctrl]:shadow-md [&_.mapboxgl-ctrl-group]:rounded-lg"
          />
          <div className="absolute inset-x-0 top-0 z-10 bg-background/90 backdrop-blur-md shadow-sm">
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => onOpenChange(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">Select Healthcare Provider</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for healthcare providers"
                  className="pl-9 bg-background shadow-none border-muted"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-background/90 p-2.5 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              <span>Current Location</span>
            </div>
          </div>
        </div>

        <div className="bg-background flex-1 rounded-t-xl relative z-20 shadow-[0_-1px_2px_rgba(0,0,0,0.1)]">
          <div className="p-1 flex justify-center">
            <div className="w-10 h-1 rounded-full bg-muted" />
          </div>
          <ScrollArea className="h-[calc(25vh+1rem)] px-4 pb-4">
            <div className="grid gap-2">
              {healthProviders.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  className="h-auto w-full justify-start p-4 hover:bg-muted/50"
                >
                  <div className="grid gap-1">
                    <div className="font-semibold">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">{provider.address}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{provider.type}</span>
                      <span>•</span>
                      <span>{provider.distance}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

