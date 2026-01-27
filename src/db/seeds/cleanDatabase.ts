import { db, client } from "@/lib/drizzle";
import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { PamCabeceraSemanal } from "@/db/schema/PAM_CABECERA_SEMANAL";
import { PamAnalista } from "@/db/schema/PAM_ANALISTA";
import { PamSemanas } from "@/db/schema/PAM_SEMANAS";

export async function cleanDatabase() {
  console.log("🧹 Limpiando base de datos...\n");

  try {
    // Desactivar temporalmente las foreign keys para poder eliminar en cualquier orden
    await client.execute("PRAGMA foreign_keys = OFF");

    // Eliminar datos en orden inverso a las dependencias
    // 1. Primero las tablas con foreign keys
    await db.delete(PamExpedientes);
    console.log("  ✓ PAM_EXPEDIENTES limpiada");

    await db.delete(PamCabeceraSemanal);
    console.log("  ✓ PAM_CABECERA_SEMANAL limpiada");

    // 2. Luego las tablas sin dependencias
    await db.delete(PamAnalista);
    console.log("  ✓ PAM_ANALISTA limpiada");

    await db.delete(PamSemanas);
    console.log("  ✓ PAM_SEMANAS limpiada");

    // Resetear los contadores de auto-incremento
    await client.execute(
      "DELETE FROM sqlite_sequence WHERE name IN ('PAM_EXPEDIENTES', 'PAM_CABECERA_SEMANAL', 'PAM_ANALISTA', 'PAM_SEMANAS')",
    );
    console.log("  ✓ Contadores de auto-incremento reseteados");

    // Reactivar las foreign keys
    await client.execute("PRAGMA foreign_keys = ON");

    console.log("\n✅ Base de datos limpiada exitosamente\n");
  } catch (error) {
    console.error("❌ Error al limpiar la base de datos:", error);
    // Asegurarse de reactivar las foreign keys incluso si hay error
    await client.execute("PRAGMA foreign_keys = ON").catch(() => {});
    throw error;
  }
}
