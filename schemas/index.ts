import * as z from "zod";
import cedulaValidation from "@/lib/utils/cedulaValidation";

export const Loginschema = z.object({
  cedula: z
    .string()
    .regex(/^\d{10}$/)
    .refine((cedula: string) => cedulaValidation(cedula), {
      message: "Cedula invalida",
    }),
  password: z.string().min(6, { message: "Minimo 6 caracteres" }),
});
