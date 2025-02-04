"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "January", recovered: 186, ongoing: 80, critical: 45 },
  { month: "February", recovered: 305, ongoing: 200, critical: 90 },
  { month: "March", recovered: 237, ongoing: 120, critical: 70 },
  { month: "April", recovered: 73, ongoing: 190, critical: 85 },
  { month: "May", recovered: 209, ongoing: 130, critical: 60 },
  { month: "June", recovered: 214, ongoing: 140, critical: 75 },
]

const chartConfig = {
  recovered: {
    label: "Recovered Patients",
    color: "hsl(var(--chart-1))",
  },
  ongoing: {
    label: "Ongoing Treatment",
    color: "hsl(var(--chart-2))",
  },
  critical: {
    label: "Critical Care",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Outcomes</CardTitle>
        <CardDescription>
          Patient recovery and treatment status trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="recovered"
              type="linear"
              fill="var(--color-recovered)"
              fillOpacity={0.4}
              stroke="var(--color-recovered)"
            />
            <Area
              dataKey="ongoing"
              type="linear"
              fill="var(--color-ongoing)"
              fillOpacity={0.4}
              stroke="var(--color-ongoing)"
            />
            <Area
              dataKey="critical"
              type="linear"
              fill="var(--color-critical)"
              fillOpacity={0.4}
              stroke="var(--color-critical)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Recovery rate increased by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing patient outcomes from January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Component