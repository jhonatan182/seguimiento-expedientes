import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";

export type NuevoExpediente = InferInsertModel<typeof PamExpedientes>;

export async function seedPamExpedientes() {
  // Estados posibles para los expedientes
  const estados = [
    "Pendiente",
    "En Circulación",
    "Resuelto",
    "Con Lugar",
    "Sin Lugar",
    "Parcial",
    "Caducado",
    "Dictamen",
    "Requerido",
  ];

  // Generar expedientes distribuidos entre analistas y semanas
  // Asumiendo 10 analistas (ids 1-10) y 12 semanas (ids 1-12)
  const expedientes: NuevoExpediente[] = [];

  // Generar aproximadamente 5-8 expedientes por semana distribuidos entre analistas
  for (let semanaId = 1; semanaId <= 12; semanaId++) {
    const expedientesPorSemana = Math.floor(Math.random() * 4) + 5; // Entre 5 y 8 expedientes

    for (let i = 0; i < expedientesPorSemana; i++) {
      const analistaId = Math.floor(Math.random() * 10) + 1; // Analista aleatorio entre 1-10
      const estado = estados[Math.floor(Math.random() * estados.length)];

      // Fechas realistas basadas en la semana
      const fechaBase = new Date(2025, 0, 6 + (semanaId - 1) * 7); // Inicio de cada semana
      const diasOffset = Math.floor(Math.random() * 7); // Día aleatorio de la semana
      const fechaIngreso = new Date(fechaBase);
      fechaIngreso.setDate(fechaBase.getDate() + diasOffset);

      const fechaUltimaModificacion = new Date(fechaIngreso);
      fechaUltimaModificacion.setDate(
        fechaIngreso.getDate() + Math.floor(Math.random() * 5),
      ); // Modificación 0-5 días después

      const observaciones = [
        "Expediente en revisión",
        "Pendiente de documentación adicional",
        "Requiere dictamen técnico",
        "En espera de respuesta del solicitante",
        "Documentación completa",
        "Requiere validación",
        "En proceso de resolución",
        null, // Algunos sin observaciones
      ][Math.floor(Math.random() * 8)];

      expedientes.push({
        expediente: `EXP-${new Date().getFullYear()}-${semanaId}-${i}`,
        analistaId,
        semanaId,
        fechaIngreso: fechaIngreso.toISOString().split("T")[0],
        estado,
        fechaUltimaModificacion: fechaUltimaModificacion
          .toISOString()
          .split("T")[0],
        observaciones: observaciones || undefined,
      });
    }
  }

  try {
    await db.insert(PamExpedientes).values(expedientes);
    console.log(
      `✅ Se insertaron ${expedientes.length} expedientes exitosamente`,
    );
  } catch (error) {
    console.error("❌ Error al insertar expedientes:", error);
    throw error;
  }
}
