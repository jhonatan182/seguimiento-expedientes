import {
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";
import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";
import { db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";

export class PendienteToAny implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    return (
      cambioEstado.estadoActual === "PENDIENTE" &&
      ["DICTAMEN", "REQUERIDO"].includes(cambioEstado.nuevoEstado)
    );
  }

  public async execute(
    cabeceraSemanal: PamCabeceraSemanalType,
    columnaDb: keyof PamCabeceraSemanalType,
    columnaDbAnterior: keyof PamCabeceraSemanalType,
    nuevoEstado: string,
    expedienteId: number,
    userId: number,
  ) {
    await db
      .update(PamCabeceraSemanal)
      .set({
        [columnaDb]: cabeceraSemanal[columnaDb] + 1,
        [columnaDbAnterior]: cabeceraSemanal[columnaDbAnterior] - 1,
      })
      .where(
        and(
          eq(PamCabeceraSemanal.id, cabeceraSemanal.id),
          eq(PamCabeceraSemanal.analistaId, userId),
          eq(PamCabeceraSemanal.semanaId, cabeceraSemanal.semanaId),
        ),
      );

    await db
      .update(PamExpedientes)
      .set({
        estado: nuevoEstado,
        fechaUltimaModificacion: new Date().toISOString().toString(),
      })
      .where(
        and(
          eq(PamExpedientes.id, expedienteId),
          eq(PamExpedientes.analistaId, userId),
          eq(PamExpedientes.semanaId, cabeceraSemanal.semanaId),
        ),
      );
  }
}
