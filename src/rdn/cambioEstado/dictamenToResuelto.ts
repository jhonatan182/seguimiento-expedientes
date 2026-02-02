import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";
import {
  CADUCADO,
  CON_LUGAR,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  PARCIAL,
  SIN_LUGAR,
} from "@/const";
import { db } from "@/lib/drizzle";
import {
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";

export class DictamenToResuelto implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("DictamenToResuelto satisfy", cambioEstado);

    if (
      (cambioEstado.estadoActual === DICTAMEN_CIRCULACION ||
        cambioEstado.estadoActual === DICTAMEN_CUSTODIA) &&
      (cambioEstado.nuevoEstado === CON_LUGAR ||
        cambioEstado.nuevoEstado === SIN_LUGAR ||
        cambioEstado.nuevoEstado === PARCIAL ||
        cambioEstado.nuevoEstado === CADUCADO)
    ) {
      return true;
    }

    return false;
  }

  public async execute(
    cabeceraSemanal: PamCabeceraSemanalType,
    columnaDb: keyof PamCabeceraSemanalType,
    columnaDbAnterior: keyof PamCabeceraSemanalType,
    nuevoEstado: string,
    expedienteId: number,
    userId: number,
  ) {
    console.log("DictamenToResuelto execute");

    await db.transaction(async (tx) => {
      await tx
        .update(PamCabeceraSemanal)
        .set({
          [columnaDb]: cabeceraSemanal[columnaDb] + 1,
          [columnaDbAnterior]: cabeceraSemanal[columnaDbAnterior] - 1,
          resuelto: cabeceraSemanal.resuelto + 1,
          dictamen: cabeceraSemanal.dictamen - 1,
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
