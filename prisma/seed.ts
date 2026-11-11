import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não foi definida.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Salário", type: "INCOME" },
  { name: "Investimentos", type: "INCOME" },
  { name: "Freelance", type: "INCOME" },
  { name: "Outras receitas", type: "INCOME" },
  { name: "Alimentação", type: "EXPENSE" },
  { name: "Transporte", type: "EXPENSE" },
  { name: "Moradia", type: "EXPENSE" },
  { name: "Lazer", type: "EXPENSE" },
  { name: "Saúde", type: "EXPENSE" },
  { name: "Educação", type: "EXPENSE" },
  { name: "Outras despesas", type: "EXPENSE" },
] as const;

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name_type: {
          name: category.name,
          type: category.type,
        },
      },
      update: {},
      create: category,
    });
  }

  console.log("Categorias iniciais cadastradas com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao cadastrar categorias:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });