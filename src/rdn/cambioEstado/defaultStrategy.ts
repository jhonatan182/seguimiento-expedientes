import { and, eq } from "drizzle-orm";

import { IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";

export class DefaultStrategy implements IEstatadosEstrategy {
  public satisfy(): boolean {
    return true;
  }

  public async execute(data: IExecuteData) {
    console.log("DefaultStrategy execute");

    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    let estadoAnteriorValor: number = 0;
    let totalEnCirculacion: number = 0;
    let totalHistorico: number = 0;

    if (expediente.isHistorico === "S") {
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior];
      totalEnCirculacion = cabeceraSemanal.circulacion + 1;
      totalHistorico = cabeceraSemanal.historicoCirculacion - 1;
    } else {
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior] - 1;
      totalEnCirculacion = cabeceraSemanal.circulacion;
      totalHistorico = cabeceraSemanal.historicoCirculacion;
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
