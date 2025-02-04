"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  { month: "January", malaria: 186, typhoid: 80, tuberculosis: 120, dengue: 95 },
  { month: "February", malaria: 305, typhoid: 200, tuberculosis: 250, dengue: 180 },
  { month: "March", malaria: 237, typhoid: 120, tuberculosis: 180, dengue: 150 },
  { month: "April", malaria: 73, typhoid: 190, tuberculosis: 160, dengue: 120 },
  { month: "May", malaria: 209, typhoid: 130, tuberculosis: 200, dengue: 170 },
  { month: "June", malaria: 214, typhoid: 140, tuberculosis: 190, dengue: 160 },
]

const chartConfig = {
  malaria: {
    label: "Malaria",
    color: "hsl(var(--chart-1))",
  },
  typhoid: {
    label: "Typhoid",
    color: "hsl(var(--chart-2))",
  },
  tuberculosis: {
    label: "Tuberculosis",
    color: "hsl(var(--chart-3))",
  },
  dengue: {
    label: "Dengue",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Conditions</CardTitle>
        <CardDescription>Distribution of medical conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="malaria"
              type="monotone"
              stroke="var(--color-malaria)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="typhoid"
              type="monotone"
              stroke="var(--color-typhoid)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="tuberculosis"
              type="monotone"
              stroke="var(--color-tuberculosis)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="dengue"
              type="monotone"
              stroke="var(--color-dengue)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing disease trends for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Component;