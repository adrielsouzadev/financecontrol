import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinanceControl",
    template: "%s | FinanceControl",
  },
  description:
    "Gerencie suas finanças pessoais, acompanhe receitas e despesas e tenha controle do seu dinheiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}