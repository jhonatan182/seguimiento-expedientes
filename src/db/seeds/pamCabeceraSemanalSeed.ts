import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { PamCabeceraSemanal } from "@/db/schema/PAM_CABECERA_SEMANAL";

export type NuevaCabeceraSemanal = InferInsertModel<typeof PamCabeceraSemanal>;

export async function seedPamCabeceraSemanal() {
  // Asumiendo que tenemos 12 semanas (ids 1-12)
  const cabeceras: NuevaCabeceraSemanal[] = [
    {
      semanaId: 1,
      analistaId: 1,
      saldoAnterior: 150,
      nuevoIngreso: 25,
      circulacion: 30,
      resuelto: 20,
      conLugar: 15,
      sinLugar: 5,
      parcial: 8,
      caducado: 2,
      dictamen: 12,
      requerido: 10,
      pendiente: 18,
      historicoCirculacion: 120,
    },
    {
      semanaId: 2,
      analistaId: 1,
      saldoAnterior: 175,
      nuevoIngreso: 30,
      circulacion: 35,
      resuelto: 25,
      conLugar: 18,
      sinLugar: 7,
      parcial: 10,
      caducado: 3,
      dictamen: 15,
      requerido: 12,
      pendiente: 20,
      historicoCirculacion: 135,
    },
    {
      semanaId: 1,
      analistaId: 2,
      saldoAnterior: 180,
      nuevoIngreso: 28,
      circulacion: 32,
      resuelto: 22,
      conLugar: 16,
      sinLugar: 6,
      parcial: 9,
      caducado: 2,
      dictamen: 13,
      requerido: 11,
      pendiente: 19,
      historicoCirculacion: 140,
    },
    {
      semanaId: 2,
      analistaId: 2,
      saldoAnterior: 186,
      nuevoIngreso: 32,
      circulacion: 38,
      resuelto: 28,
      conLugar: 20,
      sinLugar: 8,
      parcial: 11,
      caducado: 4,
      dictamen: 16,
      requerido: 14,
      pendiente: 22,
      historicoCirculacion: 150,
    },
    {
      semanaId: 3,
      analistaId: 2,
      saldoAnterior: 190,
      nuevoIngreso: 27,
      circulacion: 33,
      resuelto: 24,
      conLugar: 17,
      sinLugar: 7,
      parcial: 9,
      caducado: 3,
      dictamen: 14,
      requerido: 12,
      pendiente: 21,
      historicoCirculacion: 155,
    },
  ];

  try {
    await db.insert(PamCabeceraSemanal).values(cabeceras);
    console.log(
      `✅ Se insertaron ${cabeceras.length} cabeceras semanales exitosamente`,
    );
  } catch (error) {
    console.error("❌ Error al insertar cabeceras semanales:", error);
    throw error;
  }
}
