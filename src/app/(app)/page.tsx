import { PageHeader } from "@/components/layout/page-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { Suspense } from "react";
import { PeriodSelector } from "@/components/dashboard/period-selector";

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
        >
          <Suspense
            fallback={
              <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-100" />
            }
          >
            <PeriodSelector />
          </Suspense>
        </PageHeader>

        {/* Resumo financeiro */}
        
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Saldo total"
            value={0}
            description="Seu saldo atual"
            icon={Wallet}
          />

          <SummaryCard
            title="Receitas do mês"
            value={0}
            description="Total recebido neste mês"
            icon={ArrowUpCircle}
            variant="positive"
          />

          <SummaryCard
            title="Despesas do mês"
            value={0}
            description="Total gasto neste mês"
            icon={ArrowDownCircle}
            variant="negative"
          />
        </section>

      </div>
    </main>
  );
}