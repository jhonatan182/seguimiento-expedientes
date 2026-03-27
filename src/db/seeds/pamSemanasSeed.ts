import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { PamSemanas } from "@/db/schema/PAM_SEMANAS";

export type NuevaSemana = InferInsertModel<typeof PamSemanas>;

export async function seedPamSemanas() {
  // Crear semanas para todo el año 2026
  const semanas: NuevaSemana[] = [
  { "id": 1, "descripcion": "Semana 1.1 - Enero 2026" },
  { "id": 2, "descripcion": "Semana 1.2 - Enero 2026" },
  { "id": 3, "descripcion": "Semana 1.3 - Enero 2026" },
  { "id": 4, "descripcion": "Semana 1.4 - Enero 2026" },
  { "id": 5, "descripcion": "Semana 1.5 - Enero 2026" },
  { "id": 6, "descripcion": "Semana 2.1 - Febrero 2026" },
  { "id": 7, "descripcion": "Semana 2.2 - Febrero 2026" },
  { "id": 8, "descripcion": "Semana 2.3 - Febrero 2026" },
  { "id": 9, "descripcion": "Semana 2.4 - Febrero 2026" },
  { "id": 10, "descripcion": "Semana 3.1 - Marzo 2026" },
  { "id": 11, "descripcion": "Semana 3.2 - Marzo 2026" },
  { "id": 12, "descripcion": "Semana 3.3 - Marzo 2026" },
  { "id": 13, "descripcion": "Semana 3.4 - Marzo 2026" },
  { "id": 14, "descripcion": "Semana 3.5 - Marzo 2026" }
];

  try {
    await db.insert(PamSemanas).values(semanas);
    console.log(`✅ Se insertaron ${semanas.length} semanas exitosamente`);
  } catch (error) {
    console.error("❌ Error al insertar semanas:", error);
    throw error;
  }
}
