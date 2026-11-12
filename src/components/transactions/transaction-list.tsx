"use client";

import { useState } from "react";
import { deleteTransaction } from "@/app/actions/transactions";
import type { TransactionType } from "@/generated/prisma/client";

type TransactionItem = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  category: {
    name: string;
  };
};

type TransactionListProps = {
  transactions: TransactionItem[];
};

export function TransactionList({
  transactions,
}: TransactionListProps) {
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    if (!transactionToDelete) return;

    const result = await deleteTransaction(transactionToDelete);

    setMessage(result.message);
    setTransactionToDelete(null);
  }

  if (transactions.length === 0) {
		return (
			<section className="rounded-xl border border-border bg-white p-6 shadow-sm">
				<h2 className="text-lg font-semibold">
					Histórico de transações
				</h2>

				{message && (
					<p className="mt-4 text-sm text-muted" role="status">
						{message}
					</p>
				)}

				<p className="mt-4 text-sm text-muted">
					Nenhuma transação cadastrada ainda.
				</p>
			</section>
		);
	}

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Histórico de transações
        </h2>

        <p className="mt-1 text-sm text-muted">
          Todas as suas receitas e despesas cadastradas.
        </p>
      </div>

      {message && (
        <p className="mb-4 text-sm text-muted" role="status">
          {message}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-3 py-3 font-medium">Descrição</th>
              <th className="px-3 py-3 font-medium">Categoria</th>
              <th className="px-3 py-3 font-medium">Data</th>
              <th className="px-3 py-3 font-medium">Tipo</th>
              <th className="px-3 py-3 text-right font-medium">Valor</th>
              <th className="px-3 py-3 text-center font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-3 py-4 font-medium">
                  {transaction.description}
                </td>

                <td className="px-3 py-4 text-muted">
                  {transaction.category.name}
                </td>

                <td className="px-3 py-4 text-muted">
                  {transaction.date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </td>

                <td className="px-3 py-4">
                  <span
                    className={
                      transaction.type === "INCOME"
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
                    }
                  >
                    {transaction.type === "INCOME"
                      ? "Receita"
                      : "Despesa"}
                  </span>
                </td>

                <td
                  className={`px-3 py-4 text-right font-semibold ${
                    transaction.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "INCOME" ? "+" : "-"}{" "}
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>

                <td className="px-3 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setTransactionToDelete(transaction.id)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
			{transactionToDelete && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
				<div
					role="dialog"
					aria-modal="true"
					aria-labelledby="delete-dialog-title"
					className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
				>
					<h3
						id="delete-dialog-title"
						className="text-lg font-semibold text-gray-900"
					>
						Excluir transação?
					</h3>

					<p className="mt-2 text-sm text-gray-600">
						Tem certeza que deseja excluir esta transação? Essa ação não poderá
						ser desfeita.
					</p>

					<div className="mt-6 flex justify-end gap-3">
						<button
							type="button"
							onClick={() => setTransactionToDelete(null)}
							className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
						>
							Cancelar
						</button>

						<button
							type="button"
							onClick={handleDelete}
							className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
						>
							Excluir
						</button>
					</div>
				</div>
			</div>
		)}
    </section>
  );
}