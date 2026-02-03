"use server";

import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { PamCabeceraSemanal, PamExpedientes } from "@/db/schema";
import { getCookie } from "./cookies-actions";
import { auth } from "../auth.config";
import { db } from "@/lib/drizzle";
import {
  DICTAMEN,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  PENDIENTE,
  REQUERIDO,
} from "@/const";
import { ActionsResponse } from "@/responses";

export async function getCabeceraSemanal(userId: number, semanaId: number) {
  //verficar si existe cabecera en la semana que se esta creando el expediente
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.analistaId, userId),
      eq(PamCabeceraSemanal.semanaId, semanaId),
    ),
  });

  return cabecera;
}

export async function buildNextCabeceraSemanal(): Promise<ActionsResponse> {
  const [session, semanaIdCookie] = await Promise.all([
    auth(),
    getCookie("semanaId"),
  ]);

  if (!session) {
    return {
      message: "No se encontró la sesión",
      success: false,
    };
  }

  if (!semanaIdCookie) {
    return {
      message: "No se encontró la semana",
      success: false,
    };
  }

  const user = session.user;

  const semanaId = parseInt(semanaIdCookie);
  const userId = parseInt(user.id);

  const cabecera = await getCabeceraSemanal(userId, semanaId);

  if (!cabecera) {
    return {
      message: "No se encontró la cabecera",
      success: false,
    };
  }

  const expedientesSemanaAnterior = await db.query.PamExpedientes.findMany({
    where: and(
      eq(PamExpedientes.semanaId, semanaId),
      eq(PamExpedientes.analistaId, userId),
      inArray(PamExpedientes.estado, [
        PENDIENTE,
        DICTAMEN,
        DICTAMEN_CIRCULACION,
        DICTAMEN_CUSTODIA,
        REQUERIDO,
      ]),
    ),
  });

  //buscar cabecera de la semana siguiente
  const cabeceraSiguiente = await getCabeceraSemanal(userId, semanaId + 1);

  const expedientesToInsert = expedientesSemanaAnterior.map((expediente) => ({
    expediente: expediente.expediente,
    analistaId: expediente.analistaId,
    semanaId: semanaId + 1,
    fechaIngreso: expediente.fechaIngreso,
    estado: expediente.estado,
    fechaUltimaModificacion: expediente.fechaUltimaModificacion || "",
    isHistorico: "S",
  }));

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
          saldoAnterior: cabecera.pendiente,
          historicoCirculacion: cabecera.dictamen + cabecera.requerido,
          pendiente: cabecera.pendiente,
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
        saldoAnterior: cabecera.pendiente,
        historicoCirculacion: cabecera.dictamen + cabecera.requerido,
        pendiente: cabecera.pendiente,
      });
    }
  });

  revalidatePath("/");

  return {
    success: true,
    message: "Cabecera creada exitosamente",
  };
}
