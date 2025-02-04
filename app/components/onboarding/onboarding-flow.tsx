"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProgressDots } from "./progress-dots"
import { OnboardingCard } from "./onboarding-card"
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus"
import { useRouter } from "next/navigation"
import { useRole } from '@/hooks/useRole'

const ONBOARDING_STEPS = [
  {
    title: "Welcome to TripWell!",
    description:
      "Planning your dream vacation shouldn't be a headache. TripWell simplifies the process by letting you manage all aspects of your trip - flights, hotels, and activities - in one convenient place",
    imageSrc:
      "/images/7191136_3568982.svg",
    imageAlt: "Beach waves illustration",
  },
  {
    title: "Effortless Trip Planning.",
    description:
      "Forget juggling multiple apps and websites. Our intuitive interface makes planning the perfect itinerary a breeze, so you can spend less time organizing and more time dreaming about your adventure",
    imageSrc:
      "/images/8354609_3877677.svg",
    imageAlt: "Map with location markers",
  },
  {
    title: "Never Miss a Beat",
    description:
      "Having everything at your fingertips gives you peace of mind. TripWell keeps your entire itinerary neatly organized, including flight confirmations, hotel bookings, and activity tickets.",
    imageSrc:
      "/images/cold.svg",
    imageAlt: "Hot air balloon over mountains",
  },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const { completeOnboarding } = useOnboardingStatus()
  const router = useRouter()
  const role = useRole()

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // On last step, complete onboarding and redirect
      completeOnboarding()
      router.replace(`/${role}/patient`)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    setCurrentStep(ONBOARDING_STEPS.length - 1)
  }

  const handleComplete = () => {
    // Add any additional onboarding completion logic here
    completeOnboarding()
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full h-screen max-w-6xl mx-auto relative overflow-hidden">
        <div
          className="h-full transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
          {ONBOARDING_STEPS.map((step, index) => (
            <div key={index} className="h-full w-full flex-shrink-0" aria-hidden={currentStep !== index}>
              <OnboardingCard
                title={step.title}
                description={step.description}
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
              >
                <div className="flex flex-col items-center gap-4">
                  <ProgressDots total={ONBOARDING_STEPS.length} current={currentStep} />
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button variant="ghost" className="text-gray-400 hover:text-gray-600" onClick={handlePrevious}>
                        Back
                      </Button>
                    )}
                    <Button className="w-full bg-[#3f8be2] hover:bg-[#306cb1] text-white" onClick={handleNext}>
                      {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started!" : "Continue"}
                    </Button>
                  </div>
                  {currentStep < ONBOARDING_STEPS.length - 1 && (
                    <Button variant="ghost" className="text-gray-400 hover:text-gray-600" onClick={handleSkip}>
                      Skip
                    </Button>
                  )}
                </div>
              </OnboardingCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

