import { Card, CardBody } from "@heroui/react";
import { useRole } from '@/hooks/useRole';
import { Button } from "@/components/ui/button";
import { Plus, Clock, AlertCircle, Thermometer, Activity } from "lucide-react";
import { Code } from "@heroui/react";
import { Drawer } from "vaul";
import { useState } from "react";

const Infograph = () => {
  const userData = useRole();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Handle form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setOpen(false);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" variant="secondary">
              <Plus/>
              <b>Report an Issue</b>
            </Button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 bg-background flex flex-col rounded-t-[20px]">
              <div className="p-4 bg-background rounded-t-[20px]">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
                
                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-2 mb-6">
                    <AlertCircle className="h-6 w-6 text-orange-300" />
                    <h2 className="text-xl font-bold">Report a Medical Issue</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto">
                    <div className="p-3 rounded-xl border-2 border-border">
                      <label className="block text-sm font-medium mb-2">
                        What symptoms are you experiencing?
                      </label>
                      <textarea
                        className="w-full p-2 bg-background rounded-md min-h-[100px] focus:outline-none"
                        placeholder="Describe your symptoms..."
                        required
                      />
                    </div>

                    <div className="p-4 rounded-xl border-2 border-border transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <label className="font-medium">
                          Duration of Symptoms
                        </label>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="e.g., 2 days, 1 week"
                        required
                      />
                    </div>

                    <div className="p-4 rounded-xl border-2 border-border transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="h-4 w-4 text-primary" />
                        <label className="font-medium">
                          Pain Level
                        </label>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                          required
                        />
                        <span className="text-sm text-muted-foreground w-12 text-center">
                          1-10
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 border-t pt-6">
                      <Button 
                        type="submit"
                        className="w-full bg-blue-500 text-white hover:bg-blue-600"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                            Submitting...
                          </span>
                        ) : (
                          'Submit Report'
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      
      <Card>
        <CardBody>
          <Code color="warning">Safety Notice ‼️</Code>
          <p className="text-5l font-light tracking-tight">
            Remember your health is our priority. For any issues or concerns, please reach out to our support team for assistance.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Infograph;