"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "@/lib/format-currency";

type MonthlyData = {
  month: string;
  income: number;
  expense: number;
};

type MonthlyComparisonChartProps = {
  data: MonthlyData[];
};

export function MonthlyComparisonChart({
  data,
}: MonthlyComparisonChartProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Receitas x Despesas
        </h2>

        <p className="mt-1 text-sm text-muted">
          Comparativo dos últimos seis meses
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            accessibilityLayer={false}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              tickFormatter={(value: number) =>
                formatCurrency(value)
              }
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={90}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Receitas"
              fill="#16a34a"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />

            <Bar
              dataKey="expense"
              name="Despesas"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}