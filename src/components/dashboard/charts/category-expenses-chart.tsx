"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatCurrency } from "@/lib/format-currency";

type CategoryExpense = {
  category: string;
  amount: number;
};

type CategoryExpensesChartProps = {
  data: CategoryExpense[];
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

export function CategoryExpensesChart({
  data,
}: CategoryExpensesChartProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Despesas por categoria
        </h2>

        <p className="mt-1 text-sm text-muted">
          Distribuição dos gastos no período selecionado
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-muted">
          Nenhuma despesa registrada neste período.
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={115}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(Number(value))
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}