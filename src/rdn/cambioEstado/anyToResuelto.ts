import { and, eq } from "drizzle-orm";

import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";
import { db } from "@/lib/drizzle";
import { CADUCADO, CON_LUGAR, PARCIAL, SIN_LUGAR } from "@/const";
import {
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";

export class AnyToResuelto implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    console.log("AnyToResuelto satisfy", cambioEstado);

    return [CON_LUGAR, SIN_LUGAR, PARCIAL, CADUCADO].includes(
      cambioEstado.nuevoEstado,
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
    console.log("AnyToResuelto");

    const { conLugar, sinLugar, parcial, caducado } = cabeceraSemanal;
    const totalResuelto =
      conLugar + sinLugar + parcial + caducado + cabeceraSemanal[columnaDb] + 1;

    db.transaction(async (tx) => {
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
