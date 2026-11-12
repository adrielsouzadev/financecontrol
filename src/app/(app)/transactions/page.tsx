import { Suspense } from "react";
import { connection } from "next/server";
import { PageHeader } from "@/components/layout/page-header";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { prisma } from "@/lib/prisma";

async function TransactionsContent() {
  await connection();

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <TransactionForm categories={categories} />;
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
              Carregando formulário...
            </div>
          }
        >
          <TransactionsContent />
        </Suspense>
      </div>
    </main>
  );
}