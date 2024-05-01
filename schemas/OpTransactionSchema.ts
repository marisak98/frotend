import { z } from "zod";

export const OpTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  type: z.union([
    z.literal("nueva"),
    z.literal("reproceso"),
    z.literal("inactivo"),
    z.literal("pendiente"),
  ]),
});

export type OpTransactionSchemaType = z.infer<typeof OpTransactionSchema>;
