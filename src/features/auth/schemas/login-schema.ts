import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().trim().min(1, "El nombre de usuario es requerido"),
    password: z.string().trim().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
