"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  LayoutDashboard,
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);

  function renderNavigation() {
    return navigation.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => setIsOpen(false)}
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
    });
  }

  return (
    <>
      {/* Sidebar para computadores */}
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-border bg-white lg:flex">
        <div className="flex h-20 items-center gap-1 border-b border-border px-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={28}
            height={28}
            className="size-7 -translate-y-px object-contain"
          />

          <span className="text-[22px] font-bold leading-none tracking-tight">
            FinanceControl
          </span>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Menu principal
          </p>

          {renderNavigation()}
        </nav>

        <div className="border-t border-border p-5">
          <p className="text-xs text-muted">
            Controle financeiro pessoal
          </p>
        </div>
      </aside>

      {/* Navegação para dispositivos móveis */}
      <div className="lg:hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-5">
          <div className="flex min-w-0 items-center gap-1">
            <Image
              src="/logo.png"
              alt="logo"
              width={24}
              height={24}
              className="size-6 -translate-y-px object-contain"
            />

            <span className="whitespace-nowrap text-xl font-bold leading-none tracking-tight">
              FinanceControl
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="shrink-0 rounded-lg p-2 text-foreground transition-colors hover:bg-slate-100"
          >
            {isOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </header>

        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40"
            />

            <nav className="fixed inset-y-16 right-0 z-50 w-72 border-l border-border bg-white p-4 shadow-xl">
              <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Menu principal
              </p>

              <div className="space-y-2">
                {renderNavigation()}
              </div>
            </nav>
          </>
        )}
      </div>
    </>
  );
}