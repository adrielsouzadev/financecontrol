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
  if (transactions.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Histórico de transações
        </h2>

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

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-3 py-3 font-medium">Descrição</th>
              <th className="px-3 py-3 font-medium">Categoria</th>
              <th className="px-3 py-3 font-medium">Data</th>
              <th className="px-3 py-3 font-medium">Tipo</th>
              <th className="px-3 py-3 text-right font-medium">Valor</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}