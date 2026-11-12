
"use client";

import { useState } from "react";

type TransactionType = "INCOME" | "EXPENSE";

type CategoryOption = {
  id: string;
  name: string;
  type: TransactionType;
};

type TransactionFormProps = {
  categories: CategoryOption[];
};

export function TransactionForm({
  categories,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>("EXPENSE");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Nova transação
        </h2>

        <p className="mt-1 text-sm text-muted">
          Preencha os dados da sua movimentação financeira.
        </p>
      </div>

      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium"
            >
              Tipo de transação
            </label>

            <select
              id="type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as TransactionType)
              }
              className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Descrição
            </label>

            <input
              id="description"
              name="description"
              type="text"
              maxLength={120}
              placeholder="Ex.: Conta de energia"
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium"
            >
              Valor (R$)
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0,00"
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium"
            >
              Data
            </label>

            <input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="categoryId"
              className="mb-2 block text-sm font-medium"
            >
              Categoria
            </label>

            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue=""
              className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>

              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </section>
  );
}