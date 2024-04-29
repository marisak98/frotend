import { z } from "zod";

export const opCategorySchema = z.object({
  name: z
    .string()
    .min(4, { message: "El nombre debe de ser mayor a 4 caracteres" }),
  icon: z.string().max(50),
  type: z.enum(["active", "inactive"]),
});

export type OpCategorytype = z.infer<typeof opCategorySchema>;

export const deleteOpCategorySchema = z.object({
  name: z
    .string()
    .min(4, { message: "El nombre debe de ser mayor a 4 caracteres" }),
  type: z.enum(["active", "inactive"]),
});

export type DeleteOpCategoryType = z.infer<typeof deleteOpCategorySchema>;
