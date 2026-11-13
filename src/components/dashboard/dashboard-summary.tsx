import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { MonthlyComparisonChart } from "@/components/dashboard/charts/monthly-comparison-chart";
import { CategoryPieChart } from "@/components/dashboard/charts/category-pie-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

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

  const parsedMonth = Number(params.month);
  const parsedYear = Number(params.year);

  const month =
    Number.isInteger(parsedMonth) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12
      ? parsedMonth
      : currentDate.getUTCMonth() + 1;

  const year =
    Number.isInteger(parsedYear) &&
    parsedYear >= 1900 &&
    parsedYear <= 2100
      ? parsedYear
      : currentDate.getUTCFullYear();

  const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const startOfNextMonth = new Date(Date.UTC(year, month, 1));
  const startOfSixMonths = new Date(Date.UTC(year, month - 5, 1));

  const [
    totals,
    monthlyTotals,
    sixMonthsTransactions,
    categoryExpenses,
    categoryIncomes,
    recentTransactions,
  ] = await Promise.all([
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

    prisma.transaction.findMany({
      where: {
        date: {
          gte: startOfSixMonths,
          lt: startOfNextMonth,
        },
      },
      select: {
        date: true,
        type: true,
        amount: true,
      },
      orderBy: {
        date: "asc",
      },
    }),

    prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        type: "INCOME",
        date: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.transaction.findMany({
      take: 5,
      orderBy: [
        {
          date: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        date: true,
        category: {
          select: {
            name: true,
          },
        },
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

  const monthlyChartData = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date(Date.UTC(year, month - 5 + index, 1));

      const monthTransactions = sixMonthsTransactions.filter(
        (transaction) =>
          transaction.date.getUTCMonth() === date.getUTCMonth() &&
          transaction.date.getUTCFullYear() === date.getUTCFullYear()
      );

      const income = monthTransactions
        .filter((transaction) => transaction.type === "INCOME")
        .reduce(
          (total, transaction) => total + Number(transaction.amount),
          0
        );

      const expense = monthTransactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .reduce(
          (total, transaction) => total + Number(transaction.amount),
          0
        );

      return {
        month: new Intl.DateTimeFormat("pt-BR", {
          month: "short",
          timeZone: "UTC",
        })
          .format(date)
          .replace(".", ""),
        income,
        expense,
      };
    }
  );

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categoryNames = new Map<string, string>(
    categories.map((category) => [category.id, category.name])
  );

  function toCategoryChartData(
    items: {
      categoryId: string;
      _sum: { amount: unknown } | null;
    }[],
    fallbackName: string
  ) {
    return items
      .map((item) => ({
        category: categoryNames.get(item.categoryId) ?? fallbackName,
        amount: Number(item._sum?.amount ?? 0),
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  const expenseChartData = toCategoryChartData(
    categoryExpenses,
    "Outras despesas"
  );

  const incomeChartData = toCategoryChartData(
    categoryIncomes,
    "Outras receitas"
  );

  const recentTransactionsData = recentTransactions.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));

  return (
    <div className="space-y-6">
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

      <MonthlyComparisonChart data={monthlyChartData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart
          title="Despesas por categoria"
          description="Distribuição dos gastos no período selecionado"
          emptyMessage="Nenhuma despesa registrada neste período."
          data={expenseChartData}
        />

        <CategoryPieChart
          title="Receitas por categoria"
          description="Distribuição dos ganhos no período selecionado"
          emptyMessage="Nenhuma receita registrada neste período."
          data={incomeChartData}
        />
      </div>

      <RecentTransactions transactions={recentTransactionsData} />
    </div>
  );
}