import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { PamSemanas } from "@/db/schema/PAM_SEMANAS";

export type NuevaSemana = InferInsertModel<typeof PamSemanas>;

export async function seedPamSemanas() {
  // Crear semanas para el primer trimestre de 2025
  const semanas: NuevaSemana[] = [
    { descripcion: "Semana 1.1 - Enero 2026" },
    { descripcion: "Semana 1.2 - Enero 2026" },
    { descripcion: "Semana 1.3 - Enero 2026" },
    { descripcion: "Semana 1.4 - Enero 2026" },
    { descripcion: "Semana 2.1 - Febrero 2026" },
    { descripcion: "Semana 2.2 - Febrero 2026" },
    { descripcion: "Semana 2.3 - Febrero 2026" },
    { descripcion: "Semana 2.4 - Febrero 2026" },
    { descripcion: "Semana 3.1 - Marzo 2026" },
    { descripcion: "Semana 3.2 - Marzo 2026" },
    { descripcion: "Semana 3.3 - Marzo 2026" },
    { descripcion: "Semana 3.4 - Marzo 2026" },
  ];

  try {
    await db.insert(PamSemanas).values(semanas);
    console.log(`✅ Se insertaron ${semanas.length} semanas exitosamente`);
  } catch (error) {
    console.error("❌ Error al insertar semanas:", error);
    throw error;
  }
}
