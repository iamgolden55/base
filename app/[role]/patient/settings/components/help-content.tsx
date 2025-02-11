'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function HelpContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input placeholder="Subject" />
            <Textarea placeholder="Describe your issue..." />
            <Button onClick={() => toast.success('Support ticket submitted')}>
              Submit Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">How do I reset my password?</h4>
              <p className="text-sm text-muted-foreground">
                You can reset your password by going to the Security tab and clicking on "Change Password".
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">How do I update my profile?</h4>
              <p className="text-sm text-muted-foreground">
                You can update your profile information in the Profile tab.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 