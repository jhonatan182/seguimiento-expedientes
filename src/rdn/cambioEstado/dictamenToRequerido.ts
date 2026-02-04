import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import {
  DICTAMEN,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  REQUERIDO,
} from "@/const";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";

export class DictamenToRequerido implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("DictamenToRequerido satisfy", cambioEstado);

    return (
      [DICTAMEN_CIRCULACION, DICTAMEN_CUSTODIA, DICTAMEN].includes(
        cambioEstado.estadoActual,
      ) && cambioEstado.nuevoEstado === REQUERIDO
    );
  }

  public async execute(data: IExecuteData) {
    console.log("DictamenToRequerido execute");

    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    let totalDictamen: number = 0;
    let totalEnCirculacion: number = 0;
    let totalHistorico: number = 0;
    let estadoAnteriorValor: number = 0;

    if (expediente.isHistorico === "S") {
      totalEnCirculacion = cabeceraSemanal.circulacion + 1;
      totalHistorico = cabeceraSemanal.historicoCirculacion - 1;
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior];
    } else {
      totalDictamen = cabeceraSemanal.dictamen - 1;
      totalEnCirculacion = cabeceraSemanal.circulacion;
      totalHistorico = cabeceraSemanal.historicoCirculacion;
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior] - 1;
    }

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
          [columnaDbAnterior]: estadoAnteriorValor,
          dictamen: totalDictamen,
          circulacion: totalEnCirculacion,
          historicoCirculacion: totalHistorico,
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
