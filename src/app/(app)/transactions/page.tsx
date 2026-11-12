
import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";

async function TransactionsContent() {
  await connection();

  const [categories, transactions] = await Promise.all([
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
        type: true,
      },
      orderBy: {
        name: "asc",
      },
    }),

    prisma.transaction.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return (
    <>
      <TransactionForm categories={categories} />

      <TransactionList
        transactions={transactions.map((transaction) => ({
          ...transaction,
          amount: Number(transaction.amount),
        }))}
      />
    </>
  );
}

export default function TransactionsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <PageHeader
          title="Transações"
          description="Gerencie suas receitas e despesas."
        />

        <Suspense
          fallback={
            <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
              Carregando transações...
            </div>
          }
        >
          <TransactionsContent />
        </Suspense>
      </div>
    </main>
  );
}