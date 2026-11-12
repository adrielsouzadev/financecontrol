import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import { SummaryCard } from "@/components/dashboard/summary-card";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
} from "lucide-react";

type DashboardSummaryProps = {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
};

export async function DashboardSummary({
  searchParams,
}: DashboardSummaryProps) {
  const params = await searchParams;

  await connection();

  const currentDate = new Date();

  const month = Number(
    params.month ?? currentDate.getMonth() + 1
  );

  const year = Number(
    params.year ?? currentDate.getFullYear()
  );

  const startOfMonth = new Date(year, month - 1, 1);
  const startOfNextMonth = new Date(year, month, 1);

  const [totals, monthlyTotals] = await Promise.all([
    prisma.transaction.groupBy({
      by: ["type"],
      _sum: {
        amount: true,
      },
    }),

    prisma.transaction.groupBy({
      by: ["type"],
      where: {
        date: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  const totalIncome = Number(
    totals.find((item) => item.type === "INCOME")?._sum.amount ?? 0
  );

  const totalExpense = Number(
    totals.find((item) => item.type === "EXPENSE")?._sum.amount ?? 0
  );

  const monthlyIncome = Number(
    monthlyTotals.find((item) => item.type === "INCOME")?._sum.amount ?? 0
  );

  const monthlyExpense = Number(
    monthlyTotals.find((item) => item.type === "EXPENSE")?._sum.amount ?? 0
  );

  const balance = totalIncome - totalExpense;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Saldo total"
        value={balance}
        description="Seu saldo atual"
        icon={Wallet}
      />

      <SummaryCard
        title="Receitas do mês"
        value={monthlyIncome}
        description="Total recebido neste mês"
        icon={ArrowUpCircle}
        variant="positive"
      />

      <SummaryCard
        title="Despesas do mês"
        value={monthlyExpense}
        description="Total gasto neste mês"
        icon={ArrowDownCircle}
        variant="negative"
      />
    </section>
  );
}