import { z } from "zod";

//creacion
export const ExpedienteSchema = z.object({
  expediente: z
    .string()
    .min(1, "El número de expediente es requerido")
    .min(11, "El número de expediente debe tener al menos 11 caracteres"),
  estado: z.string().min(1, "El estado es requerido"),
  fechaIngreso: z.string().min(1, "La fecha de ingreso es requerida"),
});
export type ExpedienteSchemaType = z.infer<typeof ExpedienteSchema>;

//actualizacion
export const UpdateExpedienteSchema = ExpedienteSchema.pick({
  expediente: true,
});
export type UpdateExpedienteSchemaType = z.infer<typeof UpdateExpedienteSchema>;
