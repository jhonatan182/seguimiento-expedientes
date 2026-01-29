import { seedPamAnalistas } from "./pamAnalistaSeed";
import { seedPamSemanas } from "./pamSemanasSeed";
import { seedPamCabeceraSemanal } from "./pamCabeceraSemanalSeed";
import { seedPamExpedientes } from "./pamExpedientesSeed";
import { cleanDatabase } from "./cleanDatabase";

async function main() {
  console.log("🌱 Iniciando proceso de seeds...\n");

  try {
    // 1. Limpiar la base de datos primero
    await cleanDatabase();

    // 2. Ejecutar los seeds en el orden correcto
    // Primero las tablas sin dependencias
    await seedPamSemanas();
    await seedPamAnalistas();

    // Luego las tablas que dependen de las anteriores
    // await seedPamCabeceraSemanal();
    // await seedPamExpedientes();

    console.log("\n✅ Todos los seeds se ejecutaron exitosamente");
  } catch (error) {
    console.error("\n❌ Error al ejecutar seeds:", error);
    process.exit(1);
  }
}

main();
