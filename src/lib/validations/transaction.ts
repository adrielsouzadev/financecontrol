import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Informe uma descrição.")
    .max(120, "A descrição deve ter no máximo 120 caracteres."),

  amount: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Informe um valor válido com até duas casas decimais."
    )
    .transform(Number)
    .refine((value) => value > 0, "O valor deve ser maior que zero.")
    .refine(
      (value) => value <= 9999999999.99,
      "O valor informado é muito alto."
    ),

  type: z.enum(["INCOME", "EXPENSE"], {
    error: "Selecione um tipo de transação válido.",
  }),

  date: z.iso.date({
    error: "Informe uma data válida.",
  }),

  categoryId: z
    .string()
    .min(1, "Selecione uma categoria."),
});