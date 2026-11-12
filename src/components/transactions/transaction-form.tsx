"use client";

import { useActionState, useState } from "react";
import {
  createTransaction,
  updateTransaction,
  type TransactionFormState,
} from "@/app/actions/transactions";

type TransactionType = "INCOME" | "EXPENSE";

type CategoryOption = {
  id: string;
  name: string;
  type: TransactionType;
};

type TransactionFormData = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
};

type TransactionFormProps = {
  categories: CategoryOption[];
  transaction?: TransactionFormData;
};

const initialState: TransactionFormState = {
  status: "idle",
  message: "",
};

export function TransactionForm({
  categories,
  transaction,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(
    transaction?.type ?? "EXPENSE"
  );

  const action = transaction ? updateTransaction :  createTransaction;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          {transaction ? "Editar transação" : "Nova transação"}
        </h2>

        <p className="mt-1 text-sm text-muted">
          Preencha os dados da sua movimentação financeira.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {transaction && (
          <input type="hidden" name="id" value={transaction.id} />
        )}

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
              name="type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as TransactionType)
              }
              className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </select>

            {state.errors?.type && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.type[0]}
              </p>
            )}
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
              defaultValue={transaction?.description ?? ""}
              placeholder={
                type === "EXPENSE"
                  ? "Ex.: Conta de energia"
                  : "Ex.: Salário"
              }
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />

            {state.errors?.description && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.description[0]}
              </p>
            )}
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
              defaultValue={transaction?.amount ?? ""}
              placeholder="0,00"
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />

            {state.errors?.amount && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.amount[0]}
              </p>
            )}
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
              defaultValue={
                transaction?.date ??
                new Date().toLocaleDateString("en-CA")
              }
              className="w-full rounded-lg border border-border px-3 py-3 text-sm outline-none focus:border-primary"
            />

            {state.errors?.date && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.date[0]}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="categoryId"
              className="mb-2 block text-sm font-medium"
            >
              Categoria
            </label>

            <select
              key={type}
              id="categoryId"
              name="categoryId"
              required
              defaultValue={transaction?.categoryId ?? ""}
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

            {state.errors?.categoryId && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.categoryId[0]}
              </p>
            )}
          </div>
        </div>

        {state.message && (
          <p
            role="status"
            className={`text-sm ${
              state.status === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Salvando..."
            : transaction
              ? "Salvar alterações"
              : "Cadastrar transação"}
        </button>
      </form>
    </section>
  );
}