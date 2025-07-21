import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { Separator } from "../../../components/ui/separator";
import type { StatDetails } from "../types";
const chartConfig = {
  c: {
    label: "C",
  },
  cpp: {
    label: "C++",
  },
  csharp: {
    label: "C#",
  },
  javascript: {
    label: "JavaScript",
  },
  typescript: {
    label: "TypeScript",
  },
  python: {
    label: "Python",
  },
  java: {
    label: "Java",
  },
  go: {
    label: "Go",
  },
  rust: {
    label: "Rust",
  },
  php: {
    label: "PHP",
  },
  html: {
    label: "HTML",
  },
  css: {
    label: "CSS",
  },
  json: {
    label: "JSON",
  },
  markdown: {
    label: "Markdown",
  },
  sql: {
    label: "SQL",
  },
  tsx: {
    label: "TSX",
  },
  jsx: {
    label: "JSX",
  },
} satisfies ChartConfig;

export const LanguageStatsCard = ({ langs }: { langs: StatDetails[] }) => {
  return (
    <Card className="flex flex-col gap-2 max-w-sm">
      <CardHeader className="items-center">
        <CardTitle>Languages</CardTitle>
        <CardDescription>Your most used languages</CardDescription>
        <Separator orientation="horizontal" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={langs.filter((l) => l.count > 0)}
              dataKey="count"
              nameKey="name"
              innerRadius={40}
              label={({ name }) =>
                chartConfig[name as keyof typeof chartConfig]?.label || name
              }
            >
              {langs.map((lang, index) => (
                <Cell
                  key={`cell-${lang.name}`}
                  fill={`var(--chart-${index + 1})`}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <Separator orientation="horizontal" />
      </CardContent>
      <CardFooter className="flex flex-col text-sm">
        <div className="text-sm text-muted-foreground mx-auto">
          Your most used language is{" "}
          <span className="text-chart-1 font-medium text-sm">
            {chartConfig[langs[0].name as keyof typeof chartConfig]?.label}
          </span>{" "}
          with{" "}
          <span className="font-medium text-foreground text-sm">
            {langs[0].count}
          </span>{" "}
          snippets.
        </div>
      </CardFooter>
    </Card>
  );
};
