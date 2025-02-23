import { CardContent } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import { Card, Link } from "@nextui-org/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Info } from "lucide-react";
import { GraduationCap } from "lucide-react";
import Image from "next/image"
import TicketSelector from "@/app/[role]/patient/ticket-selector";
import { useRole } from '@/hooks/useRole';
import { toast } from 'sonner';
import { Copy } from 'lucide-react'

const HpnCard = () => {
  const userData = useRole();

  return (
    <Card className="w-full bg-white dark:bg-gray-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-200 rounded-3xl overflow-hidden dark:border-gray-100 relative">
      {/* Desktop-only decorative SVG */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden md:block">
        <Image
          src="/images/151932061_10553586.jpg"
          alt="Decorative SVG"
          width={350}
          height={350}
          className="opacity-100"
        />
      </div>

      <CardContent className="p-6 relative z-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Health Summary</h2>
        <div className="grid gap-6">
        <h2 className="text-3xl font-semibold">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
          {userData?.basic_info?.full_name}.
          </span>
        </h2>
          
          {/* HPN Section with Tooltip */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="h-5 w-5 text-blue-500" />
              <span className="text-5l font-light tracking-tight">
                Health Point Number (HPN)
              </span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Info className="h-3 w-3 text-gray-500" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/95 backdrop-blur border-gray-100">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">About Your HPN</h4>
                    <p className="text-sm text-gray-600">
                      Your Health Point Number (HPN) is a unique identifier that:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Securely links all your medical records</li>
                      <li>• Enables quick access by healthcare providers</li>
                      <li>• Ensures accurate patient identification</li>
                      <li>• Facilitates seamless care coordination</li>
                    </ul>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Share this number with healthcare providers to access your complete medical history.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
              {userData?.basic_info?.hpn || 'Loading...'}
              </div>
              <button 
                className="text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-all duration-200 ease-in-out"
                onClick={async (e) => {
                  e.preventDefault()
                  try {
                    if (navigator.clipboard && userData?.basic_info?.hpn) {
                      await navigator.clipboard.writeText(userData.basic_info.hpn)
                      toast.success('HPN copied to clipboard ✅', {
                        duration: 1500,
                        position: 'bottom-right'
                      })
                    } else {
                      const textArea = document.createElement('textarea')
                      textArea.value = userData?.basic_info?.hpn || ''
                      textArea.style.position = 'fixed'
                      textArea.style.opacity = '0'
                      document.body.appendChild(textArea)
                      textArea.select()
                      try {
                        document.execCommand('copy')
                        toast.success('HPN copied to clipboard ✅', {
                          duration: 1500,
                          position: 'bottom-right'
                        })
                      } catch (err) {
                        toast.error('Failed to copy HPN ❌')
                      }
                      document.body.removeChild(textArea)
                    }
                  } catch (error) {
                    toast.error('Failed to copy HPN ❌')
                    console.error('Copy failed:', error)
                  }
                }}
                aria-label="Copy HPN to clipboard"
              >
                <Copy className="h-4 w-4 transform transition-transform duration-200 ease-in-out hover:scale-110" />
              </button>
            </div>
            <p className="text-5l font-light tracking-tight">
              Provide this number to your health care provider to access all your medical records. 
              <Link href="#" className="text-blue-500 ml-1">read guidelines</Link>
            </p>
          </div>

          {/* Status Section */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-500 font-medium">Profile Status</span>
            </div>
            <div className="flex items-center gap-3">
              {(() => {
                // ... (rest of the age calculation and category logic remains the same)
                const calculateAge = (dob: string): number => {
                  const birthDate = new Date(dob);
                  const today = new Date();
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const month = today.getMonth() - birthDate.getMonth();
                  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                  }
                  return age;
                };

                const age = calculateAge(userData?.basic_info?.date_of_birth || '');
                
                type AgeCategory = {
                  range: string;
                  bgClass: string;
                  textClass: string;
                };
                
                const getAgeCategory = (age: number): AgeCategory => {
                  if (age <= 1) return { range: "Newborn/Infant", bgClass: "bg-blue-50", textClass: "text-blue-700" };
                  if (age <= 4) return { range: "Toddler", bgClass: "bg-green-50", textClass: "text-green-700" };
                  if (age <= 8) return { range: "Young Child", bgClass: "bg-yellow-50", textClass: "text-yellow-700" };
                  if (age <= 12) return { range: "Pre-teen", bgClass: "bg-orange-50", textClass: "text-orange-700" };
                  if (age <= 17) return { range: "Teenager", bgClass: "bg-red-50", textClass: "text-red-700" };
                  if (age <= 24) return { range: "Young Adult", bgClass: "bg-purple-50", textClass: "text-purple-700" };
                  if (age <= 34) return { range: "Early Adulthood", bgClass: "bg-indigo-50", textClass: "text-indigo-700" };
                  if (age <= 44) return { range: "Mid Adulthood", bgClass: "bg-pink-50", textClass: "text-pink-700" };
                  if (age <= 54) return { range: "Early Middle Age", bgClass: "bg-cyan-50", textClass: "text-cyan-700" };
                  if (age <= 64) return { range: "Late Middle Age", bgClass: "bg-teal-50", textClass: "text-teal-700" };
                  if (age <= 74) return { range: "Young Senior", bgClass: "bg-emerald-50", textClass: "text-emerald-700" };
                  if (age <= 84) return { range: "Middle Senior", bgClass: "bg-amber-50", textClass: "text-amber-700" };
                  return { range: "Super Senior", bgClass: "bg-rose-50", textClass: "text-rose-700" };
                };

                const category = getAgeCategory(age);

                return (
                  <>
                    <span className="font-mono text-200 font-bold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                      {category.range}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.bgClass} ${category.textClass}`}>
                      Age {age}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <span>Next checkup: 3 months</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HpnCard
