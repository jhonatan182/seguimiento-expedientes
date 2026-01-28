import { z } from "zod";

export const ExpedienteSchema = z.object({
  expediente: z
    .string()
    .min(1, "El número de expediente es requerido")
    .min(11, "El número de expediente debe tener al menos 11 caracteres"),
  estado: z.string().min(1, "El estado es requerido"),
});

export type ExpedienteSchemaType = z.infer<typeof ExpedienteSchema>;
