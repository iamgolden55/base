'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your security preferences and two-factor authentication.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="2fa">Enable two-factor authentication</Label>
            <Switch id="2fa" onCheckedChange={(checked) => {
              toast.success(checked ? '2FA Enabled' : '2FA Disabled')
            }} />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Recovery Codes</h4>
            <Button 
              variant="outline"
              onClick={() => toast.success('Recovery codes generated')}
            >
              Generate New Recovery Codes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm">
              <p className="font-medium">Last login</p>
              <p className="text-muted-foreground">Today at 2:34 PM</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Last password change</p>
              <p className="text-muted-foreground">30 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 