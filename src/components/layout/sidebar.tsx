"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  LayoutDashboard,
  Wallet,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Transações",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-border px-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
          <Wallet className="size-6" />
        </div>

        <span className="text-xl font-bold tracking-tight">
          FinanceControl
        </span>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Menu principal
        </p>

        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-50 text-primary"
                  : "text-muted hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-5">
        <p className="text-xs text-muted">
          Controle financeiro pessoal
        </p>
      </div>
    </aside>
  );
}