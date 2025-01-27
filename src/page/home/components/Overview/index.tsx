import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { format } from "date-fns";
import { es } from 'date-fns/locale'

interface Props {
  lastFiveBoxes : Box[]
}

export default function Overview({lastFiveBoxes} : Props) {
  
  const chartData = lastFiveBoxes.map(d => {
    return {
      month:format(d.opening, 'EEEE', { locale: es }),
      desktop: d.final_balance
    }
  })

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
