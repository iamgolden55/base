'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRole } from "@/hooks/useRole"
export function AccountContent() {
       const userData = useRole()
       
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
              <Button 
                variant="destructive" 
                onClick={() => toast.error('This action cannot be undone')}
              >
                Delete Account
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-muted-foreground">
                Download a copy of your data.
              </p>
              <Button 
                variant="outline"
                onClick={() => toast.success('Data export started')}
              >
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 