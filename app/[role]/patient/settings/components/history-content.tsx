'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HistoryContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Profile updated', date: 'Today at 2:34 PM' },
              { action: 'Password changed', date: '2 days ago' },
              { action: 'Login from new device', date: '3 days ago' },
              { action: 'Notification settings updated', date: '1 week ago' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 