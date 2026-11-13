"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/validations/transaction";
import { redirect } from "next/navigation";

export type TransactionFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

export async function createTransaction(
  _previousState: TransactionFormState,
  formData: FormData
): Promise<TransactionFormState> {
  const result = transactionSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= [];
      errors[field].push(issue.message);
    }

    return {
      status: "error",
      message: "Verifique os campos informados.",
      errors,
    };
  }

  const data = result.data;

  try {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { type: true },
    });

    if (!category || category.type !== data.type) {
      return {
        status: "error",
        message:
          "A categoria selecionada não corresponde ao tipo da transação.",
      };
    }

    await prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: new Date(`${data.date}T12:00:00.000Z`),
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/");
    revalidatePath("/transactions");

    return {
      status: "success",
      message: "Transação cadastrada com sucesso!",
    };
  } catch (error) {
		console.error("Erro ao cadastrar transação:", error);

		return {
			status: "error",
			message:
				"Não foi possível cadastrar a transação. Tente novamente.",
		};
	}
}

export async function updateTransaction(
  _previousState: TransactionFormState,
  formData: FormData
): Promise<TransactionFormState> {
  const id = String(formData.get("id") ?? "");

  if (!id.trim()) {
    return {
      status: "error",
      message: "Transação inválida.",
    };
  }

  const result = transactionSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= [];
      errors[field].push(issue.message);
    }

    return {
      status: "error",
      message: "Verifique os campos informados.",
      errors,
    };
  }

  const data = result.data;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!transaction) {
      return {
        status: "error",
        message: "Transação não encontrada.",
      };
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { type: true },
    });

    if (!category || category.type !== data.type) {
      return {
        status: "error",
        message:
          "A categoria selecionada não corresponde ao tipo da transação.",
      };
    }

    await prisma.transaction.update({
      where: { id },
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: new Date(`${data.date}T12:00:00.000Z`),
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/");
    revalidatePath("/transactions");
  } catch (error) {
		console.error("Erro ao atualizar transação:", error);

		return {
			status: "error",
			message: "Não foi possível atualizar a transação.",
		};
	}

  redirect("/transactions");
}

export async function deleteTransaction(
  id: string
): Promise<TransactionFormState> {
  if (!id || !id.trim()) {
    return {
      status: "error",
      message: "Transação inválida.",
    };
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!transaction) {
      return {
        status: "error",
        message: "Transação não encontrada.",
      };
    }

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/transactions");

    return {
      status: "success",
      message: "Transação excluída com sucesso!",
    };
  } catch (error) {
		console.error("Erro ao excluir transação:", error);

		return {
			status: "error",
			message: "Não foi possível excluir a transação.",
		};
	}
}