import { Suspense, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <Suspense fallback={<div className="w-64 shrink-0" />}>
        <Sidebar />
      </Suspense>

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}