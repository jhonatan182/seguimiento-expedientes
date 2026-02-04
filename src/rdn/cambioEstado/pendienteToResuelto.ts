import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { CADUCADO, CON_LUGAR, PARCIAL, PENDIENTE, SIN_LUGAR } from "@/const";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";

export class PendienteToResuelto implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("PendienteToResuelto satisfy", cambioEstado);

    return (
      cambioEstado.estadoActual === PENDIENTE &&
      [CON_LUGAR, SIN_LUGAR, PARCIAL, CADUCADO].includes(
        cambioEstado.nuevoEstado,
      )
    );
  }

  public async execute(data: IExecuteData) {
    console.log("PendienteToResuelto execute");

    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    const totalResuelto = cabeceraSemanal.resuelto + 1;

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
