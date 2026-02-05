import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { PENDIENTE, REQUERIDO } from "@/const";
import { db } from "@/lib/drizzle";

export class RequeridoToPendiente implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("RequeridoToPendiente satisfy", cambioEstado);

    return (
      cambioEstado.estadoActual === REQUERIDO &&
      cambioEstado.nuevoEstado === PENDIENTE
    );
  }

  public async execute(data: IExecuteData) {
    console.log("RequeridoToPendiente execute");

    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    let totalEnCirculacion: number = 0;
    let totalHistorico: number = 0;
    let estadoAnteriorValor: number = 0;

    if (expediente.isHistorico === "S") {
      totalEnCirculacion = cabeceraSemanal.circulacion + 1;
      totalHistorico = cabeceraSemanal.historicoCirculacion - 1;
      estadoAnteriorValor = cabeceraSemanal[columnaDbAnterior];
    } else {
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
