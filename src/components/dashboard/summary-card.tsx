import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  variant?: "default" | "positive" | "negative";
};

const variantStyles = {
  default: "text-primary",
  positive: "text-green-600",
  negative: "text-red-500",
};

export function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
}: SummaryCardProps) {
  return (
    <article className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">
          {title}
        </p>

        <Icon className={`size-5 ${variantStyles[variant]}`} />
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        {formatCurrency(value)}
      </h2>

      <p className="mt-2 text-sm text-muted">
        {description}
      </p>
    </article>
  );
}