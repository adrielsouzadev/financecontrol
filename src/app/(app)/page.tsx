import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";

type HomeProps = {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
};

export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
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

        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-3">
              <div className="h-36 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-36 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-36 animate-pulse rounded-xl bg-slate-100" />
            </div>
          }
        >
          <DashboardSummary searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}