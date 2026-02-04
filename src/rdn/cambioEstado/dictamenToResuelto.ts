import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";
import {
  CADUCADO,
  CON_LUGAR,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  PARCIAL,
  SIN_LUGAR,
} from "@/const";

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

  public async execute(data: IExecuteData) {
    console.log("DictamenToResuelto execute");

    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    let nuevoValorHistorico: string;
    if (expediente.isHistorico === "S" || expediente.isHistorico === "E") {
      nuevoValorHistorico = "E";
    } else {
      nuevoValorHistorico = "N";
    }

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
            eq(PamCabeceraSemanal.analistaId, expediente.analistaId),
            eq(PamCabeceraSemanal.semanaId, cabeceraSemanal.semanaId),
          ),
        );

      await tx
        .update(PamExpedientes)
        .set({
          estado: nuevoEstado,
          fechaUltimaModificacion: new Date().toISOString().toString(),
          isHistorico: nuevoValorHistorico,
        })
        .where(
          and(
            eq(PamExpedientes.id, expediente.id),
            eq(PamExpedientes.analistaId, expediente.analistaId),
            eq(PamExpedientes.semanaId, cabeceraSemanal.semanaId),
          ),
        );
    });
  }
}
