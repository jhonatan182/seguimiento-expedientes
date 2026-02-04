import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { CADUCADO, CON_LUGAR, PARCIAL, REQUERIDO, SIN_LUGAR } from "@/const";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";

export class RequeridoToResuelto implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("RequeridoToResuelto satisfy", cambioEstado);

    return (
      [REQUERIDO].includes(cambioEstado.estadoActual) &&
      [CON_LUGAR, SIN_LUGAR, PARCIAL, CADUCADO].includes(
        cambioEstado.nuevoEstado,
      )
    );
  }

  public async execute(data: IExecuteData) {
    console.log("RequeridoToResuelto execute");

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
      totalDictamen =
        cabeceraSemanal.dictamen > 0 ? cabeceraSemanal.dictamen - 1 : 0;
      totalEnCirculacion = cabeceraSemanal.circulacion;
      totalHistorico = cabeceraSemanal.historicoCirculacion;
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior] - 1;
    }

    const totalResuelto =
      cabeceraSemanal.conLugar +
      cabeceraSemanal.sinLugar +
      cabeceraSemanal.parcial +
      cabeceraSemanal.caducado +
      (cabeceraSemanal[columnaDb] + 1);

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
          resuelto: totalResuelto,
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
