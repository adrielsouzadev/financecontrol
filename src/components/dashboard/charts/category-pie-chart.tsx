"use client";

import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  type PieSectorShapeProps,
} from "recharts";

import { formatCurrency } from "@/lib/format-currency";

type CategoryAmount = {
  category: string;
  amount: number;
};

type CategoryPieChartProps = {
  title: string;
  description: string;
  emptyMessage: string;
  data: CategoryAmount[];
};

const COLORS = [
  "#16a34a",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#64748b",
];

function CategorySector(props: PieSectorShapeProps) {
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="none"
    />
  );
}

export function CategoryPieChart({
  title,
  description,
  emptyMessage,
  data,
}: CategoryPieChartProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-muted">
          {emptyMessage}
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer={false}>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={115}
                paddingAngle={0}
                shape={CategorySector}
              />

              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}