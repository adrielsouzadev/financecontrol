import { PageHeader } from "@/components/layout/page-header";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Cabeçalho */}
        <PageHeader
          title="Dashboard"
          description="Acompanhe sua situação financeira e seus resultados."
        />

        {/* Resumo financeiro */}
        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">
                Saldo total
              </p>

              <Wallet className="size-5 text-primary" />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              R$ 0,00
            </h2>

            <p className="mt-2 text-sm text-muted">
              Seu saldo atual
            </p>
          </article>

          <article className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">
                Receitas do mês
              </p>

              <ArrowUpCircle className="size-5 text-primary" />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              R$ 0,00
            </h2>

            <p className="mt-2 text-sm text-muted">
              Total recebido neste mês
            </p>
          </article>

          <article className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">
                Despesas do mês
              </p>

              <ArrowDownCircle className="size-5 text-red-500" />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              R$ 0,00
            </h2>

            <p className="mt-2 text-sm text-muted">
              Total gasto neste mês
            </p>
          </article>
        </section>

        {/* Conteúdo principal */}
        <section className="rounded-xl border border-border bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold">
            Bem-vindo ao FinanceControl!
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Seu painel financeiro está sendo preparado.
            Em breve você poderá cadastrar transações,
            acompanhar gráficos e visualizar seus resultados.
          </p>
        </section>
      </div>
    </main>
  );
}