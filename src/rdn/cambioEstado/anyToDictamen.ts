import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy, IExecuteData } from "@/interfaces";
import { DICTAMEN, DICTAMEN_CIRCULACION, DICTAMEN_CUSTODIA } from "@/const";
import { db } from "@/lib/drizzle";
import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";

export class AnyToDictamen implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("AnyToDictamen satisfy", cambioEstado);

    return [DICTAMEN_CIRCULACION, DICTAMEN_CUSTODIA, DICTAMEN].includes(
      cambioEstado.nuevoEstado,
    );
  }

  public async execute(data: IExecuteData) {
    const {
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expediente,
    } = data;

    console.log("AnyToDictamen execute");

    const { dictamen } = cabeceraSemanal;

    const totalDictamen = dictamen + 1;

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
          dictamen: totalDictamen,
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
