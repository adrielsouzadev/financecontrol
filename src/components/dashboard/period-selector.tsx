"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDate = new Date();

  const month = Number(
    searchParams.get("month") ?? currentDate.getMonth() + 1
  );

  const year = Number(
    searchParams.get("year") ?? currentDate.getFullYear()
  );

  const selectedDate = new Date(year, month - 1, 1);

  const formattedPeriod = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  function changeMonth(offset: number) {
    const newDate = new Date(year, month - 1 + offset, 1);

    const params = new URLSearchParams(searchParams.toString());

    params.set("month", String(newDate.getMonth() + 1));
    params.set("year", String(newDate.getFullYear()));

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-2">
      <button
        type="button"
        onClick={() => changeMonth(-1)}
        aria-label="Mês anterior"
        className="rounded-md p-2 transition-colors hover:bg-slate-100"
      >
        <ChevronLeft className="size-5" />
      </button>

      <span className="min-w-36 text-center text-sm font-semibold capitalize">
        {formattedPeriod}
      </span>

      <button
        type="button"
        onClick={() => changeMonth(1)}
        aria-label="Próximo mês"
        className="rounded-md p-2 transition-colors hover:bg-slate-100"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}