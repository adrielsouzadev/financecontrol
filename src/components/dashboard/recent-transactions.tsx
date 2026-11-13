import { formatCurrency } from "@/lib/format-currency";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type RecentTransaction = {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: Date;
  category: {
    name: string;
  };
};

type RecentTransactionsProps = {
  transactions: RecentTransaction[];
};

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Transações recentes
        </h2>

        <p className="mt-1 text-sm text-muted">
          Suas últimas movimentações financeiras
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center text-sm text-muted">
          Nenhuma transação cadastrada.
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="pb-3 font-medium">Descrição</th>
                  <th className="pb-3 font-medium">Categoria</th>
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 text-right font-medium">Valor</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => {
                  const isIncome = transaction.type === "INCOME";

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-4 font-medium">
                        {transaction.description}
                      </td>

                      <td className="py-4 text-muted">
                        {transaction.category.name}
                      </td>

                      <td className="py-4 text-muted">
                        {new Intl.DateTimeFormat("pt-BR", {
                          timeZone: "UTC",
                        }).format(transaction.date)}
                      </td>

                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            isIncome ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isIncome ? (
                            <ArrowUpCircle className="size-4" />
                          ) : (
                            <ArrowDownCircle className="size-4" />
                          )}

                          {isIncome ? "Receita" : "Despesa"}
                        </span>
                      </td>

                      <td
                        className={`py-4 text-right font-semibold ${
                          isIncome ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(Number(transaction.amount))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "INCOME";

              return (
                <div
                  key={transaction.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 wrap-break-word text-sm font-semibold">
                      {transaction.description}
                    </p>

                    <p
                      className={`shrink-0 text-sm font-semibold ${
                        isIncome ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(Number(transaction.amount))}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>{transaction.category.name}</span>
                    <span>•</span>
                    <span>
                      {new Intl.DateTimeFormat("pt-BR", {
                        timeZone: "UTC",
                      }).format(transaction.date)}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 ${
                        isIncome ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpCircle className="size-3.5" />
                      ) : (
                        <ArrowDownCircle className="size-3.5" />
                      )}

                      {isIncome ? "Receita" : "Despesa"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}