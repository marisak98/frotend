import { z } from "zod";

export const CreateBlueprintSchema = z.object({
  name: z
    .string()
    .min(4, { message: "El nombre debe de ser mayor a 4 caracteres" }),
  icon: z.string().max(50),
  type: z.enum(["nueva", "inactivo", "pendiente", "reproceso"]),
});

export type CreateBlueprintType = z.infer<typeof CreateBlueprintSchema>;
