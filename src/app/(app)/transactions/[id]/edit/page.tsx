import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { TransactionForm } from "@/components/transactions/transaction-form";

type EditTransactionPageProps = {
  params: Promise<{ id: string }>;
};

async function EditTransactionContent({
  params,
}: EditTransactionPageProps) {
  const { id } = await params;

  await connection();

  const [transaction, categories] = await Promise.all([
    prisma.transaction.findUnique({
      where: { id },
    }),

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
  ]);

  if (!transaction) {
    notFound();
  }

  return (
    <TransactionForm
      categories={categories}
      transaction={{
        id: transaction.id,
        description: transaction.description,
        amount: Number(transaction.amount),
        type: transaction.type,
        date: transaction.date.toISOString().slice(0, 10),
        categoryId: transaction.categoryId,
      }}
    />
  );
}

export default function EditTransactionPage({
  params,
}: EditTransactionPageProps) {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <PageHeader
          title="Editar transação"
          description="Altere os dados da sua receita ou despesa."
        />

        <Suspense
          fallback={
            <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
              Carregando transação...
            </div>
          }
        >
          <EditTransactionContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}