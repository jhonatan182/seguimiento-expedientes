import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";
import { DICTAMEN_CIRCULACION, DICTAMEN_CUSTODIA } from "@/const";
import { db } from "@/lib/drizzle";
import {
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";

export class DictamenToDictamen implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("DictamenToDictamen satisfy", cambioEstado);

    if (
      (cambioEstado.estadoActual === DICTAMEN_CIRCULACION ||
        cambioEstado.estadoActual === DICTAMEN_CUSTODIA) &&
      (cambioEstado.nuevoEstado === DICTAMEN_CIRCULACION ||
        cambioEstado.nuevoEstado === DICTAMEN_CUSTODIA)
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
    console.log("DictamenToDictamen execute");

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
