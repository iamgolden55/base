// app/[role]/patient/page.tsx

"use client"

import { motion } from "framer-motion"
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus"
import { Spinner, Alert, Button } from "@nextui-org/react"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Play } from "lucide-react"
import HpnCard from "@/app/components/patients-dashboard/hpn-card"
import TicketSelector from "@/app/[role]/patient/ticket-selector"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRole } from "@/hooks/useRole"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN_KEY } from "@/lib/constants"
import { logout } from '@/lib/utils';



export default function DashboardPage() {
  const { hasCompletedOnboarding, isLoading } = useOnboardingStatus();
  const router = useRouter();
  const userData = useRole();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      router.replace('/auth/login');
      return;
    }

    if (!isLoading && !hasCompletedOnboarding) {
      router.replace('/role/patient/onboarding');
      return;
    }
  }, [hasCompletedOnboarding, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>;
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  // Dashboard content
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.10 }}
      className="flex flex-col gap-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center w-full"
      >
        <Alert
          color="warning"
          description={`Hello ${userData?.basic_info?.full_name}, Please note you are not registered as a patient yet. Please contact your GP to register.`}
          endContent={
            <Button color="warning" size="sm" variant="flat">
              Upgrade
            </Button>
          }
          
          variant="faded"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <HpnCard />
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid auto-rows-min gap-4 md:grid-cols-3"
      >
        <Card className="first-letter:w-full bg-white dark:bg-gray-100 shadow-[0_3px_5px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-200 rounded-3xl overflow-hidden dark:border-gray-100 relative">
          <CardContent>
            <TicketSelector />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 relative overflow-hidden h-[400px] group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardContent className="p-0 h-full">
            {/* Rest of your card content */}
            <div className="relative h-[400px]">
              <Image
                src="/images/daniel-schludi-mAGZNECMcUg-unsplash.jpg"
                alt="Expert Health Consultations"
                width={1200}
                height={675}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-8 flex flex-col justify-end">
                {/* Video consultation content */}
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Video className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-white/80 text-xs md:text-sm">Consult top doctors anytime, from any location.</span>
                </div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                  Expert Health Consultations<br className="hidden md:block" />
                  Anytime, Anywhere
                </h1>
                <p className="text-white/80 text-xs md:text-sm mb-4 md:mb-6 max-w-xl">
                  Access top-tier health consultations from the comfort of your home or on the go. Our platform connects you with experienced medical professionals around the clock
                </p>
                <Button 
                  className="w-fit bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full px-4 md:px-6 py-2 backdrop-blur-sm"
                  size="sm"
                >
                  <Play className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  <span className="text-sm">Start Video</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
