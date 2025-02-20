import { Card, CardBody } from "@heroui/react";
import { useRole } from '@/hooks/useRole';
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { Code } from "@heroui/react";

const Infograph = () => {
  const userData = useRole();

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button className="bg-blue-500 text-white" variant="shadow"><Plus />
          <b>Report an Issue</b>
        </Button>  
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