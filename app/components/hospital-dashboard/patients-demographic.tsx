"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", outpatient: 186, inpatient: 80, emergency: 45 },
  { month: "February", outpatient: 305, inpatient: 200, emergency: 90 },
  { month: "March", outpatient: 237, inpatient: 120, emergency: 70 },
  { month: "April", outpatient: 73, inpatient: 190, emergency: 85 },
  { month: "May", outpatient: 209, inpatient: 130, emergency: 60 },
  { month: "June", outpatient: 214, inpatient: 140, emergency: 75 },
]

const chartConfig = {
  outpatient: {
    label: "Outpatient",
    color: "hsl(var(--chart-1))",
  },
  inpatient: {
    label: "Inpatient",
    color: "hsl(var(--chart-2))",
  },
  emergency: {
    label: "Emergency",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface PatientsDemographicProps {
  height?: number;
}

export function Component({ height = 300 }: PatientsDemographicProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Demographics</CardTitle>
        <CardDescription>Distribution of patient visits by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="outpatient" fill="var(--color-outpatient)" radius={4} />
            <Bar dataKey="inpatient" fill="var(--color-inpatient)" radius={4} />
            <Bar dataKey="emergency" fill="var(--color-emergency)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Patient visits increased by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing patient visit distribution across departments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default Component;