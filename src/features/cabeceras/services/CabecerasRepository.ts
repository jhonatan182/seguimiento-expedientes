import { and, eq } from "drizzle-orm";

import { ICabecerasRepository } from "../interfaces/ICabecerasRepository";
import { ActionsResponse } from "@/shared/types/actions-response";
import { db } from "@/lib/drizzle";
import {
  NewPamExpedienteType,
  PamCabeceraSemanal,
  PamCabeceraSemanalType,
  PamExpedientes,
} from "@/db/schema";

class CabecerasRepository implements ICabecerasRepository {
  async getCabeceraSemanal(userId: number, semanaId: number) {
    const cabecera = await db.query.PamCabeceraSemanal.findFirst({
      where: and(
        eq(PamCabeceraSemanal.analistaId, userId),
        eq(PamCabeceraSemanal.semanaId, semanaId),
      ),
    });
    return cabecera;
  }

  async buildNextCabeceraSemanal(
    userId: number,
    semanaId: number,
    cabeceraActual: PamCabeceraSemanalType,
    cabeceraSiguiente: PamCabeceraSemanalType,
    expedientesToInsert: NewPamExpedienteType[],
  ): Promise<ActionsResponse> {
    await db.transaction(async (tx) => {
      if (cabeceraSiguiente) {
        await tx
          .delete(PamExpedientes)
          .where(
            and(
              eq(PamExpedientes.semanaId, semanaId + 1),
              eq(PamExpedientes.analistaId, userId),
            ),
          );

        await tx
          .update(PamCabeceraSemanal)
          .set({
            saldoAnterior: cabeceraActual.pendiente,
            historicoCirculacion:
              cabeceraActual.dictamen +
              cabeceraActual.requerido +
              cabeceraActual.dictamenCirculacion +
              cabeceraActual.dictamenCustodia +
              cabeceraActual.historicoCirculacion,
            pendiente: cabeceraActual.pendiente,
            caducado: 0,
            dictamen: 0,
            requerido: 0,
            circulacion: 0,
            conLugar: 0,
            dictamenCirculacion: 0,
            dictamenCustodia: 0,
            nuevoIngreso: 0,
            parcial: 0,
            resuelto: 0,
            sinLugar: 0,
          })
          .where(
            and(
              eq(PamCabeceraSemanal.semanaId, semanaId + 1),
              eq(PamCabeceraSemanal.analistaId, userId),
            ),
          );

        await tx.insert(PamExpedientes).values(expedientesToInsert);
      } else {
        await tx.insert(PamExpedientes).values(expedientesToInsert);

        await tx.insert(PamCabeceraSemanal).values({
          semanaId: semanaId + 1,
          analistaId: userId,
          saldoAnterior: cabeceraActual.pendiente,
          historicoCirculacion:
            cabeceraActual.dictamen +
            cabeceraActual.requerido +
            cabeceraActual.dictamenCirculacion +
            cabeceraActual.dictamenCustodia +
            cabeceraActual.historicoCirculacion,
          pendiente: cabeceraActual.pendiente,
          caducado: 0,
          dictamen: 0,
          requerido: 0,
          circulacion: 0,
          conLugar: 0,
          dictamenCirculacion: 0,
          dictamenCustodia: 0,
          nuevoIngreso: 0,
          parcial: 0,
          resuelto: 0,
          sinLugar: 0,
        });
      }
    });

    return {
      success: true,
      message: "Actualización exitosa",
    };
  }
}

export const cabecerasRepository = new CabecerasRepository();
