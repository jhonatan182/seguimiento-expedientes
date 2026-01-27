import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { PamSemanas } from "@/db/schema/PAM_SEMANAS";

export type NuevaSemana = InferInsertModel<typeof PamSemanas>;

export async function seedPamSemanas() {
  // Crear semanas para el primer trimestre de 2025
  const semanas: NuevaSemana[] = [
    { descripcion: "Semana 1 - Enero 2026" },
    { descripcion: "Semana 2 - Enero 2026" },
    { descripcion: "Semana 3 - Enero 2026" },
    { descripcion: "Semana 4 - Enero 2026" },
    { descripcion: "Semana 5 - Febrero 2026" },
    { descripcion: "Semana 6 - Febrero 2026" },
    { descripcion: "Semana 7 - Febrero 2026" },
    { descripcion: "Semana 8 - Febrero 2026" },
    { descripcion: "Semana 9 - Marzo 2026" },
    { descripcion: "Semana 10 - Marzo 2026" },
    { descripcion: "Semana 11 - Marzo 2026" },
    { descripcion: "Semana 12 - Marzo 2026" },
  ];

  try {
    await db.insert(PamSemanas).values(semanas);
    console.log(`✅ Se insertaron ${semanas.length} semanas exitosamente`);
  } catch (error) {
    console.error("❌ Error al insertar semanas:", error);
    throw error;
  }
}
