import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";
import { db } from "@/lib/drizzle";
import { PENDIENTE, REQUERIDO } from "@/const";
import {
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";

export class PendienteToAny implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("PendienteToAny satisfy", cambioEstado);

    return (
      cambioEstado.estadoActual === PENDIENTE &&
      [REQUERIDO].includes(cambioEstado.nuevoEstado)
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
    console.log("PendienteToAny execute");

    await db.transaction(async (tx) => {
      await tx
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

      await tx
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
    });
  }
}
