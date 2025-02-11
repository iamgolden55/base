'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function BillingContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 04/24</p>
            </div>
            <Button variant="outline" onClick={() => toast.success('Card removed')}>
              Remove
            </Button>
          </div>
          <Button onClick={() => toast.success('New card added')}>
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Premium Plan</p>
                <p className="text-sm text-muted-foreground">April 2024</p>
              </div>
              <p className="font-medium">$29.99</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Premium Plan</p>
                <p className="text-sm text-muted-foreground">March 2024</p>
              </div>
              <p className="font-medium">$29.99</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 